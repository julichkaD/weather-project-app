let form = document.querySelector("#search-form");
form.addEventListener('submit',handleSearchButton)

function handleSearchButton(event) {
    event.preventDefault();
    let searchInput= document.querySelector("#input-form");
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = searchInput.value;
}