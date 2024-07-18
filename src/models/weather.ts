import { getWeatherData } from "../DB";
import { ResponseStatus } from "../utils/responseMsg";

class WeatherModels {
  async getCurrentWeather(city: string) {
    const currentWeather = await getWeatherData("current", city);
    if (!currentWeather) {
      return ResponseStatus.NOT_FOUND;
    }

    // Desestructuro los objetos que trae la funcion weatherData para obtener solo la informacion que necesito y asigno esos valores a nuevas variables.
    const {
      location: { name, country, localtime },
      current: {
        last_updated,
        temp_c,
        condition,
        wind_kph,
        wind_dir,
        precip_mm,
        humidity,
        uv,
      },
    } = currentWeather;

    // Creo un nuevo objeto que contiene la informacion relevante dentro de las nuevas variables.
    const relevantData = {
      location: { name, country, localtime },
      current: {
        last_updated,
        temp_c,
        condition,
        wind_kph,
        wind_dir,
        precip_mm,
        humidity,
        uv,
      },
    };

    return relevantData;
  }

  async getWeatherForecast(city: string, startDate: string) {
    const forecastData = await getWeatherData("forecast", city, startDate);
    if (!forecastData) {
      return ResponseStatus.NOT_FOUND;
    }
    // Filtro la informacion obtenida:
    // Desestructuro los objetos de forecastData para acceder solo a los valores relevantes asignandolos a nuevas variables.
    const {
      location: { name, country, localtime },
      current: {
        last_updated,
        temp_c,
        condition,
        wind_kph,
        precip_mm,
        humidity,
        uv,
      },
      forecast: { forecastday },
    } = forecastData;

    // Desestructuro el/los objetos contenidos dentro del array de forecastday para acceder solo a la informacion que necesito:
    // const {
    //   day: { date, maxtemp_c, mintemp_c, totalprecip_mm },
    // } = forecastday[0];

    // Creo un nuevo objeto con la informacion relevante contenida en las variables obtenidas de la desestructuracion.
    const relevantData = {
      location: { name, country, localtime },
      current: {
        last_updated,
        temp_c,
        condition,
        wind_kph,
        precip_mm,
        humidity,
        uv,
      },
      forecast: { forecastday },
      //forecastday: { maxtemp_c, mintemp_c, totalprecip_mm },
    };
    return relevantData;
  }

  async getSportsEvents(city: string) {
    const sportsEvents = await getWeatherData("sports", city);
    return sportsEvents;
  }
}

const weatherData = new WeatherModels();

const { getCurrentWeather, getWeatherForecast, getSportsEvents } = weatherData;

export { getCurrentWeather, getWeatherForecast, getSportsEvents };
