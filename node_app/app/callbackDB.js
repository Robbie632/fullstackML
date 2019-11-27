const mongoose = require('mongoose')

const connectToDB = (url, callback) => {

    mongoose.connect(url, {
        useNewUrlParser : true,
        useCreateIndex : true,
        useUnifiedTopology: true
    }).then((mongoose) => {

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
        callback(undefined, connectionStatus, model)
    }).catch((error)=>{
        callback(error, undefined, undefined)
    })
}






const writeToDB = (data, connectionStatus, model, callback) => {
    connectionStatus.on('error', console.error.bind(console, 'Connection error'))
    connectionStatus.once('open', () => {
        console.log('checking db connection')
        console.log('data in writeToDB')
        console.log(data)
        console.log(typeof data)
        const passenger = new model(data)
        console.log('passenger')
        console.log(passenger)


        passenger.save((err) => {
            if (err) {
                callback(error)
            }
            callback(undefined)
        })

    })
}

module.exports = {
    connectToDB: connectToDB,
    writeToDB: writeToDB
}
