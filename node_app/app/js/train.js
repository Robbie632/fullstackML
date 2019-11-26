console.log('client side train javascript file loaded')
console.log('client side predict javascript file loaded')

//get predict form by element id
const inputForm = document.querySelector('#predictionForm')

//this is the html element that will be changed after API request
const messageOutput = document.querySelector('#trainOutput')

inputForm.addEventListener('submit', (e)  => {
    /*the below line of code is very standard, if it was not ececuted then the
    page would just refresh*/
    e.preventDefault()

    console.log('form submitted')

    //extract data from form and assig to object
    const formData = {
        name: inputForm.name.value,
        age: inputForm.age.value,
        fare: inputForm.fare.value,
        cabin: inputForm.cabin.value,
        sex: inputForm.sex.value,
        nosiblings:inputForm.siblings.value,
        embark: inputForm.embark.value,
        label: inputForm.label.value
    };

    /*create query query string
    API requests can either be GET or post
    when largeer amounts of data have to be transmitted then do POST with data
    in the body as a payload*/

    //string query below with no string params because using POST
    //when deploying with heroku would have to use relative path eg /predict
    apiQuery = "http://localhost:3000/train"

    fetch(apiQuery, {
        //POST API call
        method:'POST',
        //body payload always has to be in string form
        body:JSON.stringify(formData),
        //need to tell server side node type of data
        headers:{
            'Content-Type':'application/json'
        }
    }).then((apiResponse) => {
        apiResponse.json().then((jsonOut) => {
        console.log(jsonOut)
        //convert html element text to
        messageOutput.textContent = jsonOut.message.age
        })
    })
})
