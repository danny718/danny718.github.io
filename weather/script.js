const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const humidityEl = document.querySelector ('.humidity-value p');
const pressureEl = document.querySelector ('.pressure-value p');
const sunriseEl = document.querySelector ('.sunrise p');
const sunsetEl = document.querySelector ('.sunset p');
const windSpeedEl = document.querySelector ('.wind_speed-value p');
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");


const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function preload(){
  
  for(i = 0; i < cities.length; i ++){
    var city = cities[i];
    weather.push(loadJSON(url + key));
  }
}

const weather = {};

weather.temperature = {
    unit : "celsius"
}
const KELVIN = 273;
const key = "4caad04fcb4cb56a34de54f40cb622c4";

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM'

    timeEl.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`

    dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month]

}, 1000);


// CHECK IF BROWSER SUPPORTS GEOLOCATION
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}
		
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    	console.log(position);
    getWeather(latitude, longitude);

}

// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> Please Enable Geolocation </p>`;
}

// GET WEATHER
function getWeather(latitude, longitude){
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

		fetch(api)
			.then(function(response){
				let data = response.json();
            	return data;
			})
			.then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
            weather.humidity = data.main.humidity;
            weather.pressure = data.main.pressure;
            weather.sunrise = data.sys.sunrise;
            weather.sunset = data.sys.sunset;
            weather.wind_speed = data.wind.speed;
            	console.log(data);

        })

        .then(function(){
            
            displayWeather();
        });
}

// DISPLAY WEATHER 
function displayWeather(data){
    
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
    humidityEl.innerHTML = `${weather.humidity}%`;
    pressureEl.innerHTML = `${weather.pressure}`;
    sunriseEl.innerHTML = `${window.moment(sunrise*1000).format('HH:mm a')}`;
    sunsetEl.innerHTML = `${window.moment(sunset*1000).format('HH:mm a')}`;
    windSpeedEl.innerHTML = `${weather.wind.speed}`;


}


function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}

tempElement.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return;
    
    if(weather.temperature.unit == "celsius"){
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        
        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    }else{
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius"
    }
})