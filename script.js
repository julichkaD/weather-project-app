//city.value
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSearchButton);

function handleSearchButton(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#input-form");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchInput.value;
  showData(searchInput.value);
}

//API
function showData(city) {
  let apiKey = "b58a2f047af526to478d86be21c3e75d";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(updateData);
}

function updateData(response) {
  console.log(response);
  let temp = document.querySelector("#current-temp");
  temp.innerHTML = `${Math.round(response.data.temperature.current)}°C`;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.condition.description;
  let wind = document.querySelector("#wind-speed");
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.temperature.humidity} %`;
  let time = document.querySelector("#current-day");
  let date = new Date(response.data.time * 1000);
  let day = document.querySelector("#current-date");
  day.innerHTML = formattedMonth(date);
  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}">`;
  console.log(iconElement);

  time.innerHTML = formatDate(date);
  getForecast(response.data.city);
}
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = daysOfWeek[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function formattedMonth(date) {
  let day = date.getDate();
 const months = [
   "January",
   "February",
   "March",
   "April",
   "May",
   "June",
   "July",
   "August",
   "September",
   "October",
   "November",
   "December",
 ];
 let month = months[date.getMonth()];
 return `${month}, ${day}`
}

// 5 days forecast
function displayForecast(response) {
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if(index<5) {
    forecastHtml =
      forecastHtml +
      `<div class=" col-2 card rounded-pill mx-auto">
        <div class="weather-forecast-date">${formattedForecast(day.time)}</div>
       <div><img src = "${day.condition.icon_url}" class="weather-forecast-icon" /></div> 
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>${Math.round(day.temperature.maximum)}º</strong>
          </div>
          <div class="weather-forecast-temperature">${Math.round(
            day.temperature.minimum
          )}º</div>
        </div>
      </div>`;}
  });
  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = forecastHtml;
}

//forecast display

function formattedForecast(time) {
  let date = new Date(time * 1000);
   let daysOfWeek = [
     "Sun",
     "Mon",
     "Tue",
     "Wed",
     "Thu",
     "Fri",
     "Sat",
   ];
   return daysOfWeek[date.getDay()];
}

function getForecast(city) {
  let apiKey = "b58a2f047af526to478d86be21c3e75d";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios(apiUrl).then(displayForecast);
}
showData("Paris");
