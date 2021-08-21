import {
  Component,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef,
  ViewRef,
} from '@angular/core';
import * as d3 from 'd3';
import * as d3Axis from 'd3';
import * as d3Scale from 'd3';
import * as d3Shape from 'd3';

import { Month } from '../models/month';
import { WeatherApiService } from '../weather-api.service';

@Component({
  selector: 'app-scatter-plot',
  templateUrl: './scatter-plot.component.html',
  styleUrls: ['./scatter-plot.component.css'],
})
export class ScatterPlotComponent implements OnInit {
  @Input() country: string = '';
  @ViewChild('vc', { read: ViewContainerRef }) vc!: ViewContainerRef;
  @Output() data: Month[] = [];
  private svg: any;
  private margin = 50;
  private width = 750 - this.margin * 2;
  private height = 400 - this.margin * 2;
  public selectedCity: string = '';
  public cities: string[] = [];
  private x: any;
  private y: any;
  private line!: d3Shape.Line<[number, number]>;
  childViewRef!: ViewRef;

  constructor(private weatherApi: WeatherApiService) {}

  ngOnInit(): void {
    this.getCitiesByCountry();
  }

  // Get Cities based on current country
  getCitiesByCountry = async () => {
    const response = await fetch(
      'https://countriesnow.space/api/v0.1/countries'
    ).then((response) => response.json());
    const { data } = response;
    data.forEach((country: any) => {
      if (country.country == this.country) {
        this.cities = country.cities;
      }
    });
  };

  onChange(newValue: any) {
    this.selectedCity = newValue;
    this.weatherApi.getWeatherByCity(newValue).subscribe((res: any) => {
      // Loop over climate history by months
      // & Fill months data in "data" variable
      res.data.ClimateAverages[0].month.forEach((month: any) => {
        this.data.push(
          new Month(
            month.name,
            month.absMaxTemp,
            month.avgDailyRainfall,
            month.avgMinTemp
          )
        );
      });
    });
    // Keep only new data (Last 12 items)
    this.data.splice(0, this.data.length - 12);
    // Clear The Chart & Rebuild it
    d3.selectAll('svg > *').remove();
    this.addXandYAxis();
    this.drawLines();
  }

  addXandYAxis() {
    // Build SVG
    this.svg = d3
      .select('svg')
      .append('g')
      .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');

    // Range of data configuration
    this.x = d3Scale
      .scaleBand()
      .domain(this.data.map((month) => month.Name))
      .range([0, this.width]);
    this.y = d3Scale
      .scaleLinear()
      .domain([
        0,
        Math.max.apply(
          Math,
          this.data.map(function (o) {
            return Number(o.AbsoluteMaximumTemperature);
          })
        ),
      ])
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

  drawBars() {
    this.svg
      .selectAll('bars')
      .data(this.data)
      .enter()
      .append('rect')
      .attr('x', (d: Month) => this.x(d.Name))
      .attr('y', (d: Month) => this.y(d.AbsoluteMaximumTemperature))
      .attr('width', this.x.bandwidth())
      .attr(
        'height',
        (d: Month) => this.height - this.y(d.AbsoluteMaximumTemperature)
      )
      .attr('fill', '#1a9bd9');
  }

  drawLines() {
    this.svg
      .append('g')
      .attr('fill', 'white')
      .attr('stroke', 'black')
      .attr('stroke-width', 2)
      .selectAll('circle')
      .data(this.data)
      .join('circle')
      .attr('cx', (d: { Name: any }) => this.x(d.Name))
      .attr('cy', (d: { AbsoluteMaximumTemperature: any }) =>
        this.y(d.AbsoluteMaximumTemperature)
      )
      .attr('r', 3);
  }
}
