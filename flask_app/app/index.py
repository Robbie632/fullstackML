from flask import Flask, request, jsonify
import os
from utils.train import writeToMongo
from utils.predict import predictClass

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
    writeToMongo(content, 'train')
    
    #do all below in train script
        #manipulate data into useable format
        #respond saying that the new model is being trained
        #write new data to database
        #read from database
        #retrain model
        #write model to file
    flask_train_data = 'flask train data'
    return('return from flask train API, received following training {0}'.format(content))


@app.route('/predict', methods = ['POST'])
def predict():
    content = request.json
    #accept request
    #manipulate data into useable format
    #load model
    #predict
    predictionOut = predictClass()

    return(predictionOut)

if __name__ ==	'__main__':
    # Bind to PORT if defined, otherwise default to 5000.
    app.run(host = '0.0.0.0', port = port, debug = True)
