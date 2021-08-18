import { Routes } from '@angular/router'
import { LocalWeatherComponent } from './local-weather/local-weather.component';

export const allAppRoutes: Routes = [
  { path: '', component: LocalWeatherComponent }
];