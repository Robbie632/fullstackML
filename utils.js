const request = require('request')


const callDarkSky = (latitude, longitude, callback) => {

    //below is standard JSdoc format documenting
    /**
    * make API call to darksky API to return weather data
    * @param  {string} latitude The latitude coordinate
    * @param  {string} longitude The longitude coordinate
    * @callback {not sure} not sure
    * @return {datatype goes here}   something here to describe the returned data
    * @
    */

    const url = 'https://api.darksky.net/forecast/0161faf99c034b36802f950a0ea69173/' + latitude + ',' + longitude

    request({ url: url, json: true }, (error, response) => {

        if (error) {
            callback('error connecting to API', undefined)
        } else if (response.body.error) {
            callback('mistake in API token', undefined)
        } else {
            callback(undefined, response.body.currently)
        }
    })
}
/*
callDarkSky('37.8267', '-122.4233', (error, response) => {
    console.log(response)
})
*/


module.exports = {
    callDarkSky:callDarkSky
}
