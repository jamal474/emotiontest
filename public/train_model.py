from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.svm import LinearSVC
import joblib
import pickle

def read_data(file):
    data = []
    with open(file, 'r') as f:
        for line in f:
            line = line.strip()
            label = ' '.join(line[1:line.find("]")].strip().split())
            text = line[line.find("]")+1:].strip()
            data.append([label, text])
        f.close()
    return data


file = 'data.txt'
data = read_data(file)

emotions = ["joy", 'fear', "anger", "sadness", "disgust", "shame", "guilt"]

def convert_label(item, name): 
    items = list(map(float, item.split()))
    label = ""
    for idx in range(len(items)): 
        if items[idx] == 1: 
            label += name[idx] + " "
    
    return label.strip()


tfidf = TfidfVectorizer(ngram_range = (1,2))
X = []
y = []

for label, text in data:
    X.append(text)
    y.append(convert_label(label, emotions))

X_transformed = tfidf.fit_transform(X)

lsvc = LinearSVC(max_iter=100000, random_state=123)
lsvc.fit(X_transformed, y)

with open('lsvc_model.pkl', 'wb') as f:
    pickle.dump(lsvc, f, protocol=4) 

with open('tfidf_vectorizer.pkl', 'wb') as f:
    pickle.dump(tfidf, f, protocol=4)
    
print("Models saved using standard pickle protocol.")



