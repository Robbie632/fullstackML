


class MyMongoCRUD {
    
    constructor(url, database) {
        this._url = url
        this._database = database
    }

    get url() {
        return(this._url)
    }

    get database() {
        return(this._database)
    }

    write() {
        return('method not written yet')
    }
    read() {
        'method not written yet'
    }

}










const writeDB = () => {

    const mongodb = require('mongodb')

    const { ObjectID, MongoClient } = mongodb

    const connectionURL = "mongodb://root:example@mongo:27017"

    const databaseName = 'myDatabase'



    console.log(mongoClient)
    if (MongoClient) {

        MongoClient.connect(connectionURL, { useNewUrlParser : true }, (error, client) => {
            if (error) {
                return console.log('Unable to connect to mongoDB')
            }
            console.log('connected correctly to mongodb')
            const db = client.db(databaseName)
            db.collection('test_node_collection').insertOne({
                firstField: 1,
                secondField: 2,
                thirdField: 3
            })

        })

    } else {
        console.log('mongoClient undefined')
    }


}

const readDB = () => {

    const mongodb = require('mongodb')

    //connect
    const{ MongoClient } = mongodb

    const connectionURL = "mongodb://root:example@mongo:27017"

    const databaseName = 'myDatabase'

    console.log(mongoClient)
    if (MongoClient) {

        MongoClient.connect(connectionURL, { useNewUrlParser : true }, (error, client) => {
            if (error) {
                return console.log('Unable to connect to mongoDB')
            }
            console.log('connected correctly to mongodb')
            const db = client.db(databaseName)
            db.collection('test_node_collection').find({}).toArray((error, result) => {
                if (error) {
                    return(console.log('could not read from db'))
                }
                console.log(result)
            })

        })

    } else {
        console.log('mongoClient undefined')
    }


}

module.exports = {
    writeDB:writeDB,
    readDB:readDB
}
//CRUD operations


//create

//read

//update

//delete
