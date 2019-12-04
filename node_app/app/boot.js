const mongoose = require('mongoose')
const { app } = require('./index.js')
const dotenv = require('dotenv');

dotenv.config()


//connect to db
mongoose.connect("mongodb://root:example@mongo:27017/data?authSource=admin", {
    useNewUrlParser: true,
    useCreateIndex : true,
    useUnifiedTopology: true
}).then(app(mongoose)).catch(error => handleError(error))

module.exports = {
    mongoose:mongoose
}

//handle errors during connection

