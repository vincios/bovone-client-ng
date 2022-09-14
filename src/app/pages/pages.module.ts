import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../material/material.module';
import {SharedModule} from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import {PagesRoutingModule} from './pages-routing.module';
import {GridsterModule} from 'angular-gridster2';
import {ChartsModule} from '../statistics/charts/charts.module';
import {DragAndDropModule} from 'angular-draggable-droppable';
import {NumbersModule} from '../statistics/numbers/numbers.module';
import {STATISTICS_DATA_PRODUCER_TOKEN} from "../statistics/shared/statistics-data-producer";
import {DataService} from "../core/services/data/data.service";

@NgModule({
  declarations: [
    DashboardComponent
  ],
    imports: [
        CommonModule,
        MaterialModule,
        SharedModule,
        PagesRoutingModule,
        GridsterModule,
        ChartsModule,
        DragAndDropModule,
        NumbersModule,
    ], providers: [
    {provide: STATISTICS_DATA_PRODUCER_TOKEN, useExisting: DataService}
  ]
})
export class PagesModule { }
