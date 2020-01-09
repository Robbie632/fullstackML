import os

from flask import Flask, request, jsonify

from utils.train import writeToMongo, readMongo, train
from utils.predict import predictClass, predict
from utils.data_processing import extract_cabin_number, encode_cabin, encode_title, ensure_correct_order, checkColumns

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
def train():
    content = request.json
    writeToMongo(content)

    data = readMongo()

    train(data, '/models')

    flask_train_data = 'flask train data'
    return('return from flask train API')


@app.route('/predict', methods = ['POST'])
def predict():
    passenger = request.json

    predictionOut = predictClass(passenger)

    return { 'prediction': predictionOut }

if __name__ ==	'__main__':
    # Bind to PORT if defined, otherwise default to 5000.
    app.run(host = '0.0.0.0', port = port, debug = True)
