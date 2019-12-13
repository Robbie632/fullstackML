#code for writing data to database, training model and outputting serialied model
from pymongo import MongoClient


def writeToMongo(data, collection):

    data = dict(data)

    #create or access my datbase
    mongo_client = MongoClient('mongodb://root:example@mongo:27017')
    mydb = mongo_client['trainData']
    my_collection = mydb[collection]

    my_collection.insert_one(data)
