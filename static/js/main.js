const WEATHER_API = 'http://api.weatherapi.com/v1/current.json?key=4f49bbe7048d41d7b12142024202112&q=Ghent';
const COVID_API = 'https://data.stad.gent/api/records/1.0/search/?dataset=dataset-of-cumulative-number-of-confirmed-cases-by-municipality&q=';

(() => {
    const app = {
        initialize() {
            this.cacheElements();
            this.fetchWeather();
            this.fetchGhentCovidPositiveCases();
            this.fetchGHUsers();
        },

        cacheElements() {
            this.$weatherContainer = document.querySelector('.weather-container');
            this.$covidContainer = document.querySelector('.covid-container');
            this.$githubContainer = document.querySelector('.github-container')
        },

        async fetchWeather() {
            try {
                const response = await fetch(WEATHER_API);
                const json = await response.json();
                this.updateWeather(json);
            } catch (error) {
                console.error(error);
            }
        },

        updateWeather(weather) {
            this.$weatherContainer.innerHTML = `<h3>${weather.current.temp_c} °C</h3>`;
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