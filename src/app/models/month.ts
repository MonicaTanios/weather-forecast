export class Month {
  Name: string;
  AverageDailyRainFall: number;
  AverageMinimumTemperature: number;
  AbsoluteMaximumTemperature: number;

  constructor(
    Name: string,
    AbsoluteMaximumTemperature: number,
    AverageDailyRainFall: number,
    AverageMinimumTemperature: number
  ) {
    this.Name = Name;
    this.AverageDailyRainFall = AverageDailyRainFall;
    this.AverageMinimumTemperature = AverageMinimumTemperature;
    this.AbsoluteMaximumTemperature = AbsoluteMaximumTemperature;
  }
}
