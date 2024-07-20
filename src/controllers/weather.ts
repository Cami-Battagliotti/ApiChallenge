import {
  getCurrentWeather,
  getWeatherForecast,
  getSportsEvents,
} from "../models/weather";

class WeatherControllers {
  // getCurrentWeather() => Solicita a models el clima actual de la ciudad indicada por parametro
  async getCurrentWeather(city: string) {
    return await getCurrentWeather(city);
  }

  // getWeatherForecast() => Solicita a models el pronostico del clima de la ciudad indicada por parametro.
  async getWeatherForecast(city: string, days: number) {
    const forecastData = await getWeatherForecast(city, days);
    return forecastData;
  }

  // getSportsEvents() => Solicita los proximos eventos deportivos de la ciudad indicada por parametro.
  async getSportsEvents(city: string) {
    return await getSportsEvents(city);
  }
}

const weatherData = new WeatherControllers();

const {
  getCurrentWeather: currentWeather,
  getWeatherForecast: weatherForecast,
  getSportsEvents: sportsEvents,
} = weatherData;

export { currentWeather, weatherForecast, sportsEvents };
