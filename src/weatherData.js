class WeatherDataObject {
  constructor(location, currentConditions, days) {
    this.location = location;
    this.currentConditions = currentConditions;
    this.days = days;
  }
}

const createWeatherDataObject = (location, currentConditions, days) => {
  return new WeatherDataObject(location, currentConditions, days);
};

export { createWeatherDataObject, WeatherDataObject };
