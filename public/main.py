import joblib
from pyscript import document, display
from sklearn.svm import LinearSVC
from sklearn.feature_extraction.text import TfidfVectorizer
import pickle

try:
    with open('lsvc_model.pkl', 'rb') as f:
        lsvc = pickle.load(f)
        
    with open('tfidf_vectorizer.pkl', 'rb') as f:
        tfidf = pickle.load(f)

except Exception as e:
    print(f"Error loading model files: The raw exception was: {e!r}")


def predict_t(text):
    X_new = tfidf.transform([text])
    y_new = lsvc.predict(X_new)
    return y_new[0]

def run_prediction(event):
    input_element = document.querySelector("#text-input")
    output_div = document.querySelector("#emotion-output")

    text = input_element.value
    
    if not text:
        output_div.innerText = "Please enter some text."
        return

    emotion = predict_t(text)
    output_div.innerText = "Emotion : " + emotion
    