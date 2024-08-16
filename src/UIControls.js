import { WeatherDataObject, createWeatherDataObject } from "./weatherData";
import { convertFToC, convertCToF } from "./utility";
import { images } from "./imageImporter";

const UIController = (() => {
  const weatherCard = document.querySelector(".weather-card");
  let weatherData;
  let degrees = "°F";

  const degreeBtnF = document.getElementById("°F");
  const degreeBtnC = document.getElementById("°C");
  degreeBtnF.addEventListener("click", (e) => {
    handleDegreeBtnClick(degreeBtnF, degreeBtnC, e.target.id, weatherData);
  });
  degreeBtnC.addEventListener("click", (e) => {
    handleDegreeBtnClick(degreeBtnC, degreeBtnF, e.target.id, weatherData);
  });

  const handleDegreeBtnClick = (btn1, btn2, id, weatherData) => {
    btn1.setAttribute("class", "degree active");
    btn2.setAttribute("class", "degree");
    setDegrees(id, weatherData);
    populateWeatherCard(weatherData);
  };

  const setDegrees = (id, weatherData) => {
    degrees = id;
    if (id === "°F") {
      convertCToF(weatherData);
    } else if (id === "°C") {
      convertFToC(weatherData);
    }
    populateWeatherCard(weatherData);
  };

  const getLocation = (
    location = document.querySelector(".weather-input").value
  ) => {
    if (location != "") {
      return location;
    } else if (location === "") {
      alert("You must enter a location.");
    }
  };

  const setWeatherDataForLocation = async (searchLocation = getLocation()) => {
    try {
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${searchLocation}?key=N2XX5XYB4BNRJUJHRY69NDDGY&contentType=json`
      );
      weatherData = await response.json();
    } catch (error) {
      alert("Please enter a valid location.");
      console.log(error);
    }
  };

  const processWeatherData = (data) => {
    weatherData = createWeatherDataObject(
      data.resolvedAddress,
      data.currentConditions,
      data.days
    );
    if (degrees === "°C") {
      convertFToC(weatherData);
    }
  };

  const clearWeatherCard = () => {
    weatherCard.innerHTML = "";
  };

  const populateWeatherCard = (weatherData) => {
    clearWeatherCard();
    const weatherHeader = document.createElement("div");
    weatherHeader.classList.add("weather-header");
    const locationNameHeader = document.createElement("h3");
    locationNameHeader.textContent = weatherData.location;
    weatherHeader.appendChild(locationNameHeader);
    const weatherContent = document.createElement("div");
    weatherContent.classList.add("weather-content");
    const conditionsDiv = document.createElement("div");
    conditionsDiv.textContent = weatherData.currentConditions.conditions;
    weatherContent.appendChild(conditionsDiv);
    const currentConditionsIcon = document.createElement("img");
    currentConditionsIcon.setAttribute(
      "alt",
      `${weatherData.currentConditions.icon}`
    );
    currentConditionsIcon.src =
      images[`${weatherData.currentConditions.icon}.png`];
    weatherContent.appendChild(currentConditionsIcon);
    const weatherFooter = document.createElement("div");
    weatherFooter.classList.add("weather-footer");
    const tempDiv = document.createElement("div");
    tempDiv.textContent = `Current temperature: ${weatherData.currentConditions.temp} ${degrees}`;
    weatherFooter.appendChild(tempDiv);
    const minTempDiv = document.createElement("div");
    minTempDiv.textContent = `Low: ${weatherData.days[0].tempmin} ${degrees}`;
    weatherFooter.appendChild(minTempDiv);
    const highTempDiv = document.createElement("div");
    highTempDiv.textContent = `High: ${weatherData.days[0].tempmax} ${degrees}`;
    weatherFooter.appendChild(highTempDiv);
    const feelsLikeDiv = document.createElement("div");
    feelsLikeDiv.textContent = `Feels like: ${weatherData.currentConditions.feelslike} ${degrees}`;
    weatherFooter.appendChild(feelsLikeDiv);
    weatherCard.appendChild(weatherHeader);
    weatherCard.appendChild(weatherContent);
    weatherCard.appendChild(weatherFooter);
  };

  const searchBtn = document.querySelector(".search-btn");
  searchBtn.addEventListener("click", (e) => {
    handleSubmitSearch();
  });
  document.querySelector(".weather-input").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleSubmitSearch();
    }
  });

  const handleSubmitSearch = async () => {
    await setWeatherDataForLocation();
    processWeatherData(weatherData);
    populateWeatherCard(weatherData);
  };
  const init = async () => {
    await setWeatherDataForLocation("Atlanta");
    processWeatherData(weatherData);
    populateWeatherCard(weatherData);
  };
  init();
  // favicon
  let link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }
  link.href = images[`weather-app.png`];
})();

export default { UIController };
