/// <reference lib="webworker" />

// NOTE: Since this file will be compiled by your build tool,
// we use dynamic import to get the Pyodide module correctly inside the worker.

// --- Type Definitions (Needed because Pyodide is loaded dynamically) ---
interface LoadModelPayload { modelName: string; }
interface PredictPayload { modelName: string; inputText: string; }

// Incoming message types
type WorkerEventData =
  | { type: 'INIT'; id: number }
  | { type: 'LOAD_MODEL'; id: number; payload: LoadModelPayload }
  | { type: 'PREDICT'; id: number; payload: PredictPayload };

// Outgoing message types
type WorkerPostMessage =
  | { type: 'READY'; id: number }
  | { type: 'PROGRESS'; payload: string }
  | { type: 'RESULT'; id: number; payload: any }
  | { type: 'ERROR'; id: number; payload: string };

// --- Worker Implementation ---

// The Pyodide instance type cannot be imported easily in workers, so we define a basic structure
// The `any` type is needed here for compatibility with dynamically loaded Pyodide globals
let pyodide: any = null; 

const postMessage = (msg: WorkerPostMessage) => self.postMessage(msg);

async function initPyodide(onProgress: (msg: string) => void): Promise<boolean> {
  try {
    onProgress("Pyodide core loading...");

    const pyodideModule = await import('pyodide/pyodide.js');
    pyodide = await pyodideModule.loadPyodide({
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.29.0/full/",
      stdout: onProgress,
      stderr: (err: string) => console.error("Pyodide stderr:", err),
    });

    onProgress("Micropip loading...");
    await pyodide.loadPackage("micropip");
    const micropip = pyodide.pyimport("micropip");

    onProgress("Installing 'model_api' wheel...");
    await micropip.install("/model_api-0.1.0-py3-none-any.whl");

    onProgress("Pre-loading Python API...");
    pyodide.runPython("import model_api.api");

    return true;
  } catch (err: any) {
    console.error("Pyodide init failed in worker:", err);
    postMessage({ type: "ERROR", id: 0, payload: err.message });
    return false;
  }
}

self.onmessage = async (event: MessageEvent<WorkerEventData>) => {
  const { type, id } = event.data;

  try {
    if (type === 'INIT') {
      const onProgress = (msg: string) => postMessage({ type: "PROGRESS", payload: msg });
      await initPyodide(onProgress);
      postMessage({ type: "READY", id });
      return;
    }

    if (!pyodide) {
      throw new Error("Pyodide is not initialized.");
    }

    switch (type) {
      case 'LOAD_MODEL': {
        const { payload } = event.data;
        // Blocking Python code runs here, safely off the main UI thread.
        pyodide.globals.set("js_model_name", payload.modelName);
        const resultProxy = pyodide.runPython(`
          import model_api.api
          model_api.api.load_model(js_model_name)
        `);
        const result = resultProxy.toJs({ dict_converter: Object.fromEntries });
        resultProxy.destroy();
        pyodide.globals.delete("js_model_name");

        postMessage({ type: "RESULT", id, payload: result });
        break;
      }
      
      case 'PREDICT': {
        const { payload } = event.data;
        pyodide.globals.set("js_model_name", payload.modelName);
        pyodide.globals.set("js_input_text", payload.inputText);
        const resultProxy = pyodide.runPython(`
          import model_api.api
          model_api.api.predict(js_model_name, js_input_text)
        `);
        const result = resultProxy.toJs({ dict_converter: Object.fromEntries });
        resultProxy.destroy();
        pyodide.globals.delete("js_model_name");
        pyodide.globals.delete("js_input_text");

        postMessage({ type: "RESULT", id, payload: result });
        break;
      }
    }
  } catch (err: any) {
    console.error(`Error in worker for task ${type}:`, err);
    postMessage({ type: "ERROR", id, payload: err.message });
  }
};