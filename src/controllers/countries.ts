import {
  getAllCountries,
  getByCapital,
  getByCountryCommonName,
  getByCurrency,
  getByLanguage,
} from "../models/countries";
import { validateParameter } from "../utils/aux_functions";

class CountriesControllers {
  async getAllCountries() {
    return await getAllCountries();
  }
  async getByCapital(city: string) {
    return await getByCapital(city);
  }
  async getByCountryCommonName(clientRequest) {
    // if (!countryName) {
    //   return ResponseStatus.MISSING_DATA;
    // } else if (typeof countryName != "string") {
    //   return ResponseStatus.BAD_REQUEST;
    // }
    const validParameter = validateParameter(clientRequest);
    if (typeof validParameter == "string") {
      return validParameter;
    }
    return await getByCountryCommonName(clientRequest.parameterName);
  }
  async getByCurrency(clientRequest) {
    const validParameter = validateParameter(clientRequest);
    if (typeof validParameter == "string") {
      return validParameter;
    }
    return await getByCurrency(clientRequest.parameterName);
  }
  async getByLanguage(clientRequest) {
    const validParameter = validateParameter(clientRequest);
    if (typeof validParameter == "string") {
      return validParameter;
    }
    return await getByLanguage(clientRequest.parameterName);
  }
  // async getByRegion(region: string) {
  //   if (!region) {
  //     return ResponseStatus.MISSING_DATA;
  //   } else if (typeof region != "string") {
  //     return ResponseStatus.BAD_REQUEST;
  //   }
  //   return await getByRegion(region);
  // }
}

const countries = new CountriesControllers();

const {
  getAllCountries: allCountries,
  getByCapital: countriesByCapital,
  getByCountryCommonName: countriesByCommonName,
  getByCurrency: countriesByCurrency,
  getByLanguage: countriesByLanguage,
} = countries;

export {
  allCountries,
  countriesByCapital,
  countriesByCommonName,
  countriesByCurrency,
  countriesByLanguage,
};
