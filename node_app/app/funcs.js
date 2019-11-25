class MyMongooseCRUD {

    const myMongoose = require('mongoose')

    constructor(url) {


        this._url = url
        this._client = myMongoose.connect(url, {
            useNewParser = true ,
            useCreateIndex = true
        })
    }

    get url() {
        return(this._url)
    }

    createModel(modelName) {
        const model = myMongoose.model(modelName, {
            name : {
                type : string
            }
            age : {
                type : number
            }
            fare : {
                type : number

            }
        })
        this.model = model

    }
    addPassenger(data) {
        const passenger = new this.model(data)
        passenger.save().then(() => data{
            console.log('added new passenger')
        }).catch(() => {
            console.log('failed to add new passenger')
        })

    }
}

module.exports = {
    MyMongooseCRUD: MyMongooseCRUD
}
