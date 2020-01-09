import joblib
import pandas as pd

model = joblib.load('model.joblib')

def predictClass(passenger):
    # TODO: Encode name, sex, etc

    prediction = model.predict([
        [0, 300, 0, 0, 0, 0]
    ])

    return int(prediction[0])

def predict(data, modelPath):
    
    '''
    function for training random forest classifier model
    data:data to be predicted from only containing features
    trained: fitted sklearn model
    '''
    
    model = joblib.load(modelPath)
    
    data["Age"].fillna(value=data["Age"].mean(), inplace=True)
    data["sex_encoded"] = data.apply(lambda r: 0 if r["Sex"] == 'male' else 1, axis=1)
    data["Embarked"].fillna(value='S', inplace=True)
    data["embarked_encoded"] = data.apply(lambda r: 'SCQ'.index(r["Embarked"]), axis=1)
    data["title_encoded"] = data.apply(encode_title, axis=1)
    data["cabin_letter"] = data.apply(encode_cabin, axis=1)
    data["cabin_number"] = data.apply(extract_cabin_number, axis=1)
    
    
    del data['Name']
    del data['Ticket']
    del data['Sex']
    del data['PassengerId']
    del data['Cabin']
    del data['Embarked']
    
    
    predictions = model.predict(np.array(data))
    
    return(predictions)