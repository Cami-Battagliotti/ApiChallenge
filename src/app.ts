import {
  countriesByCommonName,
  countriesByCapital,
  countriesByCurrency,
  countriesByLanguage,
  allCountries,
} from "./controllers/countries";
import { ResponseStatus } from "./utils/messages";

export async function endpointsOptions(clientMessage) {
  const message = clientMessage.toString();
  const clientRequest = JSON.parse(message);

  if (clientRequest.requestedAction == "all") {
    const collectedData = await allCountries();
    const clientFeedback = JSON.stringify(collectedData);
    return clientFeedback;
  } else if (clientRequest.requestedAction == "language") {
    const collectedData = await countriesByLanguage(
      clientRequest.parameterName
    );
    const clientFeedback = JSON.stringify(collectedData);
    return clientFeedback;
  } else if (clientRequest.requestedAction == "name") {
    const collectedData = await countriesByCommonName(
      clientRequest.parameterName
    );
    const clientFeedback = JSON.stringify(collectedData);
    return clientFeedback;
  } else if (clientRequest.requestedAction == "capital") {
    const collectedData = await countriesByCapital(clientRequest.parameterName);
    const clientFeedback = JSON.stringify(collectedData);
    return clientFeedback;
  } else if (clientRequest.requestedAction == "currency") {
    const collectedData = await countriesByCurrency(
      clientRequest.parameterName
    );
    const clientFeedback = JSON.stringify(collectedData);
    return clientFeedback;
  } else {
    return ResponseStatus.BAD_REQUEST;
  }
}
