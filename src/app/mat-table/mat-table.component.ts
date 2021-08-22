import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { Month } from '../models/month';

@Component({
  selector: 'app-mat-table',
  templateUrl: './mat-table.component.html',
  styleUrls: ['./mat-table.component.css'],
})
export class MatTableComponent implements OnInit {
  @Input() data: Month[] = [];
  tableDataSrc = new MatTableDataSource<Month>([]);
  tableCols: string[] = [
    'Name',
    'AverageDailyRainFall',
    'AverageMinimumTemperature',
    'AbsoluteMaximumTemperature',
  ];

  constructor() {}

  ngOnInit(): void {
    this.tableDataSrc.data = this.data;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.tableDataSrc.data = changes.data.currentValue;
  }
}
