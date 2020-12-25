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

};

async function GHUsers() {
  const GHU = 'static/data/pgm.json';

  try {
    const response = await fetch(GHU);
    json = await response.json();;
    return json;
  } catch (error) {
    console.error(error);
  }
};

async function CovidApi() {
  const COVID_API = 'https://data.stad.gent/api/records/1.0/search/?dataset=dataset-of-cumulative-number-of-confirmed-cases-by-municipality&q=';
  
  try {
    const response = await fetch(COVID_API);
    json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

async function GithubApi(name) {
  const GITHUB_API = `https://api.github.com/search/users?sort=desc&page=1&per_page=100&q=${name}`;

  try {
    const response = await fetch(GITHUB_API);
    json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

async function GithubRepositoryApi() {
  const REPOSITORY_API = `https://api.github.com/users/%24%7Busername%7D/repos?page=1&per_page=50`;

  try {
    const response = await fetch(REPOSITORY_API);
    json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.error(error);
  }
};

async function GithubFollowersApi() {
  const FOLLOWERS_API = `https://api.github.com/users/%24%7Busername%7D/repos?page=1&per_page=50`;

  try {
    const response = await fetch(FOLLOWERS_API);
    json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};