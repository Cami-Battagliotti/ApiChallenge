import {
  getCurrentWeather,
  getWeatherForecast,
  getSportsEvents,
} from "../models/weather";

class WeatherControllers {
  async getCurrentWeather(city: string) {
    // if (!city) {
    //   return ResponseStatus.MISSING_DATA;
    // } else if (typeof city != "string") {
    //   return ResponseStatus.BAD_REQUEST;
    // }

    return await getCurrentWeather(city);
  }
  async getWeatherForecast(city: string, startDate: string) {
    const forecastData = await getWeatherForecast(city, startDate);
    return forecastData;
  }

  async getSportsEvents(city: string) {
    return await getSportsEvents(city);
  }
}

const weatherData = new WeatherControllers();

//weatherData.getWeatherForecast("london", "2024-07-10");

const {
  getCurrentWeather: currentWeather,
  getWeatherForecast: weatherForecast,
  getSportsEvents: sportsEvents,
} = weatherData;

export { currentWeather, weatherForecast, sportsEvents };
