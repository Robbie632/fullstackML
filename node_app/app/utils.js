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
