#code for writing data to database, training model and outputting serialied model
from pymongo import MongoClient
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import numpy as np
import joblib


def writeToMongo(data):

    data = dict(data)

    #create or access my datbase
    mongo_client = MongoClient('mongodb://root:example@mongo:27017')
    mydb = mongo_client['trainData']
    my_collection = mydb['train']

    my_collection.insert_one(data)

def readMongo():

    '''
    read all train data from mongodb
    '''
    
    mongo_client = MongoClient('mongodb://root:example@mongo:27017')
    mydb = mongo_client['trainData']
    my_collection = mydb['train']
    data = list(my_collection.find({}))
    df = pd.DataFrame(data)

    return(data)

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

