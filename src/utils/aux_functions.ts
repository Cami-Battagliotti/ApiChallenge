import { ResponseStatus } from "./responseMsg";
import { countriesByCapital } from "../controllers/countries";
import {
  currentWeather,
  weatherForecast,
  sportsEvents,
} from "../controllers/weather";

// validateParameter => verifica que el parametro exista, que sea un string y solo contenga letras.
function validateParameter(clientRequest) {
  // Expresion regular que verifica que el parametro indicado en regex.test() solo contenga letras.
  const regex = /^[a-zA-Z]*$/;
  const letters = regex.test(clientRequest.parameterName);
  if (!letters || typeof clientRequest.parameterName != "string") {
    return JSON.stringify(ResponseStatus.BAD_REQUEST);
  } else if (!clientRequest.parameterName) {
    return JSON.stringify(ResponseStatus.MISSING_DATA);
  }
}

// CapitalAndCurrentWeather() => Obtiene y devuelve la informacion de paises filtrados por la capital indicada junto al clima actual de la misma.
async function CapitalAndCurrentWeather(clientRequest) {
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

// CapitalAndForecast() => Obtiene y devuelve la informacion de paises filtrados por la capital indicada junto al pronostico del clima de la misma.
async function CapitalAndForecast(clientRequest) {
  const validParameter = validateParameter(clientRequest);
  if (typeof validParameter == "string") {
    return validParameter;
  }
  // Verifica que la cantidad de dias haya sido ingresada y sea de tipo number.
  if (!clientRequest.days || typeof clientRequest.days != "number") {
    return JSON.stringify(ResponseStatus.BAD_REQUEST);
  }
  const countryData = await countriesByCapital(clientRequest.parameterName);
  const weatherData = await weatherForecast(
    clientRequest.parameterName,
    clientRequest.days
  );
  const collectedData = { countryData, weatherData };
  const clientFeedback = JSON.stringify(collectedData);

  return clientFeedback;
}

// CapitalAndSports() => Obtiene y devuelve la informacion de paises filtrados por la capital indicada junto a los proximos eventos deportivos llevados a cabo en la misma.
async function CapitalAndSports(clientRequest) {
  const validParameter = validateParameter(clientRequest);
  if (typeof validParameter == "string") {
    return validParameter;
  }
  const countryData = await countriesByCapital(clientRequest.parameterName);
  const sportsData = await sportsEvents(clientRequest.parameterName);
  const collectedData = { country: countryData, sports: sportsData };
  const clientFeedback = JSON.stringify(collectedData);
  return clientFeedback;
}

validateParameter({ requestedAction: "name", parameterName: "1" });

export {
  validateParameter,
  CapitalAndCurrentWeather,
  CapitalAndForecast,
  CapitalAndSports,
};
