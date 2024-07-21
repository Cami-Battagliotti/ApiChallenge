import { getAllData, getSelectedData } from "../DB";
import { ResponseStatus } from "../utils/responseMsg";

class CountriesModels {
  // getAllCountries() => Solicita toda la informacion de paises contenida en la api consultada.
  async getAllCountries() {
    return await getAllData();
  }

  // getByCountryCommonName() =>  Solicita la informacion de paises filtrando por el nombre No oficial.
  async getByCountryCommonName(countryName: string) {
    // No utilizo getSelectedData() porque incluye en la busqueda el nombre oficial.
    const allCountries = await getAllData();
    //const allCountries = await this.getAllCountries();
    const filteredCountries = allCountries.filter((el) =>
      el.name.common.toLowerCase().includes(countryName.toLowerCase())
    );
    if (!filteredCountries.length) {
      return ResponseStatus.NOT_FOUND;
    }
    return filteredCountries;
  }

  // getByCurrency() =>  Solicita la informacion de paises filtrando por la moneda indicada.
  async getByCurrency(currencyName: string) {
    const countryCurrencies = await getSelectedData("currency", currencyName);
    if (!countryCurrencies.length) {
      return ResponseStatus.NOT_FOUND;
    }
    return countryCurrencies;
  }

  // getByLanguage() =>  Solicita la informacion a DB de paises en los que se habla el idioma indicado.
  async getByLanguage(language: string) {
    const languageCountries = await getSelectedData("lang", language);
    if (!languageCountries.length) {
      return ResponseStatus.NOT_FOUND;
    }
    return languageCountries;
  }

  // getByCapital() =>  Solicita la informacion de paises filtrando por Capitales del mundo.
  async getByCapital(capitalCity: string) {
    const countryCapital = await getSelectedData("capital", capitalCity);
    if (!countryCapital.length) {
      return ResponseStatus.NOT_FOUND;
    }
    // Retorno el objeto contenido en el array countryCapital
    return countryCapital[0];
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
countries.getByCountryCommonName("italy");

const {
  getAllCountries,
  getByCountryCommonName,
  getByCurrency,
  getByLanguage,
  getByCapital,
} = countries;

export {
  getAllCountries,
  getByCountryCommonName,
  getByCurrency,
  getByLanguage,
  getByCapital,
};
