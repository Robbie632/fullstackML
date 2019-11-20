console.log('client side javascript file loaded')

const input = document.querySelector('form')

//define object containing data inputted into form search box
const search = document.querySelector('input')

//This selects the tag with the id 'message'
const messageOutput = document.querySelector('#predict_output')

/*
The below code does the following
- takes input from a html form
- creates stringquery from the form inout
- makes an API call to the web server suing the stringquery and fetch
- logs the API call response
*/

input.addEventListener('submit', (e)  => {
    /*the below line of code is very standard, if it was not ececuted then the
    page would just refresh*/
    e.preventDefault()

    console.log('form submitted')

    //retrieve input given to form
    const receivedInput = search.value
    console.log(receivedInput)

    //create query query string
    apiQuery = "http://localhost:3000/predict?predictRequest=" + receivedInput
    //input query string to fetch to make API call
    fetch(apiQuery).then((apiResponse) => {
        apiResponse.json().then((jsonOut) => {
        console.log(jsonOut)
        messageOutput.textContent = jsonOut.hello
        })
    })
})
