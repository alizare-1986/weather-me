import { weeksDay } from "./utils/customDate.js";
import getWeatherData from "./utils/httpReq.js";
import { removeModal, showModal } from "./utils/modal.js";


const searchInput = document.querySelector("input");
const searchButton = document.querySelector("button");
const weatherContain = document.getElementById("weather");
const iconLocation = document.getElementById("location");
const forecastContain = document.getElementById("forecast");
const modalButton=document.getElementById("modal-button")

const showWeather = (data) => {
  if(!data){
    return 
   
  }
  const weatherJSX = `
    <h1>${data.name}, ${data.sys.country}</h1>
    <div id="main">
    <img alt="weather icon" src="https://openweathermap.org/img/w/${
      data.weather[0].icon
    }.png" />
    <span>${data.weather[0].main}</span>
    <p>${Math.round(data.main.temp)} °C</p>
    </div>
    <div id="info">
    <p>Humidity : <Span>${data.main.humidity}%</span></p>
    <p>wind Speed : <Span>${data.wind.speed}m/s</span></p>
    </div>
    `;
  weatherContain.innerHTML = weatherJSX;
};

const showForecast = (data) => {
  if(!data)return
  forecastContain.innerHTML = "";
  data = data.list.filter((obj) => obj.dt_txt.endsWith("12:00:00"));
  data.forEach((i) => {
    const forecastJSX = `
  <div>
  <img alt="weather icon" src="https://openweathermap.org/img/w/${
    i.weather[0].icon
  }.png" />
  <h3>${weeksDay(i.dt)}</h3> 
  <p>${Math.round(i.main.temp)}</p>
  <span>${i.weather[0].main} °C</span>
  </div>
  `;
    forecastContain.innerHTML += forecastJSX;
  });
};
const handleSearch = async () => {
  const city = searchInput.value;
  if (!city) {
    showModal("please enter city");
    return
  }
  const currentWeather = await getWeatherData("current",city);
  showWeather(currentWeather);
  const forecastWeather = await getWeatherData("forecast",city);
  showForecast(forecastWeather);
};
const positionCallback = async (position) => {
  const currentData = await getWeatherData("current",position.coords);
  showWeather(currentData);
  const forecastData = await getWeatherData("forecast",position.coords);

  showForecast(forecastData);
};
const errorCallback = (error) => {
  showModal(error.message);
};
const handleLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(positionCallback, errorCallback);
  } else {
   showModal("does not support browser you geolocation");
  }
};
const handleInit=async()=>{
  const currentWeather = await getWeatherData("current","dezful");
  showWeather(currentWeather);
  const forecastWeather = await getWeatherData("forecast","dezful");
  showForecast(forecastWeather);
}
searchButton.addEventListener("click", handleSearch);
iconLocation.addEventListener("click", handleLocation);
modalButton.addEventListener("click",removeModal)
document.addEventListener("DOMContentLoaded",handleInit)
