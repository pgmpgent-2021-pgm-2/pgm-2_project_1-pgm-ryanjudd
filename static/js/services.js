async function WeatherApi(city) {
  // this.getCurrentWeather = async () => {
    
    const WEATHER_API = `https://api.weatherapi.com/v1/current.json?key=4f49bbe7048d41d7b12142024202112&q=${city}`;
    try {
      const response = await fetch(WEATHER_API);
      json = await response.json();
      return json;
    } catch (error) {
      console.error(error);
    }

};

async function GHUsers() {
  const GHU = './static/data/pgm.json';

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

async function GithubRepositoryApi(name) {
  const REPOSITORY_API = `https://api.github.com/users/${name}/repos?page=1&per_page=30`;

  try {
    const response = await fetch(REPOSITORY_API);
    json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

async function GithubFollowersApi(name) {
  const FOLLOWERS_API = `https://api.github.com/users/${name}/followers?page=1&per_page=30`;

  try {
    const response = await fetch(FOLLOWERS_API);
    json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

async function YoutubeApi(search) {
  const key1 = 'AIzaSyAsN26PtACDKVFOQy1flJnfNEx-g6Q6xZ8';
  const YOUTUBE_API = `https://www.googleapis.com/youtube/v3/search?key=${key1}&part=snippet&maxResults=20&q=${search}`;

  try {
    const response = await fetch(YOUTUBE_API);
    json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};