from pymongo import MongoClient
from flask import Flask, request, jsonify
import os
#from utils.train import train
#from utils.predict import predict


app = Flask(__name__)

mongo_client = MongoClient('mongodb://root:example@mongo:27017')

#create or access my datbase
mydb = mongo_client['document_name']

my_collection = mydb['collection_name']

@app.route('/')
def index():
    return('flask homepage')

#set up API POSt endpoint
@app.route('/train', methods=['POST'])
def train():
    content = request.json
    #accept request
    #manipulate data into useable format
    #respond saying that the new model is being trained
    #write new data to database
    #retrain model
    #restore emodel
    flask_train_data = 'flask train data'
    return('return from train API, received {0}'.format(flask_train_data))


@app.route('/predict', methods = ['POST'])
def predict():
    content = request.json
    #accept request
    #manipulate data into useable format
    #load model
    #predict
    #return prediction
    flask_predict_data = 'flask predict data'
    return('return from predict API, received {0}'.format(flask_predict_data))

if __name__ ==	'__main__':
    # Bind to PORT if defined, otherwise default to 5000.
    port = int(os.environ.get('PORT', 5000))
    app.run(host = '0.0.0.0', port = port, debug = True)
