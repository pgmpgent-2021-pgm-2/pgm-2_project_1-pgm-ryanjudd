async function WeatherApi() {
  // this.getCurrentWeather = async () => {
    const WEATHER_API = 'http://api.weatherapi.com/v1/current.json?key=4f49bbe7048d41d7b12142024202112&q=Ghent';

    try {
      const response = await fetch(WEATHER_API);
      json = await response.json();
      return json;
    } catch (error) {
      console.error(error);
    }

}

function simpleMath() {

  let x = 5, y = 10, z = x+y;
  
  return z;
  
}