import { getWeatherData } from "../DB";
import { ResponseStatus } from "../utils/responseMsg";

class WeatherModels {
  // getCurrentWeather() => Solicita a la base de datos el clima actual de la ciudad indicada por parametro y devuleve solo la informacion relevante.
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

  // getWeatherForecast() => Solicita a la base de datos el pronostico del clima de la ciudad indicada por parametro y devuelve solo los datos relevantes.
  async getWeatherForecast(city: string, days: number) {
    const forecastData = await getWeatherData("forecast", city, days);
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

    let relevantForecastData = {};
    // Itero cada objeto que contiene la informacion del pronostico de cada dia solicitado para filtrarla.
    for (let day of forecastData.forecast.forecastday) {
      // Desestructuro el/los objetos contenidos dentro del array de forecastday para acceder solo a la informacion que necesito:
      const {
        date,
        day: { maxtemp_c, mintemp_c, totalprecip_mm },
      } = day;

      // Creo un nuevo objeto con la informacion contenida en las variables obtenidas de la desestructuracion, y lo agrego al nuevo array que contendra la informacion del pronostico (forecast) simplificada.
      const forecastData = {
        //date,
        maxtemp_c,
        mintemp_c,
        totalprecip_mm,
      };
      relevantForecastData[`Day ${date}`] = forecastData;
      //relevantForecastData.push(forecastData);
    }

    // const forecastFiltered = {};
    // let counter = 0
    // relevantForecastData.forEach((elem) => (forecastFiltered[counter] = elem));

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
      forecastday: relevantForecastData,
    };

    //console.log(relevantForecastData);
    return relevantData;
  }

  // getSportsEvents() => Solicita a la base de datos los proximos eventos deportivos de la ciudad indicada por parametro.
  async getSportsEvents(city: string) {
    const sportsEvents = await getWeatherData("sports", city);
    return sportsEvents;
  }
}

// Instancio el objeto para acceder a sus metodos y exportarlos.
const weatherData = new WeatherModels();

//weatherData.getWeatherForecast("london", 3);

const { getCurrentWeather, getWeatherForecast, getSportsEvents } = weatherData;

export { getCurrentWeather, getWeatherForecast, getSportsEvents };
