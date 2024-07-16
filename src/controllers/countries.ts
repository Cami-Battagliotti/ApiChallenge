import {
  getAllCountries,
  getByCapital,
  getByCountryCommonName,
  getByCurrency,
  getByLanguage,
} from "../models/countries";
import { ResponseStatus } from "../utils/messages";

class CountriesControllers {
  async getAllCountries() {
    return await getAllCountries();
  }
  async getByCapital(capitalCity: string) {
    if (!capitalCity) {
      return ResponseStatus.MISSING_DATA;
    } else if (typeof capitalCity != "string") {
      return ResponseStatus.BAD_REQUEST;
    }
    return await getByCapital(capitalCity);
  }
  async getByCountryCommonName(countryName: string) {
    if (!countryName) {
      return ResponseStatus.MISSING_DATA;
    } else if (typeof countryName != "string") {
      return ResponseStatus.BAD_REQUEST;
    }
    return await getByCountryCommonName(countryName);
  }
  async getByCurrency(currencyName: string) {
    if (!currencyName) {
      console.log(ResponseStatus.MISSING_DATA);

      return ResponseStatus.MISSING_DATA;
    } else if (typeof currencyName != "string") {
      console.log(ResponseStatus.BAD_REQUEST);

      return ResponseStatus.BAD_REQUEST;
    }
    return await getByCurrency(currencyName);
  }
  async getByLanguage(language: string) {
    if (!language) {
      return ResponseStatus.MISSING_DATA;
    } else if (typeof language != "string") {
      return ResponseStatus.BAD_REQUEST;
    }
    return await getByLanguage(language);
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
