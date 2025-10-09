<h1 align="center">Emotion Detection from Text (PyScript & React)</h1>
<p align="center">
  <a href = "http://hits.dwyl.com/jamal474/emotiontest"><img alt="Version" src="https://hits.dwyl.com/jamal474/emotiontest.svg?style=flat"/></a>
  <a href = "https://app.netlify.com/sites/textemotiondetection/deploys"><img src = "https://api.netlify.com/api/v1/badges/2faa6ea7-64dc-4233-aae2-a75675484d2b/deploy-status"/></a>
</p>

This project demonstrates how to deploy a **pre-trained machine learning model** (Scikit-learn's LinearSVC with TfidfVectorizer) entirely within a web browser using **PyScript**. The application uses a React frontend managed by the Vite build tool.

The ML model is loaded asynchronously from static files, eliminating the need for a backend server for running predictions. The estimated testing accuracy of the underlying model is 61%.

## Technologies Used

This project uses a modern polyglot stack by integrating front-end frameworks with scientific Python libraries:

| Category | Technology | Version(s) | Role in Project |
| :--- | :--- | :--- | :--- |
| **Frontend** | **React** | `^18.2.0` | JavaScript library for building the UI and the input/output components (`Body.jsx`). |
| **Build Tooling** | **Vite** | `^7.1.9` | Used for development server (`npm start`) and optimized production builds. |
| **Browser Execution** | **PyScript** | `2025.8.1` | Loads and runs Python code (`main.py`) in the browser. |
| **ML Runtime** | **Pyodide** (Implicit) | Python 3.13.2, Scikit-learn 1.7.0 [Context] | The WebAssembly environment that executes the Python code and manages dependencies. |
| **ML Libraries** | **Scikit-learn** | Explicitly loaded in `pyscript.json` | Provides the `LinearSVC` model and `TfidfVectorizer` for inference. |
| **Serialization** | **Joblib** | Explicitly loaded in `pyscript.json` | Used to load the pre-trained `.pkl` model files. |

## Installation and Setup Guide

To run this project successfully, you must ensure your local model saving environment perfectly matches the PyScript loading environment to prevent serialization errors (`KeyError: 60`).

### Prerequisites

* [Node.js](https://nodejs.org/) and npm
* [Conda](https://docs.conda.io/en/latest/miniconda.html) (Miniconda or Anaconda)

### 1. Frontend Setup

1.  **Install JavaScript dependencies:**
    ```bash
    npm install
    ```

2.  **Start the development server:**
    ```bash
    npm start  # Runs the 'vite' command
    ```
    The application will launch, but the ML prediction button will not work until the model files are placed in the `public` folder.

### 2. Conda Environment Setup (ML Generation)

The PyScript - 2025.8.1 used here uses specific versions of the packages. We must replicate this locally using the `conda-forge` channel.

1.  **Create the matching Conda environment:**
    ```bash
    # Use conda-forge channel to find these exact versions
    conda create -n pyscript_match -c conda-forge python=3.13 joblib=1.4.2 
    scikit-learn=1.7.0 numpy
    ```

2.  **Activate the environment:**
    ```bash
    conda activate pyscript_match
    ```

### 3. Generating and Saving Model Weights

With the environment activated, you can run the provided training script to generate the model and vectorizer files in a browser-compatible format.

1.  **Run the training script:** The script reads the `data.txt` file and automatically saves the weights in the required uncompressed PKL format.
    ```bash
    python ./train_model.py
    ```

2.  This command generates the two necessary files: **`lsvc_model.pkl`** and **`tfidf_vectorizer.pkl`**.


### 4. Final File Placement

**Copy the new files:** Place the newly generated **`lsvc_model.pkl`** and **`tfidf_vectorizer.pkl`** into the project's **`public`** folder

With the files correctly saved and placed, the PyScript engine successfully loads the model upon page launch, and the prediction button will work as expected.

