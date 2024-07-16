import { getAllData, getSelectedData } from "../DB";
import { ResponseStatus } from "../utils/messages";

class CountriesModels {
  async getAllCountries() {
    return await getAllData();
  }

  async getByCountryCommonName(countryName: string) {
    const allCountries = await this.getAllCountries();
    const filteredCountries = allCountries.filter((el) =>
      el.name.common.toLowerCase().includes(countryName.toLowerCase())
    );
    if (!filteredCountries.length) {
      return ResponseStatus.NOT_FOUND;
    }
    return filteredCountries;
  }

  async getByCurrency(currencyName: string) {
    const countryCurrencies = await getSelectedData("currency", currencyName);
    if (!countryCurrencies.length) {
      return ResponseStatus.NOT_FOUND;
    }
    return countryCurrencies;
  }

  async getByLanguage(language: string) {
    const languageCountries = await getSelectedData("lang", language);
    if (!languageCountries.length) {
      return ResponseStatus.NOT_FOUND;
    }
    return languageCountries;
  }

  async getByCapital(capitalCity: string) {
    const countryCapital = await getSelectedData("capital", capitalCity);
    if (!countryCapital.length) {
      return ResponseStatus.NOT_FOUND;
    }
    return countryCapital;
  }

  // async getByRegion(region: string) {
  //   const regionCountries = await getSelectedData("region", region);
  //   if (!regionCountries.length) {
  //     return ResponseStatus.NOT_FOUND;
  //   }
  //   return regionCountries;
  // }
}

const countries = new CountriesModels();
const {
  getAllCountries,
  getByCountryCommonName,
  getByCurrency,
  getByLanguage,
  getByCapital,
} = countries;

//countries.getByRegion("sarasa");

export {
  getAllCountries,
  getByCountryCommonName,
  getByCurrency,
  getByLanguage,
  getByCapital,
};
