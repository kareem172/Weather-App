const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const https = require('https');
app.use(express.static(__dirname));
const port = 3000

app.use(bodyParser.urlencoded({extended : true}));


app.get("/",function(req,res){
    res.sendFile("/index.html");
})

app.post("/",function(req, res){
    var cityName = req.body.cityName;
    console.log(cityName);
    var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?appid=6773a3de13f057862fdee679904b073b&q="+cityName+"&units=metric";

    https.get(weatherUrl,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            var weather = JSON.parse(data);
            var temp = weather.main.temp;
            var description = weather.weather[0].description;
            var icon = weather.weather[0].icon;
            var imageUrl = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<p>the weather is " + description+"</p>");
            res.write("<h1>the Temprateture degree is " + temp+" C</h1> ");
            res.write("<img src='"+imageUrl+"'alt='...'>");
            res.send();
            
        })
    });
})

app.listen(port,function(){
    console.log("MY Server is running on port 3000");
})