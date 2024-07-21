import {
  getAllCountries,
  getByCapital,
  getByCountryCommonName,
  getByCurrency,
  getByLanguage,
} from "../models/countries";
import { validateParameter } from "../utils/aux_functions";

class CountriesControllers {
  // getAllCountries() => Solicita la informacion de todos los paises contenida en la api consultada.
  async getAllCountries() {
    return await getAllCountries();
  }
  // getByCapital() =>  Solicita la informacion de paises filtrando por Capitales del mundo.
  async getByCapital(city: string) {
    return await getByCapital(city);
  }
  // getByCountryCommonName() =>  Solicita la informacion de paises filtrando por el nombre No oficial.
  async getByCountryCommonName(clientRequest) {
    // Verifica los parametros ingresados por el cliente y devuelve un mensage si el parametro no es correcto.
    const validParameter = validateParameter(clientRequest);
    if (typeof validParameter == "string") {
      return validParameter;
    }
    return await getByCountryCommonName(clientRequest.parameterName);
  }
  // getByCurrency() =>  Solicita y devuelve la informacion de paises que utilizan la moneda indicada.
  async getByCurrency(clientRequest) {
    const validParameter = validateParameter(clientRequest);
    if (typeof validParameter == "string") {
      return validParameter;
    }
    return await getByCurrency(clientRequest.parameterName);
  }
  // getByLanguage() =>  Solicita y retorna la informacion de paises en los que se habla el idioma indicado.
  async getByLanguage(clientRequest) {
    const validParameter = validateParameter(clientRequest);
    if (typeof validParameter == "string") {
      return validParameter;
    }
    return await getByLanguage(clientRequest.parameterName);
  }
  // async getByRegion(region: string) {
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
