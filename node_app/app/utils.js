//mongodb functions
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

    write(data) {
        /**
         * Writes to mongodb .
         *
         * @param {object} data-data to write to database
         *
         * @example
         *
         *  myObject.write({
                field1 : 'data1',
                field2 : 'data2'
            })
         */

        const mongodb = require('mongodb')

        const { ObjectID, MongoClient } = mongodb



        if (MongoClient) {

            MongoClient.connect(this._url, { useNewUrlParser : true }, (error, client) => {
                if (error) {
                    return console.log('Unable to connect to mongoDB')
                }
                console.log('connected correctly to mongodb')
                const db = client.db(this._database)
                db.collection('test_node_collection').insertOne(data)
                console.log('written to db')
            })

        } else {
            console.log('mongoClient undefined')
        }
    }

    read() {

        const mongodb = require('mongodb')

        const{ MongoClient } = mongodb

        if (MongoClient) {

            MongoClient.connect(this._url, { useNewUrlParser : true }, (error, client) => {
                if (error) {
                    return console.log('Unable to connect to mongoDB')
                }
                console.log('connected correctly to mongodb')
                const db = client.db(this._database)
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

}


module.exports = {
    MyMongoCRUD: MyMongoCRUD
}
