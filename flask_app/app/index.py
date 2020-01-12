import os
import pandas as pd

from flask import Flask, request, jsonify

from utils.train import writeToMongo, readMongo, train
from utils.predict import predictClass, predict
from utils.data_processing import extract_cabin_number, encode_cabin, encode_title, ensure_correct_order, checkColumns

def create_app(train_data, my_collection):

    my_collection.insert_many(train_data)
    app = Flask(__name__)

    '''heroku specifies a port to run app on as an environemental variable port
    when running local thei svariable wont be availabel and so th eapp will
    run on port 5000'''
    port = int(os.environ.get('PORT', 5000))


    @app.route('/')
    def index():
        return('flask homepage')

    # set up API POST endpoint
    @app.route('/train', methods=['POST'])
    def train_endpoint():
        content = request.json
        writeToMongo(content)

        data = readMongo()

        df = pd.DataFrame.from_records(data)

        checkedData = checkColumns(df)

        train(checkedData, encode_cabin, extract_cabin_number ,encode_title, './models')

        flask_train_data = 'flask train data'
        return('return from flask train API')


    @app.route('/predict', methods = ['POST'])
    def predict_endpoint():

        passenger = request.json
        passenger_df = pd.DataFrame(passenger, index = [0])
        checkedData = ensure_correct_order(passenger_df)
        checked_df = checkColumns(checkedData)  
        prediction = predict(checked_df, encode_cabin, extract_cabin_number, encode_title, 'models/model.joblib')

        return("{{ 'prediction': {0} }}".format(prediction))


    # Bind to PORT if defined, otherwise default to 5000.
    app.run(host = '0.0.0.0', port = port, debug = True)
