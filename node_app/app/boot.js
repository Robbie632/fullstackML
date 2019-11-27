const mongoose = require('mongoose')

const { appFunc } = require('./index.js')
const { connectToDB } = require('./callbackDB')


//the connection wont work unless ?authyAource=admin is stuck on the end
connectToDB("mongodb://root:example@mongo:27017/myDatabase?authSource=admin", appFunc)
