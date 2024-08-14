import { WeatherDataObject, createWeatherDataObject } from "./weatherData";
import * as imageImporter from "./imageImporter";

const UIController = (() => {
  const weatherCard = document.querySelector(".weather-card");
  //   const images = imageImporter.importAllImages(
  //     require.context("./png", false, /\.(png|jpe?g|svg)$/)
  //   );

  let degrees = "°F";

  const determineDegrees = () => {};

  const getLocation = (
    location = document.querySelector(".weather-input").value
  ) => {
    return location;
  };

  const getWeatherDataForLocation = async () => {
    try {
      const searchLocation = getLocation();
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${searchLocation}?key=N2XX5XYB4BNRJUJHRY69NDDGY&contentType=json`
      );
      const weatherData = await response.json();
      return weatherData;
    } catch (error) {
      console.log(error);
    }
  };

  const processWeatherData = async () => {
    const data = await getWeatherDataForLocation();
    const processedWeatherData = createWeatherDataObject(
      data.resolvedAddress,
      data.currentConditions,
      data.days
    );
    console.log(processedWeatherData);
    return processedWeatherData;
  };

  const clearWeatherCard = () => {
    weatherCard.innerHTML = "";
  };

  const populateWeatherCard = async () => {
    clearWeatherCard();
    const weatherData = await processWeatherData();
    const weatherHeader = document.createElement("div");
    weatherHeader.classList.add("weather-header");
    const locationNameHeader = document.createElement("h3");
    locationNameHeader.textContent = weatherData.location;
    weatherHeader.appendChild(locationNameHeader);
    const conditionsDiv = document.createElement("div");
    conditionsDiv.textContent = weatherData.currentConditions.conditions;
    weatherHeader.appendChild(conditionsDiv);
    const currentConditionsIcon = document.createElement("img");
    currentConditionsIcon.setAttribute(
      "alt",
      `${weatherData.currentConditions.icon}`
    );
    // UPDATE IMG SRC....
    // console.log(
    //   await images[images.indexOf(weatherData.currentConditions.icon)]
    // );
    // currentConditionsIcon.src = `${await images[
    //   weatherData.currentConditions.icon
    // ]}`;
    weatherHeader.appendChild(currentConditionsIcon);
    const weatherFooter = document.createElement("div");
    weatherFooter.classList.add("weather-footer");
    const tempDiv = document.createElement("div");
    tempDiv.textContent = `Current temperature: ${weatherData.currentConditions.temp} ${degrees}`;
    weatherFooter.appendChild(tempDiv);
    const minTempDiv = document.createElement("div");
    minTempDiv.textContent = `Low: ${weatherData.days[0].tempmin} ${degrees}`;
    weatherFooter.appendChild(minTempDiv);
    const highTempDiv = document.createElement("div");
    highTempDiv.textContent = `Low: ${weatherData.days[0].tempmax} ${degrees}`;
    weatherFooter.appendChild(highTempDiv);
    const feelsLikeDiv = document.createElement("div");
    feelsLikeDiv.textContent = `Feels like: ${weatherData.currentConditions.feelslike} ${degrees}`;
    weatherFooter.appendChild(feelsLikeDiv);
    weatherCard.appendChild(weatherHeader);
    weatherCard.appendChild(weatherFooter);
  };

  const searchBtn = document.querySelector(".search-btn");
  searchBtn.addEventListener("click", () => {
    handleSubmitSearch();
  });

  const handleSubmitSearch = () => {
    populateWeatherCard();
  };
})();

export default { UIController };
