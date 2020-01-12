import joblib
import pandas as pd
import numpy as np

model = joblib.load('model.joblib')

def predictClass(passenger):
    # TODO: Encode name, sex, etc

    prediction = model.predict([
        [0, 300, 0, 0, 0, 0]
    ])

    return int(prediction[0])

def predict(data, encode_cabin, extract_cabin_number, encode_title, modelPath): 
    
    '''
    function for training random forest classifier model
    data:data to be predicted from only containing features
    trained: fitted sklearn model
    '''
    
    model = joblib.load(modelPath)


    for col in df.columns.values:
        if col in ['Pclass', 'Age', 'SibSp', 'Parch', 'Fare']:
            df[col] = pd.to_numeric(df[col])
        else:
            continue
    
    
    data["Age"].fillna(value=data["Age"].mean(), inplace=True)
    data["sex_encoded"] = data.apply(lambda r: 0 if r["Sex"] == 'male' else 1, axis=1)
    data["Embarked"].fillna(value='S', inplace=True)
    data["embarked_encoded"] = data.apply(lambda r: 'SCQ'.index(r["Embarked"]), axis=1)
    data["title_encoded"] = data.apply(encode_title, axis=1)
    data["cabin_letter"] = data.apply(encode_cabin, axis=1)
    data["cabin_number"] = data.apply(extract_cabin_number, axis=1)
    
    
    data = data[['Pclass','Age','SibSp','Parch','Fare','sex_encoded',\
        'embarked_encoded','cabin_letter','cabin_number','title_encoded']]

    
    
    predictions = model.predict(np.array(data))
    
    return(predictions[0])