
// test = WeatherApi().getCurrentWeather();
// console.log(test); // undefined

(() => {
  const app = {
    initialize() {
      this.cacheElements();
      this.fetchGHUsers();
      this.WeatherFromServices();
      this.CovidFromServices();
    },

    cacheElements() {
      this.$weatherContainer = document.querySelector('.weather-container');
      this.$covidContainer = document.querySelector('.covid-container');
      this.$githubContainer = document.querySelector('.github-container');
    },

    async WeatherFromServices() {
      const ei = await WeatherApi('Ghent');

      this.updateWeather(ei)

      let b = 5;
      let c = simpleMath()+b;
      console.log(c);
    },

    updateWeather(weather) {
      console.log(weather);
      this.$weatherContainer.innerHTML = `<h3>${weather.current.temp_c} °C</h3> <img src="${weather.current.condition.icon}" alt="">`;
    },

    async CovidFromServices() {
      const covid = await CovidApi();

      this.updateGhentCovidPositiveCases(covid);
    },

    updateGhentCovidPositiveCases(cases) {
      console.log(cases);
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