import express from "express";
import axios from "axios";


const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
const port = 3000;



app.get("/", (req, res) => {
    const weatherData = "today is sunny"
    
  res.render("index.ejs", { weather: weatherData});
});

app.post("/weather", async (req,res) =>{


    const yourApiKey = "653c98e5caaa6b0382ae46d9c1543600";
    const cityName = req.body.city || "IN";
    
   
    const geoUrl = `http://api.openweathermap.org/geo/1.0/zip?zip=600001,IN&appid=YourApiKey`;
    
try {
    const geoResponse = await axios.get(geoUrl);
    if (geoResponse.data.length === 0) {
        throw new Error("City not found");
    }


    res.render("index.ejs", {
        weather: `Current weather in ${cityName}: ${weatherDescription}, Temp: ${temp}°C, Feels like: ${feelsLike}°C, Humidity: ${humidity}%`,
        error: null 
    });


}catch(error) { 
    res.render('index', { weather: null, error: 'City not found, please try again!' });
  }

});



app.listen(port,()=>{ 
    console.log(`server is running on port ${port}.`);
});