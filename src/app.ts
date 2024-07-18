import {
  countriesByCommonName,
  countriesByCapital,
  countriesByCurrency,
  countriesByLanguage,
  allCountries,
} from "./controllers/countries";

import { ResponseStatus } from "./utils/responseMsg";
import {
  CapitalAndCurrentWeather,
  CapitalAndForecast,
  CapitalAndSports,
} from "./utils/aux_functions";

export async function main(clientMessage) {
  const message = clientMessage.toString();
  const clientRequest = JSON.parse(message);

  if (clientRequest.requestedAction == "all") {
    const collectedData = await allCountries();
    const clientFeedback = JSON.stringify(collectedData);
    return clientFeedback;
  } else if (clientRequest.requestedAction == "language") {
    const collectedData = await countriesByLanguage(clientRequest);
    const clientFeedback = JSON.stringify(collectedData);
    return clientFeedback;
  } else if (clientRequest.requestedAction == "name") {
    const collectedData = await countriesByCommonName(
      clientRequest.parameterName
    );
    const clientFeedback = JSON.stringify(collectedData);
    return clientFeedback;
  } else if (clientRequest.requestedAction == "currency") {
    const collectedData = await countriesByCurrency(clientRequest);
    const clientFeedback = JSON.stringify(collectedData);
    return clientFeedback;
  } else if (clientRequest.requestedAction == "capital") {
    const capitalAndWeather = CapitalAndCurrentWeather(clientRequest);
    return capitalAndWeather;
  } else if (clientRequest.requestedAction == "capitalAndForecast") {
    const capitalAndForecast = CapitalAndForecast(clientRequest);
    return capitalAndForecast;
  } else if (clientRequest.requestedAction == "capitalAndSports") {
    const capitalAndSports = CapitalAndSports(clientRequest);
    return capitalAndSports;
  } else {
    const response = JSON.stringify(ResponseStatus.BAD_REQUEST);

    return response;
  }
}
