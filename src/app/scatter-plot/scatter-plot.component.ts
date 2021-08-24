import { Component, Input, OnInit, Output } from '@angular/core';
import * as d3 from 'd3';
import * as d3Axis from 'd3';
import * as d3Scale from 'd3';

import { Month } from '../models/month';
import { WeatherApiService } from '../weather-api.service';

@Component({
  selector: 'app-scatter-plot',
  templateUrl: './scatter-plot.component.html',
  styleUrls: ['./scatter-plot.component.css'],
})
export class ScatterPlotComponent implements OnInit {
  @Input() country: string = '';
  @Output() data: Month[] = [];
  public selectedCity: string = '';
  public cities: string[] = [];
  // SVG Parameters
  private svg: any;
  private x: any;
  private y: any;
  private margin = 50;
  private width = 750 - this.margin * 2;
  private height = 400 - this.margin * 2;

  constructor(private weatherApi: WeatherApiService) {}

  ngOnInit(): void {
    this.getCitiesByCountry();
  }

  // Get Cities based on current country
  getCitiesByCountry = async () => {
    const response = await fetch(
      'https://countriesnow.space/api/v0.1/countries'
    );
    const { data } = await response.json();
    for (let i = 0; i < data.length; i++) {
      if (data[i].country === this.country) {
        this.cities = data[i].cities;
      }
    }
  };

  onClick(event: any) {
    // Clear The Chart & Rebuild it
    d3.selectAll('svg > *').remove();
    // Build SVG according to chosen filter
    const chosenParameter = Math.max.apply(
      Math,
      this.data.map(function (o) {
        if (event.currentTarget.id === 'AverageDailyRainFall')
          return Number(o.AverageDailyRainFall);
        else if (event.currentTarget.id === 'AverageMinimumTemperature')
          return Number(o.AverageMinimumTemperature);
        else {
          return Number(o.AbsoluteMaximumTemperature);
        }
      })
    );
    this.buildSvg();
    this.addXandYAxis(chosenParameter);
    this.drawLines(event.currentTarget.id);
  }

  async onChange(newValue: any) {
    // Clear SVG
    d3.selectAll('svg > *').remove();
    this.selectedCity = newValue;
    const response = await this.weatherApi.getWeatherByCity(newValue);
    const { data } = await response.json();
    this.data = [];
    for (let i = 0; i < data.ClimateAverages[0].month.length; i++) {
      this.data.push(
        new Month(
          data.ClimateAverages[0].month[i].name,
          data.ClimateAverages[0].month[i].absMaxTemp,
          data.ClimateAverages[0].month[i].avgDailyRainfall,
          data.ClimateAverages[0].month[i].avgMinTemp
        )
      );
    }
  }

  buildSvg() {
    // Build SVG
    this.svg = d3
      .select('svg')
      .append('g')
      .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');
  }

  addXandYAxis(parameter: number) {
    // Range of data configuration
    this.x = d3Scale
      .scaleBand()
      .domain(this.data.map((month) => month.Name))
      .range([0, this.width]);
    this.y = d3Scale
      .scaleLinear()
      .domain([0, parameter])
      .nice()
      .range([this.height, 0]);
    // Configure the X Axis
    this.svg
      .append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3Axis.axisBottom(this.x));
    // Configure the Y Axis
    this.svg
      .append('g')
      .attr('class', 'axis axis--y')
      .call(d3Axis.axisLeft(this.y));
  }

  drawLines(chosenParameter: string) {
    this.svg
      .append('g')
      .attr('fill', 'white')
      .attr('stroke', 'black')
      .attr('stroke-width', 2)
      .selectAll('circle')
      .data(this.data)
      .join('circle')
      .attr('cx', (d: { Name: any }) => this.x(d.Name))
      .attr(
        'cy',
        (d: {
          AbsoluteMaximumTemperature: number;
          AverageMinimumTemperature: number;
          AverageDailyRainFall: number;
        }) => {
          if (chosenParameter === 'AbsoluteMaximumTemperature') {
            return this.y(d.AbsoluteMaximumTemperature);
          } else if (chosenParameter === 'AverageMinimumTemperature') {
            return this.y(d.AverageMinimumTemperature);
          } else return this.y(d.AverageDailyRainFall);
        }
      )
      .attr('r', 3);
  }
}
