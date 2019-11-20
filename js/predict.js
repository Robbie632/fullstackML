console.log('client side javascript file loaded')

const inputForm = document.querySelector('#predictionForm')

//define object containing data inputted into form search box

//This selects the tag with the id 'message'
const messageOutput = document.querySelector('#predictOutput')

/*
The below code does the following
- takes input from a html form
- creates stringquery from the form inout
- makes an API call to the web server suing the stringquery and fetch
- logs the API call response
*/

inputForm.addEventListener('submit', (e)  => {
    /*the below line of code is very standard, if it was not ececuted then the
    page would just refresh*/
    e.preventDefault()

    console.log('form submitted')

    const formData = {
        name: inputForm.name.value,
        passengerClass: "1",
        sex: "M",
    };

    //create query query string
    apiQuery = "http://localhost:3000/predict"

    //input query string to fetch to make API call
    fetch(apiQuery, {
        method:'POST',
        body:JSON.stringify(formData),
        headers:{
            'Content-Type':'application/json'
        }
    }).then((apiResponse) => {
        apiResponse.json().then((jsonOut) => {
        console.log(jsonOut)
        messageOutput.textContent = jsonOut.message
        })
    })
})
