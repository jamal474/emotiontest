<h1 align="center">Emotion Detection from Text (Pyodide & React)</h1>
<p align="center">
  <a href = "http://hits.dwyl.com/jamal474/emotiontest"><img alt="Version" src="https://hits.dwyl.com/jamal474/emotiontest.svg?style=flat"/></a>
  <a href = "https://app.netlify.com/sites/textemotiondetection/deploys"><img src = "https://api.netlify.com/api/v1/badges/2faa6ea7-64dc-4233-aae2-a75675484d2b/deploy-status"/></a>
</p>

This project demonstrates how to deploy a **pre-trained machine learning model** (Scikit-learn's LinearSVC with TfidfVectorizer) entirely within a web browser using Pyodide and worker api. The application uses a React frontend managed by the Vite build tool.

The ML model is loaded asynchronously from static files, eliminating the need for a backend server for running predictions. The estimated testing accuracy of the underlying model is 61%.

## Technologies Used

This project uses a modern polyglot stack by integrating front-end frameworks with scientific Python libraries:

| Category | Technology | Version(s) | Role in Project |
| :--- | :--- | :--- | :--- |
| **Frontend** | **React** | `^18.2.0` | JavaScript library for building the UI and the input/output components (`Body.jsx`). |
| **Build Tooling** | **Vite** | `^7.1.9` | Used for development server (`npm start`) and optimized production builds. |

## Installation and Setup Guide

### Prerequisites

* [Node.js](https://nodejs.org/) and npm
* [Conda](https://docs.conda.io/en/latest/miniconda.html) (Miniconda or Anaconda)

### Setup

1.  **Install JavaScript dependencies:**
    ```bash
    npm install
    ```

2.  **Start the development server:**
    ```bash
    npm start  # Runs the 'vite' command
    ```
    The application will launch, but the ML prediction button will not work until the model files are placed in the `public` folder.

