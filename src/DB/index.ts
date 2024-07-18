import { API_URL_COUNTRIES } from "../constants";
import { API_URL_WEATHER } from "../constants";

export async function getAllData() {
  const response = await fetch(
    `${API_URL_COUNTRIES}all/?fields=name,capital,region,continents,currencies,languages`
  );
  const data = await response.json();
  return data;
}

export async function getSelectedData(
  requestedService: string,
  parameterName: string
) {
  const API_URL_TOTAL = `${API_URL_COUNTRIES}${requestedService}/${parameterName}/?fields=name,capital,region,continents,currencies,languages`;
  const response = await fetch(API_URL_TOTAL);
  const inputData = await response.json();

  return inputData;
}

// current, forecast, sports.
export async function getWeatherData(
  requestedService: string,
  parameterName: string,
  date?: string
) {
  const API_URL_TOTAL = `${API_URL_WEATHER}${requestedService}.json?key=4ec1c0a249cf487cb71103019241607&q=${parameterName}&dt=${date}`;
  const response = await fetch(API_URL_TOTAL);
  const inputData = await response.json();

  return inputData;
}

//getWeatherData("forecast", "rome", "2024-07-13", 3);
