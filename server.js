const https=require("https");
const express=require("express");
const bodyParser=require("body-parser");

const app=express();
app.use(bodyParser.urlencoded({extended : true}))



app.get('/', function(req,res){

    res.sendFile(__dirname + "/index.html")
    
})

app.post('/', function(res,req){
    const city=res.body.city
    const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=f7eb0ee33310e217f6b01b2a6fee8ad9&units=metric"
    https.get(url, function(response){         
        console.log(response.statusCode)
         response.on("data", function(data){
            const weatherData=JSON.parse(data)
            const temp=weatherData.main.temp
            const weatherDiscp=weatherData.weather[0].description   
            const icon=weatherData.weather[0].icon   
            const icon_img='https://openweathermap.org/img/wn/'+icon+'@2x.png'
            console.log(weatherDiscp)
            req.write("<h1>temperature of "+ city +" is " + temp + " degree celcius </h1>")
            req.write("<p> the weather is currently " + weatherDiscp + "</p>")
            req.write("<img src="+icon_img+">")
            req.send()
         })
    })  
})

app.listen(3000, function(){
    console.log("Server is running on port 3000")
})