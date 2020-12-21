

function WeatherApi() {

  this.getCurrentWeather = async () => {
    const WEATHER_API = 'http://api.weatherapi.com/v1/current.json?key=4f49bbe7048d41d7b12142024202112&q=Ghent';

    const json = "";

    try {
      const response = await fetch(WEATHER_API);
      json = await response.json();
    } catch (error) {
      console.error(error);
    }

    return json;
  }
}