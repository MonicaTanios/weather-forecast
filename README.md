<h1 align="center">Weather Forecast 🌤</h1>

---
A creative single page application for weather forecast with the following specifications:

The application consists of 2 displays

1. Landing display
   * Showing a summary of the current weather for the user’s country (automatically detected)
   * Provides the most important information that a general user may need to know the weather of this country now.
   * Provides access to the  different cities of the country, so the user can access display (2)
2. City weather dashboard
   * Shows a summary of the current weather for the selected city in (1)
   * Shows weather statistics and historical weather information for this city using different data visualizations

## Before running the code

### It is required to create accounts on

1. [World Weather Online][1] API
2. [LocationIQ API][2] API

Then create `environment.ts` file in `src/environments` directory with the same format mentioned in `src/environments/environment.example.ts` file & add the API keys there.

``` ts
export const environment = {
  production: false,
  weatherApiKey: "Your API Key Here",
  locationIqApiKey: "Your API Key Here"
};

```

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Cypress](https://www.cypress.io/). To use this command, you need to first add cypress.

``` bash
ng add @cypress/schematic
```
---

## Made with :heart: by

[![Contributors][contributors-img]][contributors]

[contributors]: https://github.com/MonicaTanios/weather-forecast/graphs/contributors
[contributors-img]: https://contributors-img.firebaseapp.com/image?repo=monicatanios/weather-forecast

<!-- Some Links -->
[1]: https://developer.worldweatheronline.com/
[2]: https://locationiq.com/
