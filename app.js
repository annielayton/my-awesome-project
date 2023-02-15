let now = new Date();
let current = document.querySelector(".date");

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();

let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

current.innerHTML = `${day}, ${month} ${date}, ${year}. ${hours}:${minutes}`;

function displayWeatherCondition(response) {
  document.querySelector(".today").innerHTML = response.data.name;
  document.querySelector("#changingtemp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function search(city) {
  let apiKey = "3c949ba49d38be2487ee278e0d2d4059";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#searchCity").value;
  search(city);
}

let searchCity = document.querySelector("#searchCity");
let button = document.querySelector("#button-addon2");
button.addEventListener("submit", handleSubmit);

function convertCelcius(event) {
  event.preventDefault();
  let changingtemp = document.querySelector("#changingtemp");
  changingtemp.innerHTML = 21;
}
function convertFarinheit(event) {
  event.preventDefault();
  let changingtemp = document.querySelector("#changingtemp");
  changingtemp.innerHTML = 70;
}
let farinheitTemp = document.querySelector("#farinheit-link");
let celciusTemp = document.querySelector("#celcius-link");
farinheitTemp.addEventListener("click", convertFarinheit);
celciusTemp.addEventListener("click", convertCelcius);

function searchLocation(position) {
  //console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "3c949ba49d38be2487ee278e0d2d4059";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function showTemperature(response) {
  //console.log(response.data.main.temp);
  let temperature = Math.round(response.data.main.temp);
  currentlocation.innerHTML = `The current temperature is ${temperature}`;
}

let currentlocation = document.querySelector("#currentlocation");
currentlocation.addEventListener("click", getCurrentLocation);

search("New York");
