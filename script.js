const appKey = "3a862da3e32b56d2dd6dc4731bc4b616";

let searchButton = document.getElementById("searchBtn");
let searchInput = document.getElementById("searchTxt");
let localBtn = document.getElementById("localBtn");
let cityName = document.getElementById("cityName");
let icon = document.getElementById("icon");
let temperature = document.getElementById("temp");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let clouds = document.getElementById("clouds");
let pressure = document.getElementById("pressure");

searchButton.addEventListener("click", findWeatherDetails);
searchInput.addEventListener("keyup", enterPressed);
localBtn.addEventListener("click", geolocation);

let searchLink = "https://api.openweathermap.org/data/2.5/weather?q=" + 'Warszawa' + "&appid=" + appKey;
        httpRequestAsync(searchLink);

function enterPressed(event) {
    if (event.key === "Enter") {
        findWeatherDetails();
    }
}

function findWeatherDetails() {
    if (searchInput.value === "") {
        alert('add city');
    } else {
        let searchLink = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput.value + "&appid=" + appKey;
        httpRequestAsync(searchLink);
    }
}

function theResponse(jsonObject) {
    cityName.innerHTML = jsonObject.name;
    icon.src = "http://openweathermap.org/img/w/" + jsonObject.weather[0].icon + ".png";
    temperature.innerHTML = parseInt(jsonObject.main.temp - 273) + "°C";
    humidity.innerHTML = jsonObject.main.humidity + "%";
    wind.innerHTML = jsonObject.wind.speed+'m/s';
    clouds.innerHTML = jsonObject.weather[0].main;
    pressure.innerHTML = jsonObject.main.pressure + 'hPa';
}

function httpRequestAsync(url) {
    let httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", url, true);
    httpRequest.addEventListener('readystatechange', function () {
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            let jsonObject = JSON.parse(httpRequest.responseText);
            theResponse(jsonObject);
        };
    });

    httpRequest.send();
}

function geolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, fail);
 }};

function success(position) {
    var location = "https://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&appid=" + appKey;
    httpRequestAsync(location);
}

function fail() {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.")
            break;
        case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.")
            break;
        case error.TIMEOUT:
        alert("The request to get user location timed out.")
            break;
        case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.")
            break;
    }
}