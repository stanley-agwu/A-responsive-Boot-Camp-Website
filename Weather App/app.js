
// Select DOM Elements
const weatherNotification = document.querySelector(".weather-notification");
const weatherIcon = document.querySelector(".weather-icon");
const temperatureValue = document.querySelector(".temperature-value p");
const weatherDescription = document.querySelector(".weather-description p");
const weatherLocation = document.querySelector(".weather-location p");

const weatherInfo ={}

weatherInfo.temperature={
	unit: "celsius"
}


// Check Geolocation on browser
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
    weatherNotification.hidden = true;
}else{
    weatherNotification.style.display = "block";
    weatherNotification.textContent = "<p>Browser doesn't Support Geolocation!</p>";
    weatherNotification.hidden=true;
}

// Creating the setPosition Function
async function setPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    
    getWeather(lat, lon);
}

//  Creating the showError Function
async function showError(error) {
    weatherNotification.style.display = "block";
    weatherNotification.textContent = error.message;
    weatherLocation.hidden=true;
}

const API_KEY=enter_API_KEY;

// Creating the getWeather Function to fetch API data
async function getWeather(lat, lon) {
    let API_URL = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    
    console.log(API_URL)
    const response = await fetch(API_URL)
    const data = await response.json()

    weatherInfo.icon = data.weather[0].icon;
    weatherInfo.temperature.value = (data.main.temp).toFixed(1);
    weatherInfo.description = data.weather[0].description;
    weatherInfo.city = data.name;
    weatherInfo.country = data.sys.country;
	console.log(weatherInfo)

	displayWeatherInfo()

}

//Creating a displayWeatherInfo Function to display DOM elements
 const displayWeatherInfo = ()=>{
 	weatherIcon.innerHTML = `<img src="icons/${weatherInfo.icon}.png"/>`;
    temperatureValue.textContent = `${weatherInfo.temperature.value}° C`;
    weatherDescription.textContent = weatherInfo.description
    weatherLocation.textContent = `${weatherInfo.city}, ${weatherInfo.country}`
 }


const celsiusTofarenheit = temperature => {	return (temperature * 9/5).toFixed(1)}


// Adding Event Listener to the temperature parameter
temperatureValue.addEventListener("click", event => {
    if(weatherInfo.temperature.value === undefined) return;
    
    if(weatherInfo.temperature.unit == "celsius"){
        const fahrenheit = celsiusTofarenheit(weatherInfo.temperature.value);
        
        temperatureValue.textContent = `${fahrenheit}°<span>F</span>`;
        weatherInfo.temperature.unit = "fahrenheit";
    } else {
        temperatureValue.textContent = `${weatherInfo.temperature.value}°<span>C</span>`;
        weatherInfo.temperature.unit = "celsius"
    }
})