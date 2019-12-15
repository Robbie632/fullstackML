import joblib

model = joblib.load('model.joblib')

def predictClass(passenger):
    # TODO: Encode name, sex, etc

    prediction = model.predict([
        [0, 300, 0, 0, 0, 0]
    ])

    return int(prediction[0])