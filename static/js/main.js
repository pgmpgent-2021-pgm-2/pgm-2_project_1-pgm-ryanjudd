const WEATHER_API = 'http://api.weatherapi.com/v1/current.json?key=4f49bbe7048d41d7b12142024202112&q=Ghent';
const COVID_API = 'https://data.stad.gent/api/records/1.0/search/?dataset=dataset-of-cumulative-number-of-confirmed-cases-by-municipality&q=';

// test = WeatherApi().getCurrentWeather();
// console.log(test); // undefined

(() => {
  const app = {
    initialize() {
      this.cacheElements();
      this.fetchGhentCovidPositiveCases();
      this.fetchGHUsers();
      this.WeatherFromServices();
    },

    cacheElements() {
      this.$weatherContainer = document.querySelector('.weather-container');
      this.$covidContainer = document.querySelector('.covid-container');
      this.$githubContainer = document.querySelector('.github-container');
    },

    async WeatherFromServices() {
      // console.log(hey);
      // console.log(test.current.temp_c);
      // console.log(test.getCurrentWeather());
      // fetch(WEATHER_API)
      //   .then(response => response.json())
      //   .then(data => this.updateWeather(data));

      const ei = await WeatherApi();

      this.updateWeather(ei)

      let b = 5;
      let c = simpleMath()+b;
      console.log(c);
    },

    updateWeather(weather) {
      console.log(weather);
      this.$weatherContainer.innerHTML = `<h3>${weather.current.temp_c} °C</h3> <img src="${weather.current.condition.icon}" alt="">`;
    },

    async fetchGhentCovidPositiveCases() {
      try {
        const response = await fetch(COVID_API);
        const json = await response.json();
        this.updateGhentCovidPositiveCases(json);
      } catch (error) {
        console.error(error);
      }
    },

    updateGhentCovidPositiveCases: function (cases) {
      this.$covidContainer.innerHTML = `<h3>${cases.records[0].fields.cases}</h3>`
    },

    async fetchGHUsers() {
      try {
        const response = await fetch('./static/data/pgm.json');
        const json = await response.json();
        this.updateGHUsersList(json);
      } catch (error) {
        console.error(error);
      }
    },

    updateGHUsersList(users) {
      let str = '';
      users.forEach(user => {
        str += `
        <p>${user.portfolio.githubUsername}</p>
        <p>${user.name} ${user.familyName}</p>
        `;
      });
      this.$githubContainer.innerHTML = str;
    }
  }
  app.initialize();
})()