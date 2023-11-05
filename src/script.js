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
  temp.innerHTML = Math.round(response.data.temperature.current) + "℃";
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
}
