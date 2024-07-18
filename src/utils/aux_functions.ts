import { ResponseStatus } from "./responseMsg";
import { countriesByCapital } from "../controllers/countries";
import {
  currentWeather,
  weatherForecast,
  sportsEvents,
} from "../controllers/weather";

// validateParameter => verifica que el parametro exista, sea un string y solo contenga letras.
function validateParameter(clientRequest) {
  const regex = /^[a-zA-Z]*$/;
  const letters = regex.test(clientRequest.parameterName);

  if (!letters || typeof clientRequest.parameterName != "string") {
    return JSON.stringify("BAD");
  } else if (!clientRequest.parameterName) {
    return JSON.stringify("MISSING");
  }
}

async function CapitalAndCurrentWeather(clientRequest) {
  // const regex = /^[a-zA-Z]+$/;
  // const letters = regex.test(clientRequest.parameterName);
  const validParameter = validateParameter(clientRequest);
  if (typeof validParameter == "string") {
    return validParameter;
  }
  const countryData = await countriesByCapital(clientRequest.parameterName);
  const weatherData = await currentWeather(clientRequest.parameterName);
  const collectedData = { country: countryData, weather: weatherData };
  const clientFeedback = JSON.stringify(collectedData);
  return clientFeedback;
}

async function CapitalAndForecast(clientRequest) {
  const validParameter = validateParameter(clientRequest);
  if (typeof validParameter == "string") {
    return validParameter;
  }
  if (!clientRequest.date || typeof clientRequest.date != "string") {
    return JSON.stringify(ResponseStatus.BAD_REQUEST);
  }
  const countryData = await countriesByCapital(clientRequest.parameterName);
  const weatherData = await weatherForecast(
    clientRequest.parameterName,
    clientRequest.date
  );
  const collectedData = { countryData, weatherData };
  const clientFeedback = JSON.stringify(collectedData);

  return clientFeedback;
}

async function CapitalAndSports(clientRequest) {
  // if (typeof clientRequest.parameterName != "string") {
  //   return JSON.stringify(ResponseStatus.BAD_REQUEST);
  // }
  const validParameter = validateParameter(clientRequest);
  if (typeof validParameter == "string") {
    return validParameter;
  }
  const countryData = await countriesByCapital(clientRequest.parameterName);
  const sportsData = await sportsEvents(clientRequest.parameterName);
  const collectedData = { country: countryData, sports: sportsData };
  //console.log(collectedData);
  const clientFeedback = JSON.stringify(collectedData);
  return clientFeedback;
}

export {
  validateParameter,
  CapitalAndCurrentWeather,
  CapitalAndForecast,
  CapitalAndSports,
};
