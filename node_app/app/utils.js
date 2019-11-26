//mongodb functions

const connectToDB = (url, modelName) => {

    const mongoose = require('mongoose')

    mongoose.connect(url, {
        useNewUrlParser : true,
        useCreateIndex : true,
        useUnifiedTopology: true
    })

    const connectionStatus = mongoose.connection

    const passengerSchema = mongoose.Schema({
    name: String,
    age: Number,
    fare: Number
    })

    const model = mongoose.model('myCollection', passengerSchema)
    console.log('model')
    console.log(model)
    console.log('connectionStatus')
    console.log(connectionStatus)
    return({
        model: model,
        connectionStatus: connectionStatus
    })
}

const writeToDB = (model, data, connectionStatus) => {
    const mongoose = require('mongoose')
    console.log('1')
    connectionStatus.on('error', console.error.bind(console, 'Connection error'))
    console.log('2')
    connectionStatus.once('open', () => {
        console.log('checking db connection')
        const passenger = new model(data)
        console.log('passenger')
        console.log(passenger)


        passenger.save(function (err) {
            if (err) return handleError(err);
            console.log('passenger successfully saved.')
        })

    })
}

module.exports = {
    connectToDB: connectToDB,
    writeToDB: writeToDB
}


// class MyMongooseCRUD {
//
//     constructor(url) {
//         this._url = url
//     }
//
//     get url() {
//         return(this._url)
//     }
//
//     createModel(modelName) {
//
//         const mongoose = require('mongoose')
//         mongoose.connect(this._url, {
//             useNewUrlParser : true,
//             useCreateIndex : true,
//             useUnifiedTopology: true
//         })
//
//
//         const model = mongoose.model(modelName, {
//             name : {
//                 type : String
//             },
//             age : {
//                 type : Number
//             },
//             fare : {
//                 type : Number
//
//             }
//         })
//         this.model = model
//
//     }
//     addPassenger(data) {
//         const passenger = new this.model(data)
//         passenger.save().then(() => {
//             console.log('added new passenger')
//         }).catch((error) => {
//             consol.log(error)
//             console.log('failed to add new passenger')
//         })
//
//     }
// }
//
// module.exports = {
//     MyMongooseCRUD: MyMongooseCRUD
// }

// class MyMongoCRUD {
//
//     constructor(url, database) {
//         this._url = url
//         this._database = database
//     }
//
//     get url() {
//         return(this._url)
//     }
//
//     get database() {
//         return(this._database)
//     }
//
//     write(data) {
//         /**
//          * Writes to mongodb .
//          *
//          * @param {object} data-data to write to database
//          *
//          * @example
//          *
//          *  myObject.write({
//                 field1 : 'data1',
//                 field2 : 'data2'
//             })
//          */
//
//         const mongodb = require('mongodb')
//
//         const { ObjectID, MongoClient } = mongodb
//
//
//
//         if (MongoClient) {
//
//             //The argument { useUnifiedTopology: true } is necessary for
//             //successful db connection
//             MongoClient.connect(this._url, { useNewUrlParser : true }, { useUnifiedTopology: true },  (error, client) => {
//                 if (error) {
//                     return console.log('Unable to connect to mongoDB')
//                 }
//                 console.log('connected correctly to mongodb')
//                 const db = client.db(this._database)
//                 db.collection('test_node_collection').insertOne(data)
//                 console.log('written to db')
//             })
//
//         } else {
//             console.log('mongoClient undefined')
//         }
//     }
//
//     readAll() {
//
//         const mongodb = require('mongodb')
//
//         const{ MongoClient } = mongodb
//
//
//
//         if (MongoClient) {
//
//             MongoClient.connect(this._url, { useNewUrlParser : true }, { useUnifiedTopology: true }, (error, client) => {
//                 if (error) {
//                     return console.log('Unable to connect to mongoDB')
//                 }
//                 console.log('connected correctly to mongodb')
//                 const db = client.db(this._database)
//                 db.collection('test_node_collection').find({}).toArray((error, result) => {
//                     if (error) {
//                         return(console.log('could not read from db'))
//                     }
//                     console.log('output from readAll()')
//                     console.log(result)
//                 })
//
//             })
//
//         } else {
//             console.log('mongoClient undefined')
//         }
//     }
//
//     readSpecific(field, value) {
//
//         const mongodb = require('mongodb')
//
//         const{ MongoClient } = mongodb
//
//
//
//         if (MongoClient) {
//
//             MongoClient.connect(this._url, { useNewUrlParser : true }, { useUnifiedTopology: true }, (error, client) => {
//                 if (error) {
//                     return console.log('Unable to connect to mongoDB')
//                 }
//                 console.log('connected correctly to mongodb')
//                 const db = client.db(this._database)
//                 db.collection('test_node_collection').find({ field : value }).toArray((error, result) => {
//                     if (error) {
//                         return(console.log('could not read from db'))
//                     }
//                     console.log('output from readSpecific()')
//                     console.log(result)
//                 })
//
//             })
//
//         } else {
//             console.log('mongoClient undefined')
//         }
//
//     }
//
//
//     removeAll() {
//
//         const mongodb = require('mongodb')
//
//         const{ MongoClient } = mongodb
//
//
//
//         if (MongoClient) {
//
//             MongoClient.connect(this._url, { useNewUrlParser : true }, { useUnifiedTopology: true }, (error, client) => {
//                 if (error) {
//                     return console.log('Unable to connect to mongoDB')
//                 }
//                 console.log('connected correctly to mongodb')
//                 const db = client.db(this._database)
//                 db.collection('test_node_collection').deleteMany({})
//             })
//
//         } else {
//             console.log('mongoClient undefined')
//         }
//     }
// }
//
//
// module.exports = {
//     MyMongoCRUD: MyMongoCRUD
// }
