
// test = WeatherApi().getCurrentWeather();
// console.log(test); // undefined

(() => {
  const app = {
    initialize() {
      this.cacheElements();
      this.loadServices();
      this.onClickEvents();
    },

    cacheElements() {
      this.$weatherContainer = document.querySelector('.weather-container');
      this.$covidContainer = document.querySelector('.covid-container');
      this.$githubContainer = document.querySelector('.github-container');
      this.$ghSearchResult = document.querySelector('.gh-search-result');
      this.$ghInput = document.querySelector('#gh-search');
      this.$ghSubmit = document.querySelector('#gh-submit');
    },

    async loadServices() {
      const weather = await WeatherApi('Ghent');
      this.updateWeather(weather);

      const covid = await CovidApi();
      this.updateGhentCovidPositiveCases(covid);

      const GH = await GHUsers();
      this.updateGHUsersList(GH);
    },

    updateWeather(weather) {
      this.$weatherContainer.innerHTML = `<h3>${weather.current.temp_c} °C</h3> <img src="${weather.current.condition.icon}" alt="">`;
    },

    updateGhentCovidPositiveCases(cases) {
      console.log(cases);
      this.$covidContainer.innerHTML = `<h3>${cases.records[0].fields.cases}</h3>`
    },

    updateGHUsersList(users) {
      let str = '';
      users.forEach(user => {
        str += `<div class="json-user-container">
        <p>${user.portfolio.githubUsername}</p>
        <p>${user.name} ${user.familyName}</p>
        </div>`;
      });
      this.$githubContainer.innerHTML = str;
    },

    async onClickEvents() {
      this.$ghSubmit.addEventListener("click", async () => {
        this.ghSearchFromServices(await GithubApi(await this.$ghInput.value))
      });
    },

    ghSearchFromServices(github) {
      let str = "";
      for (let i = 0; i < 10; i++) {
        const element = github.items[i];

        str += `<div class="gh-users-container">
        <img src="${element.avatar_url}" alt="" class="gh-user--img">
        <p>${element.login}</p>
        </div>`;
      }

      this.$ghSearchResult.innerHTML = str;

      this.onClickGhDetail();
    },

    onClickGhDetail() {
      this.$ghUsersContainer = document.querySelectorAll('.gh-users-container');

      console.log('onClickGhDetail is on!');
      console.log(this.$ghUsersContainer);
    }

  }
  app.initialize();
})()