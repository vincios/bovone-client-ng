import {AfterViewInit, Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {SimpleNumberComponent} from "../simple-number/simple-number.component";
import {STATISTICS_DATA_PRODUCER_TOKEN, StatisticsDataProducer} from "../../shared/statistics-data-producer";
import {Subscription} from "rxjs";
import isObjectLike from "lodash-es/isObjectLike";
import keys from "lodash-es/keys";
import isArray from 'lodash-es/isArray';

@Component({
  selector: 'app-auto-update-number',
  templateUrl: './auto-update-number.component.html',
  styleUrls: ['./auto-update-number.component.scss']
})
export class AutoUpdateNumberComponent<T> extends SimpleNumberComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() dataKey;

  private dataProducerSubscription: Subscription;

  constructor(@Inject(STATISTICS_DATA_PRODUCER_TOKEN) private dataProducer: StatisticsDataProducer<T>) {
    super();
  }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.dataProducerSubscription = this.dataProducer.subscribe().subscribe((data) => this.onNewData(data));
  }

  ngOnDestroy(): void {
    if (this.dataProducerSubscription) {
      this.dataProducerSubscription.unsubscribe();
    }
  }

  onNewData(data: T) {
    console.log("onNewData: ", data);
    let value;
    if (isObjectLike(data)) { // data is an object with multiple fields, we need a key given by the user
      if (!this.dataKey && keys(data).length !== 1) {
        throw new Error('Cannot choose a value from a multi properties object. Maybe you forgot to define the dataKey parameter?');
      } else if (!this.dataKey && keys(data).length === 1) {
        value = data[keys(data)[0]];
      } else {
        value = data[this.dataKey];
      }
    } else if (isArray(data)) { // data is an array
      throw new Error('Cannot choose a value from an array');
    } else { // data is a literal
      value = data;
    }

    if (typeof data === 'number') {
      this.value = value;
    } else {
      this.displayValue = value;
    }
  }
}
