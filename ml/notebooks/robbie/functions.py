import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import numpy as np
import joblib


def encode_cabin(row):
    
    '''
    function for pandas.apply
    encodes cabin
    '''
    
    if row["Cabin"] == None:
        return 0
    else:
        return 'abcdefghijklmnopqrstuvwxyz'.index(str(row["Cabin"])[0].lower())


def extract_cabin_number(row):
    
    '''
    function for pandas.apply
    extracts cabin number
    '''
    num = ''
    
    for i in str(row["Cabin"]):
        if i.isnumeric():
            num += i
            
    if num == '':
        return 0
            
    return int(num)
    

def encode_title(row):
    
    '''
    function for pandas.apply
    encodes title
    '''
    
    if "master" in row["Name"].lower():
        return 1
    elif "mr." in row["Name"].lower():
        return 2
    elif "mrs." in row["Name"].lower():
        return 3
    elif "miss." in row["Name"].lower():
        return 3
    else:
        return 0



def train(data_in, encode_cabin, extract_cabin_number, encode_title, model_path):
    
    '''
    function for training random forest classifier model
    
    data: features and label of train data
    '''
    data = data_in.copy()
    data["Age"].fillna(value=data["Age"].mean(), inplace=True)
    data["sex_encoded"] = data.apply(lambda r: 0 if r["Sex"] == 'male' else 1, axis=1)
    data["Embarked"].fillna(value='S', inplace=True)
    data["embarked_encoded"] = data.apply(lambda r: 'SCQ'.index(r["Embarked"]), axis=1)
    data["title_encoded"] = data.apply(encode_title, axis=1)
    data["cabin_letter"] = data.apply(encode_cabin, axis=1)
    data["cabin_number"] = data.apply(extract_cabin_number, axis=1)
    
    data = data[['Survived','Pclass','Age','SibSp','Parch','Fare','sex_encoded',\
             'embarked_encoded','cabin_letter','cabin_number','title_encoded']]
    
    label = data['Survived']
    del data['Survived']
    train = data.copy()
    
    model = RandomForestClassifier(n_estimators=10, random_state=42)
    
    model.fit(np.array(train), np.array(label))
    
    
    
    joblib.dump(model, '{0}/model.joblib'.format(model_path))
    
    
    return('model serialised')



def checkColumns(data):
    
    '''
    quality control: checks all columns to be expected are present
    '''
    
    data_copy = data.copy()
    columns_for_testing = ['PassengerId','Survived', 'Pclass', 'Name', 'Sex', 'Age', 'SibSp', 'Parch', 'Ticket', 'Fare', 'Cabin', 'Embarked']
    for col in columns_for_testing:
        if col not in data_copy.columns.values:
            data_copy[col] = 0
        else:
            continue
            
    return(data_copy)


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