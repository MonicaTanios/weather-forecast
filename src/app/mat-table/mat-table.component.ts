import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Month } from '../models/month';

@Component({
  selector: 'app-mat-table',
  templateUrl: './mat-table.component.html',
  styleUrls: ['./mat-table.component.css'],
})
export class MatTableComponent implements OnInit {
  @Input() data: Month[] = [];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
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
    this.tableDataSrc.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.tableDataSrc.data = changes.data.currentValue;
    this.tableDataSrc.paginator = this.paginator;
  }
}
