import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartCardComponent } from './chart-card/chart-card.component';
import {StatisticsModule} from '../statistics.module';
import { SimpleChartComponent } from './simple-chart/simple-chart.component';
import { AutoUpdateChartComponent } from './auto-update-chart/auto-update-chart.component';
import {NgChartsModule} from 'ng2-charts';
import {SharedModule} from "../../shared/shared.module";



@NgModule({
  declarations: [
    ChartCardComponent,
    SimpleChartComponent,
    AutoUpdateChartComponent
  ],
  exports: [
    ChartCardComponent,
    SimpleChartComponent,
    AutoUpdateChartComponent
  ],
    imports: [
        CommonModule,
        StatisticsModule,
        NgChartsModule,
        SharedModule
    ]
})
export class ChartsModule { }
