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
      this.$ghCenter = document.querySelector('.github-center');
      this.$timeWrapper = document.querySelector('.time-wrapper');
      this.$youtubeContainer = document.querySelector('.youtube-container');
      this.$citySearch = document.querySelector('#city-search');
      this.$citySend = document.querySelector('#city-send');
      this.$youtubeSearch = document.querySelector('#youtube-search');
      
    },

    async loadServices() {
      const weather = await WeatherApi('Ghent');
      this.updateWeather(weather);
      this.utcTimeFill(weather);

      const covid = await CovidApi();
      this.updateGhentCovidPositiveCases(covid);

      const GH = await GHUsers();
      this.updateGHUsersList(GH);
    },

    updateWeather(weather) {
      this.$weatherContainer.innerHTML = `<h3>${weather.current.temp_c} °C</h3> <img src="${weather.current.condition.icon}" alt="">`;
    },

    updateGhentCovidPositiveCases(cases) {
      this.$covidContainer.innerHTML = `<h3>${cases.records[0].fields.cases}</h3>`
    },

    updateGHUsersList(users) {
      let str = '';

      for (let i = 0; i < users.length; i++) {
        const element = users[i];
        str += `<div class="json-user-container" id="js_${i}">
        <p>${element.portfolio.githubUsername}</p>
        <p>${element.name} ${element.familyName}</p>
        </div>`;
      }
      // users.forEach(user => {      
      //   str += `<div class="json-user-container" id="js_">
      //   <p>${user.portfolio.githubUsername}</p>
      //   <p>${user.name} ${user.familyName}</p>
      //   </div>`;
      // });
      this.$githubContainer.innerHTML = str;

      this.$jsUsers = document.querySelectorAll('.json-user-container');

      this.onClickJsDetail(users);
    },

    onClickJsDetail(users) {
      this.$jsUsers.forEach(element => {
        element.addEventListener("click", async () => {
          user = users[element.id.slice(3)];

          const repo = await GithubRepositoryApi(user.portfolio.githubUsername);
          const follow =  await GithubFollowersApi(user.portfolio.githubUsername);

          let repositoryStr = "";
          repo.forEach(element => {
            repositoryStr += `<li><a href="${element.html_url}">${element.name}</a></li>`;
          });

          let followersStr = "";
          follow.forEach(element => {
            followersStr += `<li><a href="${element.html_url}">${element.login}</a></li>`;
          });


          this.$ghCenter.innerHTML = `
            <div class="gh-user-info">
              <h1>${user.name} ${user.familyName} </h1>
              <figure>
                <img src="${user.thumbnail}" alt="test">
                <figcaption>${user.motto}</figcaption>
              </figure>
            </div>
            <div class="gh-user-repos-follow">
              <div class="repos">
                <h2>Repositories</h2>
                <ul>${repositoryStr}</ul>
              </div>
              <div class="follows">
                <h2>Followers</h2>
                <ul>${followersStr}</ul>
              </div>
            </div>
          `;
        });
      });
    },

    onClickEvents() {
      this.$ghSubmit.addEventListener("click", async () => {
        this.ghSearchFromServices(await GithubApi(await this.$ghInput.value));
      });

      this.$ghInput.addEventListener("keyup", async (key) => {
        if (key.keyCode === 13) {
          this.ghSearchFromServices(await GithubApi(await this.$ghInput.value));
        };
      });

      this.$youtubeSearch.addEventListener("keyup", (key) => {
        if (key.keyCode === 13) {
          console.log('ITS WORKING');
        };
      });

      this.$citySearch.addEventListener("keyup", async (key) => {
        if (key.keyCode === 13) {
          this.updateUTCTime(await this.$citySearch.value);
        };
      });

      this.$citySend.addEventListener("click", async () => {
        this.updateUTCTime(await this.$citySearch.value);
      });


    },

    ghSearchFromServices(github) {
      let str = "";
      for (let i = 0; i < 10; i++) {
        const element = github.items[i];

        str += `<div class="gh-users-container" id="user_${i}">
        <img src="${element.avatar_url}" alt="" class="gh-user--img">
        <p>${element.login}</p>
        </div>`;
      }

      this.$ghSearchResult.innerHTML = str;
      
      this.onClickGhDetail(github);
    },

    onClickGhDetail(github) {
      this.$ghUsersContainer = document.querySelectorAll('.gh-users-container');

      console.log('onClickGhDetail is on!');

      this.$ghUsersContainer.forEach(element => {
        element.addEventListener("click", async () => {
          // indexOf for larger lists of users
          user = github.items[element.id.slice(5)];

          const repo = await GithubRepositoryApi(user.login);
          const follow =  await GithubFollowersApi(user.login);

          let repositoryStr = "";
          repo.forEach(element => {
            repositoryStr += `<li><a href="${element.html_url}">${element.name}</a></li>`;
          });

          let followersStr = "";
          follow.forEach(element => {
            followersStr += `<li><a href="${element.html_url}">${element.login}</a></li>`;
          });


          this.$ghCenter.innerHTML = `
          <div class="gh-user-info">
            <h1>${user.login}</h1>
            <img src="${user.avatar_url}" alt="test">
          </div>
          <div class="gh-user-repos-follow">
            <div class="repos">
              <h2>Repositories</h2>
              <ul>${repositoryStr}</ul>
            </div>
            <div class="follows">
              <h2>Followers</h2>
              <ul>${followersStr}</ul>
            </div>
          </div>
          `;
        });
      });
    },

    utcTimeFill(weather) {
      const time = new Date(weather.location.localtime_epoch * 1000);
      console.log(time.toUTCString());

      this.$timeWrapper.innerHTML = `<h3>${time.toUTCString()}</h3>`;
    },

    async updateUTCTime(city){
      const weather = await WeatherApi(city);
      const time = new Date(weather.location.localtime_epoch*1000);

      this.$timeWrapper.innerHTML = `<h3>${time.toUTCString()}</h3>`;
      
    },
  }
  app.initialize();
})()