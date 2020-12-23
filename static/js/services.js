async function WeatherApi(city) {
  // this.getCurrentWeather = async () => {
    
    const WEATHER_API = `http://api.weatherapi.com/v1/current.json?key=4f49bbe7048d41d7b12142024202112&q=${city}`;
    try {
      const response = await fetch(WEATHER_API);
      json = await response.json();
      return json;
    } catch (error) {
      console.error(error);
    }

}

async function CovidApi() {
  const COVID_API = 'https://data.stad.gent/api/records/1.0/search/?dataset=dataset-of-cumulative-number-of-confirmed-cases-by-municipality&q=';
  
  try {
    const response = await fetch(COVID_API);
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