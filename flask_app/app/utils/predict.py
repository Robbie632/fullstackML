import joblib

model = joblib.load('model.joblib')

def predict(passenger):
    model.predict([
        [0, 20, 0, 0, 0, 0]
    ])