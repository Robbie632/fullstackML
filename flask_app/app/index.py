from pymongo import MongoClient
from flask import Flask
from utils.train import train
from utils.predict import predict



app = Flask(__name__)

mongo_client = MongoClient('mongodb://root:example@mongo:27017')

#create or access my datbase
mydb = mongo_client['document_name']

my_collection = mydb['collection_name']


@app.route('/train')
def train():
    #accept request
    #manipulate data into useable format
    #respond saying that the new model is being trained
    #write new data to database
    #retrain model
    #restore emodel
    return()


@app.route('/predict')
def predict():
    #accept request
    #manipulate data into useable format
    #load model 
    #predict
    #return prediction
    return()
