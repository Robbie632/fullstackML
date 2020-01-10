from pymongo import MongoClient
import pandas as pd
import json
from index import create_app



mongo_client = MongoClient('mongodb://root:example@mongo:27017')
mydb = mongo_client['trainData']
my_collection = mydb['train']

df = pd.read_csv('/app/train_data/train.csv')

json_data = json.loads(df.to_json(orient = 'records'))

create_app(json_data, my_collection)







