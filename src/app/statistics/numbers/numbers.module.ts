import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleNumberComponent } from './simple-number/simple-number.component';
import {StatisticsModule} from '../statistics.module';
import {SharedModule} from '../../shared/shared.module';
import { AutoUpdateNumberComponent } from './auto-update-number/auto-update-number.component';



@NgModule({
  declarations: [
    SimpleNumberComponent,
    AutoUpdateNumberComponent
  ],
    exports: [
        SimpleNumberComponent,
        AutoUpdateNumberComponent
    ],
  imports: [
    CommonModule,
    StatisticsModule,
    SharedModule
  ]
})
export class NumbersModule { }
