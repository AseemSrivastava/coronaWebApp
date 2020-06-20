const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const api = require('novelcovid');
const request = require('request');
const app = express();  

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));


app.get("/", function(req, res){
    api.countries().then(function(result){
        res.render("index", {datas : result});
    }).catch(function(err){
        console.log(err);
    });
});

app.get("/news", function(req, res){
        request('https://covid-19india-api.herokuapp.com/headlines', function (error, response, body) {
          var content = JSON.parse(body);
          res.render("news",{datas : content});
          console.log('body:', content);
    });
});
var fs = require('fs');
app.get("/map", function(req, res){
  api.countries().then(function(result){
        var arr = [];
        result.forEach(function(data){
          var obj = {
          lat: data.countryInfo.lat,
          long: data.countryInfo.long,
          cases: data.cases
        }
          arr.push(obj);
        });
        res.render("worldmap", {datas : arr});
        console.log(arr);
        fs.writeFile("/temp", arr, function(err){
          if(err){
              console.log(err);
          } else{
              console.log("success");
          }
        });
    }).catch(function(err){
        console.log(err);
    });
});

app.listen(3000, function(){
    console.log("Server started on port 3000");
    
});