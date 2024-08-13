import { WeatherDataObject, createWeatherDataObject } from "./weatherData";

const getLocation = () => {
  const location = document.querySelector(".weather-input").value;
  console.log(location);
  return location;
};

const getWeatherDataForLocation = async () => {
  try {
    const searchLocation = getLocation();
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${searchLocation}?unitGroup=metric&key=N2XX5XYB4BNRJUJHRY69NDDGY&contentType=json`
    );
    const weatherData = await response.json();
    console.log(weatherData);
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

const searchBtn = document.querySelector(".search-btn");
searchBtn.addEventListener("click", () => {
  handleSubmitSearch();
});

const handleSubmitSearch = () => {
  processWeatherData();
};
