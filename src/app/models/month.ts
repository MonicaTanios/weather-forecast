export class Month {
    Name!: string;
    AverageDailyRainFall!: number;
    AverageMinimumTemperature!: number;
    AbsoluteMaximumTemperature!: number;

    constructor(Name: any, AbsoluteMaximumTemperature: any, AverageDailyRainFall: any, AverageMinimumTemperature: any){
        this.Name = Name;
        this.AverageDailyRainFall = AverageDailyRainFall;
        this.AverageMinimumTemperature = AverageMinimumTemperature;
        this.AbsoluteMaximumTemperature = AbsoluteMaximumTemperature;
    }
}