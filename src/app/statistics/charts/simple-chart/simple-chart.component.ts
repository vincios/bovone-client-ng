import {Component, HostBinding, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Required} from '../../../shared/decorators/required.decorator';
import {ChartConfiguration, ChartType} from 'chart.js';

@Component({
  selector: 'app-simple-chart',
  templateUrl: './simple-chart.component.html',
  styleUrls: ['./simple-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SimpleChartComponent implements OnInit {
  @Input() @Required type: ChartType;
  @Input() data: ChartConfiguration['data'];
  @Input() options: ChartConfiguration['options'];

  // https://stackoverflow.com/a/57736019
  @HostBinding('class.chartComponentClass') chartComponentClass = true;


  constructor() {
  }

  ngOnInit(): void { }

}
