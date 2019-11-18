const express = require('express')
const handlebars = require('handlebars')
const request = require('request')


/* API request for weather data*/

const url = ' https://api.darksky.net/forecast/0161faf99c034b36802f950a0ea69173/37.8267,-122.4233'

request({ url: url, json: true }, (error, response) => {
    /*the request function is a callback function that executes an arrowhead
    function that takes teh arguments error, response and body. The response
    contains both the metadata and the actual data, the body contains the actual
    data, the response has a body key*/

    if (error) {
        return(console.log(error))
    }

    console.log(response.body)//response.body same as body

})

/* API request for forward geocoding aka taking address and getting back coordinates*

/*optional paramaters are appended onto the end of the request url and
is preceeded by a '&' sign, for example I look up the documentation and see
there is an optional paramter called limit so I include this at the end
of the url*/

const url_geocoding = "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoicm9iYmllNjMyIiwiYSI6ImNrMzQ2NzZsdTBmbTkzaXBqdnp6eXhqYnIifQ.qkPQwmyVmJr7WUHrxcqROQ&limit=1"

request({ url: url_geocoding, json: true }, (error, response) => {

    //this error condition catches any connection errors
    if (error) {
        return(console.log('unable to connect to mapbox API'))

    /*this error condition works on the basis that any mistakes in the API
    key will return error data*/
    } else if (response.body.error) {
        console.log('There is a mistake in the request URL')

    //If there are no errors then the data is logged
    } else {
        console.log(response.body)//response.body same as body
    }
})

//calling instance of express object
const app = express()
const port = 3000


/*  app.get() creates a web url
this is a get request, this is where data is got in the body
req stands for request and res stands for response */
app.get('/', (req, res) => {
    res.send('Hello World!')
})

const homepageTemplate = handlebars.compile("<h1> this is a rendered html string {{ name }}, {{ secondName }} </h1>")
const contactUsTemplate = handlebars.compile("<h1> contact us at this address {{ address }} on this day {{ day }} </h1>")


/*the colon in the url signifies that you want to receive the URL paramater name
the (req, res) arrowhead function is a callback.
It's expected that the input to the function are
 objects with associated methods etc such as re.params*/
app.get('/homepage/:name', (req, res) => {

    res.send(homepageTemplate({
        /*the keys represent the names in the html template and
        the values what is to be substituted when the html is rendered
        here you extract the url paramater from the req object*/
        name : req.params.name,
        secondName : 'Robbie'
    }))
})

/*the question mark means that an error is
not returned if the user goes to /contact_us/*/
app.get('/contact_us/:my_param?', (req, res) => {
    res.send(contactUsTemplate({
        address:req.params.my_param,
        day : 'Monday'
    }))
})


/* the app is listening on port 3000, so go to localhost:3000 to connect*/
app.listen(port, () =>console.log('the app is running'))
