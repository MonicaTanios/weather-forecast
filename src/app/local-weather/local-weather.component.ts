import { Component, OnInit } from '@angular/core';
import { WeatherApiService } from '../weather-api.service';

@Component({
  selector: 'app-local-weather',
  templateUrl: './local-weather.component.html',
  styleUrls: ['./local-weather.component.css']
})
export class LocalWeatherComponent implements OnInit {
  public weatherData: any;
  public day: any;
  constructor(private weatherApi: WeatherApiService) {
    let now = new Date();
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
      
    this.day = days[now.getDay()];
  }

  ngOnInit(): void {
    this.sendToAPI();
  }

  sendToAPI() {
    // Get user current location & Get Weather
    var location = this.getPosition();
    location.then((res) => {
      this.weatherApi.getWeather(res.lng, res.lat).subscribe(data => {
        this.weatherData = data;
        console.log(this.weatherData);
        console.log(this.weatherData?.data.weather[0].date);
      });
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
