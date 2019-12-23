const expect  = require('chai').expect;
const axios = require('axios');

it('call flask /train api', function(done) {

    instance = axios.create({
        baseURL: 'http://flask_app:5000/',
        timeout: 5000,
        headers: {'content-type':'application/json'},
    })

    instance.post('train',
        {
            "name": "Robbie",
            "age": "2",
            "fare": "2",
            "cabin": "32",
            "sex": "Male",
            "nosiblings": "3",
            "embark": "southampton",
            "label": "died"
        }
    ).then(
        response => {
            expect(response).to.equal('return from flask train API, received training data');
            done();   
        }).catch(error => {
            console.log(error)
        })
     
})




