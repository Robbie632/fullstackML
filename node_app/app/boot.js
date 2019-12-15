const mongoose = require('mongoose')
const { createApp } = require('./index.js')
const dotenv = require('dotenv');

dotenv.config()


//connect to db
mongoose.connect(`mongodb://root:example@mongo:${process.env.MONGO_PORT}/data?authSource=admin`, {
    useNewUrlParser: true,
    useCreateIndex : true,
    useUnifiedTopology: true
}).then(createApp()).catch(error => console.log(error))


