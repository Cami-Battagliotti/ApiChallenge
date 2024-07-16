import { API_URL_COUNTRIES } from "../constants";

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
  const data = await response.json();

  return data;
}

//getSelectedData("all");
