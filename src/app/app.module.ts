import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LocalWeatherComponent } from './local-weather/local-weather.component';
import { MatTableComponent } from './mat-table/mat-table.component';
import { ScatterPlotComponent } from './scatter-plot/scatter-plot.component';
import { WeatherApiService } from './weather-api.service';
import { allAppRoutes } from './routes';

@NgModule({
  declarations: [
    AppComponent,
    LocalWeatherComponent,
    MatTableComponent,
    ScatterPlotComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    ReactiveFormsModule,
    RouterModule.forRoot(allAppRoutes),
  ],
  providers: [WeatherApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
