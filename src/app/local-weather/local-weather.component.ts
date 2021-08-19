import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { WeatherApiService } from '../weather-api.service';

@Component({
  selector: 'app-local-weather',
  templateUrl: './local-weather.component.html',
  styleUrls: ['./local-weather.component.css']
})
export class LocalWeatherComponent implements OnInit {
  public weatherData: any;
  public day: any;
  public country: any;
  public city: any;
  public neighbourhood: any;
  public display_name: any;

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
      this.weatherApi.getWeatherByLongLat(res.lng, res.lat).subscribe(data => {
        this.weatherData = data;
        console.log(this.weatherData);
      });
      this.getCityAndCountry(res.lng, res.lat);
    })
  }

  getPosition(): Promise<any>
  {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
        console.log(resp);
          resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
        },
        err => {
          reject(err);
        },);
    });

  }

  getCityAndCountry(longitude: any, latitude: any) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', "https://us1.locationiq.com/v1/reverse.php?key=" 
    + environment.locationIqApiKey + "&lat=" 
    + latitude + "&lon=" + longitude + "&format=json", true);
    xhr.send();
    const processRequest = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            console.log("response")
            console.log(response)
            this.city = response.address.city; 
            this.country = response.address.country;
            this.display_name = response.display_name;
            this.neighbourhood = response.address.neighbourhood;
            return;
        }
    }
    xhr.onreadystatechange = processRequest;
    xhr.addEventListener("readystatechange", processRequest, false);
  
}

}
