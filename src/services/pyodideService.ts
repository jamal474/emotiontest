type PendingRequest = {
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
};

class PyodideService {
  private worker: Worker | null = null;
  private pendingRequests = new Map<number, PendingRequest>();
  private nextRequestId = 0;
  private initPromise: Promise<void> | null = null;
  private onProgress: (msg: string) => void = () => {};

  public init(options?: { onProgress: (msg: string) => void }): Promise<void> {
    if (this.initPromise) {
      return this.initPromise;
    }

    this.initPromise = new Promise((resolve, reject) => {
      this.onProgress = options?.onProgress || (() => {});
      
      // --- THE FIX: Load worker as an ES Module ---
      // This path depends on your setup, but using URL/import.meta.url is the standard way
      this.worker = new Worker(
        new URL('../workers/pyodideWorker.ts', import.meta.url),
        { type: "module" } // CRITICAL: Loads the file as an ES Module
      );

      this.worker.onmessage = (event) => {
        const { type, payload, id } = event.data;

        if (type === "READY" && id === 0) { // 0 is our hardcoded 'init' ID
          console.log("JS: Pyodide Service is ready.");
          resolve();
        }
        
        else if (type === "PROGRESS") {
          this.onProgress(payload);
        }
        
        else if (type === "RESULT") {
          const request = this.pendingRequests.get(id);
          if (request) {
            request.resolve(payload);
            this.pendingRequests.delete(id);
          }
        }
        else if (type === "ERROR") {
          console.error("Error from Pyodide worker:", payload);
          // If it's an init error
          if (id === 0) {
            reject(new Error(payload));
          }
          // If it's a request error
          const request = this.pendingRequests.get(id);
          if (request) {
            request.reject(new Error(payload));
            this.pendingRequests.delete(id);
          }
        }
      };

      this.worker.postMessage({ type: "INIT", id: 0 }); // Use 0 for the init task
    });

    return this.initPromise;
  }

  private sendRequest(type: string, payload: any): Promise<any> {
    if (!this.worker) {
      return Promise.reject("Worker is not initialized.");
    }

    const id = ++this.nextRequestId;
    const promise = new Promise((resolve, reject) => {
      this.pendingRequests.set(id, { resolve, reject });
    });

    this.worker.postMessage({ type, payload, id });
    return promise;
  }
  
  public isReady(): boolean {
    return !!this.initPromise;
  }

  public async loadModel(modelName: string): Promise<any> {
    return this.sendRequest("LOAD_MODEL", { modelName });
  }

  public async predict(modelName: string, inputText: string): Promise<any> {
    return this.sendRequest("PREDICT", { modelName, inputText });
  }
}

export const pyodideService = new PyodideService();