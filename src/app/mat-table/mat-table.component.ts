import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatTableComponent implements OnChanges {
  @Input() data: Month[] = [];
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  tableDataSrc: any;
  tableCols: string[] = [
    'Name',
    'AverageDailyRainFall',
    'AverageMinimumTemperature',
    'AbsoluteMaximumTemperature',
  ];
  tableData: Month[] = [];

  constructor() {}

  ngOnInit(): void {
    this.tableDataSrc = new MatTableDataSource(this.tableData);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.tableData = changes.data.currentValue;
    this.ngOnInit();
  }

  ngAfterViewInit() {
    this.tableDataSrc.paginator = this.paginator;
  }
}
