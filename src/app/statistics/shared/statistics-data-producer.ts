import {Subject} from 'rxjs';
import {InjectionToken} from '@angular/core';

export const STATISTICS_DATA_PRODUCER_TOKEN = new InjectionToken( 'Token to inject A StatisticsDataProducer Service');

export interface StatisticsDataProducer<T> {
  // TODO: add a filtering parameter?
  subscribe(consumerId?: any): Subject<T>;
}
