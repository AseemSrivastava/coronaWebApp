
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const api = require('novelcovid')

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));


app.get("/", function(req, res){
    api.countries().then(function(result){
        res.render("index", {datas : result});
        console.log(result);
        
    }).catch(function(err){
        console.log(err);
        
    });
});


app.listen(3000, function(){
    console.log("Server started on port 3000");
    
});