import { API_URL_COUNTRIES } from "../constants";
import { API_URL_WEATHER } from "../constants";

//getAllData() => Trae toda la informacion de paises contenida en el body de la Api Rest Countries.
export async function getAllData() {
  const response = await fetch(
    `${API_URL_COUNTRIES}all/?fields=name,capital,region,continents,currencies,languages`
  );
  const data = await response.json();
  return data;
}

// getSelectedData() => Obtiene la informacion de paises filtrada segun el tipo de dato solicitado.
export async function getSelectedData(
  requestedService: string,
  parameterName: string
) {
  const API_URL_TOTAL = `${API_URL_COUNTRIES}${requestedService}/${parameterName}/?fields=name,capital,region,continents,currencies,languages`;
  const response = await fetch(API_URL_TOTAL);
  const inputData = await response.json();

  return inputData;
}

//getWeatherData => Obtiene la informacion del clima filtrada segun el tipo de dato solicitado.
export async function getWeatherData(
  requestedService: string,
  parameterName: string,
  days?: number
) {
  const API_URL_TOTAL = `${API_URL_WEATHER}${requestedService}.json?key=4ec1c0a249cf487cb71103019241607&q=${parameterName}&days=${days}`;
  const response = await fetch(API_URL_TOTAL);
  const inputData = await response.json();

  return inputData;
}

//getWeatherData("forecast", "rome", 3);
