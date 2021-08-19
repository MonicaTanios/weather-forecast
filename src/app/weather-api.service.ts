import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {

  constructor(private http: HttpClient) { }

  getWeatherByLongLat(longitude: any, latitude: any){    
    return this.http.get(
      'http://api.worldweatheronline.com/premium/v1/weather.ashx?key='
      + environment.weatherApiKey +'&q=' + latitude + ',' + longitude 
      + '&num_of_days=2&tp=3&format=json',
    )
  }

  getWeatherByCity(city: any) {
    return this.http.get(
      'http://api.worldweatheronline.com/premium/v1/weather.ashx?key='
      + environment.weatherApiKey +'&q=' + city
      + '&fx=no&cc=no&mca=yes&format=json',
    )
  }
}
