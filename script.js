document.querySelector("#search").addEventListener("submit", async (event) => {
  event.preventDefault();

  const cityName = document.getElementById("search_city").value;

  if (!cityName) {
    return showAlert("Digite o nome de uma cidade...");
  }

  const apiKey = "75cc0285676ecb8d79f8734535d3d577";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
    cityName
  )}&appid=${apiKey}&units=metric&lang=pt_br`;

  const results = await fetch(apiUrl);
  const json = await results.json();

  if (json.cod === 200) {
    infos({
      city: json.name,
      country: json.sys.country,
      temp: json.main.temp,
      tempMax: json.main.temp_max,
      tempMin: json.main.temp_min,
      description: json.weather[0].description,
      tempIcon: json.weather[0].icon,
      windSpeed: json.wind.speed,
      humidity: json.main.humidity,
    });
  } else {
    showAlert(
      "Desculpe, não foi possível localizar os dados para essa cidade."
    );
  }
});

function infos(json) {
  showAlert("");
  document.querySelector(".weather").classList.add("show");
  document.getElementById(
    "city_name"
  ).innerHTML = `${json.city}, ${json.country}`;
  document.getElementById("weather_temp").innerHTML = `${json.temp
    .toFixed(1)
    .toString()
    .replace(".", ",")}ºC`;
  document.getElementById("max-temp").innerHTML = `${json.tempMax
    .toFixed(1)
    .toString()
    .replace(".", ",")}ºC`;
  document.getElementById("min-temp").innerHTML = `${json.tempMin
    .toFixed(1)
    .toString()
    .replace(".", ",")}ºC`;
  document.getElementById("weather_status").innerHTML = `${
    json.description.charAt(0).toUpperCase() + json.description.slice(1)
  }`;
  document
    .getElementById("temp-icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`
    );
  document.getElementById("humidity").innerHTML = `${json.humidity}%`;
  document.getElementById("wind").innerHTML = `${json.windSpeed
    .toFixed(1)
    .replace(".", ",")}km/h`;
}

function showAlert(msg) {
  document.getElementById("alert").innerHTML = msg;
}
