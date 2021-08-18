import { Component, OnInit } from '@angular/core';
import { WeatherApiService } from '../weather-api.service';

@Component({
  selector: 'app-local-weather',
  templateUrl: './local-weather.component.html',
  styleUrls: ['./local-weather.component.css']
})
export class LocalWeatherComponent implements OnInit {
  longitude: any;
  latitude: any;
  constructor(private weatherApi: WeatherApiService) {
   }

  ngOnInit(): void {
    this.sendToAPI();
  }

  sendToAPI() {
    // Get user current location & Get Weather
    var location = this.getPosition();
    location.then((res) => {
      this.weatherApi.getWeather(res.lng, res.lat)
    })
  }

  getPosition(): Promise<any>
  {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
          resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
        },
        err => {
          reject(err);
        });
    });

  }

}
