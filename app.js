const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const api = require('novelcovid')
const request = require('request');
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));


app.get("/", function(req, res){
    api.countries({sort:'cases'}).then(function(result){
        res.render("index", {datas : result});
        
    }).catch(function(err){
        console.log(err);
        
    });
});

app.get("/news", function(req, res){
        request('https://covid-19india-api.herokuapp.com/headlines', function (error, response, body) {
          console.error('error:', error); // Print the error if one occurred
          console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
          console.log('body:', body); // Print the HTML for the Google homepage.
    });
});

app.listen(3000, function(){
    console.log("Server started on port 3000");
    
});