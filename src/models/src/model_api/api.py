import pickle
import js
from importlib import resources  # <-- Import this!

LOADED_MODELS = {}

def load_model(model_filename: str) -> dict:
    """
    Loads a model pipeline from a .pkl file bundled *within* this package.

    This function searches for the specified pickle file within the package's 
    data directory and deserializes it into a Python object, typically a 
    trained machine learning model. It raises FileNotFoundError if the 
    specified file does not exist.

    Args:
        model_name (str): The base filename of the model to load (e.g., 'lsvc_pipeline.pkl').

    Returns:
        dict: The loading status of the model. 
             Possible values are: 'loaded', 'cached', or 'error'.

    Raises:
        FileNotFoundError: If the specified model file cannot be located in the package data.
        pickle.UnpicklingError: If the file is found but cannot be successfully deserialized.

    Examples:
        >>> model = load_model('lsvc_pipeline.pkl')
        >>> model.predict(X_test)
        ...
    """
    if model_filename in LOADED_MODELS:
        js.console.log(f"Python: Model '{model_filename}' already in cache.")
        return {"status": "cached", "model": model_filename}

    js.console.log(f"Python: Loading model '{model_filename}' from package resources...")
    
    try:
        with resources.open_binary('model_api', model_filename) as f:
            model = pickle.load(f)
        
        LOADED_MODELS[model_filename] = model
        
        js.console.log(f"Python: Model '{model_filename}' loaded and cached.")
        return {"status": "loaded", "model": model_filename}
    
    except FileNotFoundError:
        msg = f"Model file {model_filename} not found in package."
        js.console.error(f"Python: {msg}")
        return {"status": "error", "message": msg}
    except Exception as e:
        js.console.error(f"Python: Error loading model '{model_filename}': {e}")
        return {"status": "error", "message": str(e)}

def predict(model_filename: str, input_data: str) -> dict:
    """
    Performs inference using a pre-loaded model.

    This function attempts to retrieve a model by its filename from 
    the internal model cache (`LOADED_MODELS`) and uses it to perform 
    a prediction on the provided input data. The input data is assumed 
    to be a single feature/sample compatible with the model's input expectations.

    Args:
        model_filename (str): The key (filename) used to identify the model 
                              in the internal cache.
        input_data (str): The single data point or feature string to be used 
                          for inference.

    Returns:
        dict: A dictionary containing the prediction results or an error message. 

    Raises:
        (Implicit): The function handles all exceptions internally and returns 
                    an error dictionary, so it does not explicitly raise exceptions.
    """
    if model_filename not in LOADED_MODELS:
        return {"status": "error", "message": "Model not loaded."}
    try:
        model = LOADED_MODELS[model_filename]
        prediction = model.predict([input_data])
        return {"status": "success", "prediction": list(prediction)}
    except Exception as e:
        return {"status": "error", "message": str(e)}

print("Python: my_model_api.api module loaded.")