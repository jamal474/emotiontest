from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.svm import LinearSVC

# function to process .txt file and create labels and text separate components
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

# Reading the dataset stored in data.txt
file = 'data.txt'
data = read_data(file)

# all possible emotions in the dataset
emotions = ["joy", 'fear', "anger", "sadness", "disgust", "shame", "guilt"]

# function that changes the emotion list into its emotion i.e [1,0,0,0,0,0,0] to "joy"
def convert_label(item, name): 
    items = list(map(float, item.split()))
    label = ""
    for idx in range(len(items)): 
        if items[idx] == 1: 
            label += name[idx] + " "
    
    return label.strip()


# feature Selection using tf-idf vectorizer
# This uses 1-gram and 2-gram pairs for features
tfidf = TfidfVectorizer(ngram_range = (1,2))
X = []
y = []
for label, text in data:
    X.append(text)
    y.append(convert_label(label, emotions))
X = tfidf.fit_transform(X)

# Splitting the Dataset into Training set and Test set
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state = 0)


# Creating the Model
lsvc = LinearSVC(max_iter=100000,random_state=123)
lsvc.fit(X_train, y_train)

def predict_t(text):
    X_new = tfidf.transform([text])
    y_new = lsvc.predict(X_new)
    return y_new
