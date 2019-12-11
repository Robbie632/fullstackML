const { mongoose } = require('./boot.js')

const makeDataModel = (mongoose) => {


  /**
   * creates mongo db schema then creates a mongoose model with said schema
   * @param  {[type]} mongoose mongoose.connection object
   * @return {[type]} dataModel mongoose model that can be used to read collections
   */

  const data = new mongoose.Schema({
    name: Number,
    age : Number,
    class : Number
  });

  const dataModel = mongoose.model('User', data);

  return dataModel
}





module.exports = {
    makeDataModel: makeDataModel
}