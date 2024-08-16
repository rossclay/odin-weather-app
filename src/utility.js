// use this to convert between fahrenheit and celsius
const convertFToC = (weatherObj) => {
  weatherObj.currentConditions.temp = roundToTwo(
    weatherObj.currentConditions.temp - 32
  );
  weatherObj.currentConditions.feelslike = roundToTwo(
    weatherObj.currentConditions.feelslike - 32
  );
  weatherObj.days.forEach((day) => {
    day.feelslike = roundToTwo(day.feelslike - 32);
    day.feelslikemax = roundToTwo(day.feelslikemax - 32);
    day.feelslikemin = roundToTwo(day.feelslikemin - 32);
    day.temp = roundToTwo(day.temp - 32);
    day.tempmax = roundToTwo(day.tempmax - 32);
    day.tempmin = roundToTwo(day.tempmin - 32);
  });
};

const convertCToF = (weatherObj) => {
  weatherObj.currentConditions.temp = roundToTwo(
    weatherObj.currentConditions.temp + 32
  );
  weatherObj.currentConditions.feelslike = roundToTwo(
    weatherObj.currentConditions.feelslike + 32
  );
  weatherObj.days.forEach((day) => {
    day.feelslike = roundToTwo(day.feelslike + 32);
    day.feelslikemax = roundToTwo(day.feelslikemax + 32);
    day.feelslikemin = roundToTwo(day.feelslikemin + 32);
    day.temp = roundToTwo(day.temp + 32);
    day.tempmax = roundToTwo(day.tempmax + 32);
    day.tempmin = roundToTwo(day.tempmin + 32);
  });
};

const roundToTwo = (num) => {
  return +(Math.round(num + "e+2") + "e-2");
};

export { convertCToF, convertFToC };
