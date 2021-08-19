import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { WeatherApiService } from '../weather-api.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  private data = [
    {"Framework": "Vue", "Stars": "166443", "Released": "2014"},
    {"Framework": "React", "Stars": "150793", "Released": "2013"},
    {"Framework": "Angular", "Stars": "62342", "Released": "2016"},
    {"Framework": "Backbone", "Stars": "27647", "Released": "2010"},
    {"Framework": "Ember", "Stars": "21471", "Released": "2011"},
  ];
  private svg : any;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);
  public selectedCity: any;
  public cities: string[] = [];

  constructor(private weatherApi: WeatherApiService) { }

  ngOnInit(): void {
    // Get Cities based on current country
    const BASE_URL = 'https://countriesnow.space/api/v0.1/countries'

    let getCountries = async () => {
    const response = await fetch(`${BASE_URL}`).then(response => response.json())
    const { data } = response
    data.forEach((country: any) => {
      if (country.country == "Egypt") {
      // if (country.country == this.country) {
        this.cities = country.cities;
        console.log(country.cities);
      }
    });
    }

    getCountries();
    
    this.createSvg();
    this.drawBars(this.data);
  }

  onChange(newValue: any) {
    console.log(newValue);
    this.selectedCity = newValue;
    this.weatherApi.getWeatherByCity(newValue).subscribe((res) => console.log(res));
}

  private createSvg(): void {
    this.svg = d3.select("figure#bar")
    .append("svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.height + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }

  private drawBars(data: any[]): void {
    // Create the X-axis band scale
    const x = d3.scaleBand()
    .range([0, this.width])
    .domain(data.map(d => d.Framework))
    .padding(0.2);

    // Draw the X-axis on the DOM
    this.svg.append("g")
    .attr("transform", "translate(0," + this.height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
    .domain([0, 200000])
    .range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append("g")
    .call(d3.axisLeft(y));

    // Create and fill the bars
    this.svg.selectAll("bars")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d: { Framework: string; }) => x(d.Framework))
    .attr("y", (d: { Stars: d3.NumberValue; }) => y(d.Stars))
    .attr("width", x.bandwidth())
    .attr("height", (d: { Stars: d3.NumberValue; }) => this.height - y(d.Stars))
    .attr("fill", "#d04a35");
  }

}
