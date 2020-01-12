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


    //extract data from form and assig to object
    
    const formData = {
        Name: inputForm.name.value,
        Pclass: inputForm.pclass.value,
        SibSp: inputForm.siblings.value,
        Ticket:inputForm.ticket.value,
        Age: inputForm.age.value,
        Parch: inputForm.parch.value,
        Fare: inputForm.fare.value,
        Cabin: inputForm.cabin.value,
        Sex: inputForm.sex.value,
        Embarked: inputForm.embarked.value,
        Survived: inputForm.label.value,
    };

    /*create query query string
    API requests can either be GET or post
    when largeer amounts of data have to be transmitted then do POST with data
    in the body as a payload*/

    //string query below with no string params because using POST
    //when deploying with heroku would have to use relative path eg /predict
    apiQuery = "/train"

    fetch(apiQuery, {
        method:'POST',
        //body payload always has to be in string form
        body:JSON.stringify(formData),
        headers:{
            'Content-Type':'application/json'
        }
    }).then((apiResponse) => {
        apiResponse.json().then((jsonOut) => {
        console.log(`jsonOut is ${jsonOut}`)
        //convert html element text to message
        messageOutput.textContent = 'thankyou, your data has been submitted'
        }).catch((error) => {
            return(console.log(error))
        })
    })
})
