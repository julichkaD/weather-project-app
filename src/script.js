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
  let temp = document.querySelector("#current-temp");
  temp.innerHTML = `${Math.round(response.data.temperature.current)}℃`;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.condition.description;
  let wind = document.querySelector("#wind-speed");
  wind.innerHTML = `${Math.round(response.data.wind.speed)} m/h`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.temperature.humidity} %`;
  let icon = document.querySelector("#icon");
  icon.innerHTML = response.data.condition.icon_url;
  let time = document.querySelector("#current-day");
  let date = new Date(response.data.time * 1000);

  time.innerHTML = formatDate(date);
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
  if (minutes > 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}
