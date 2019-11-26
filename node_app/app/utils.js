//mongodb functions
const mongoose = require('mongoose')

const connectToDB = (url, modelName) => {

    mongoose.connect(url, {
        useNewUrlParser : true,
        useCreateIndex : true,
        useUnifiedTopology: true
    }).catch((error)=>{
        console.log(error)
    })

    const connectionStatus = mongoose.connection

    const passengerSchema = mongoose.Schema({
        name: String,
        age: Number,
        fare: Number,
        cabin: Number,
        sex: Number,
        nosiblings: Number,
        embark: String,
        label: String

    })

    const model = mongoose.model('myCollection', passengerSchema)

    return({
        model: model,
        connectionStatus: connectionStatus
    })
}

const writeToDB = (model, data, connectionStatus) => {

    console.log('1')
    connectionStatus.on('error', console.error.bind(console, 'Connection error'))
    console.log('2')
    connectionStatus.once('open', () => {
        console.log('checking db connection')
        console.log('data in writeToDB')
        console.log(data)
        console.log(typeof data)
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
