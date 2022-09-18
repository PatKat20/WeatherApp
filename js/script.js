// Variáveis e Seletores
const apiKey = "9f90de47154f72ad37772857e5ed56db";
const countryFlag = "https://countryflagsapi.com/png/";
const weatherIconURL = "http://openweathermap.org/img/wn/";
const apiUnsplash = "https://source.unsplash.com/1600x900/?";

const inputSearch = document.getElementById("input-search");
const btnSearch = document.getElementById("input-button");

const body = document.querySelector("body")
const container = document.querySelector(".container");
const cityElement = document.getElementById("city");
const countryFlagElement = document.getElementById("country-flag");
const temperatureElement = document.querySelector("#temp span");
const weatherElement = document.getElementById("weather");
const weatherIconElement = document.getElementById("weather-icon");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind-speed span");

const informations = document.querySelector(".hide")
const errorMessageContainer = document.querySelector("#error-message")
// Funções
const changeBackground = (city)=>{
    body.style.backgroundImage = `url("${apiUnsplash + city}")`
}

const getWeatherData = async (city) => {
  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
  const res = await fetch(weatherURL)
  const dados = await res.json();   
  return dados;
};

const setWetherInformations = (dados) => {
  const cityName = dados.name;
  const country = dados.sys.country;
  const temp = dados.main.temp;
  const weather = dados.weather[0];
  const humidity = dados.main.humidity;
  const wind = dados.wind.speed;

  cityElement.innerHTML = `${cityName}`;
  countryFlagElement.src = `${countryFlag}${country}`;
  temperatureElement.innerHTML = Math.round(temp);
  weatherElement.innerHTML = `${weather.description}`;
  weatherIconElement.setAttribute(
    "src",
    `${weatherIconURL}${dados.weather[0].icon}.png`
  );
  humidityElement.innerHTML = `${humidity}`;
  windElement.innerHTML = `${wind}`;

  informations.classList.remove("hide")
};

const showWeatherData = async (city) => {
  const dados = await getWeatherData(city);
    if(dados.cod === "404"){
        informations.classList.add("hide")
        errorMessageContainer.classList.remove("hide")
    } else{
        errorMessageContainer.classList.add("hide")
    }

  setWetherInformations(dados);
  changeBackground(city)
};

// Eventos

btnSearch.addEventListener("click", (e) => {
  showWeatherData(inputSearch.value);
});

document.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    showWeatherData(inputSearch.value);
  }
});
