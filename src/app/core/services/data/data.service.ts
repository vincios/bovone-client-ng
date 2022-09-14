import { Injectable } from '@angular/core';
import {last, map, Observable, Subject} from 'rxjs';
import {webSocket} from 'rxjs/webSocket';
import {BovoneDataObject, ExtendedBovoneDataObject} from '../../../commons/model';
import {StatisticsDataProducer} from '../../../statistics/shared/statistics-data-producer';

@Injectable({
  providedIn: 'root'
})
export class DataService implements StatisticsDataProducer<BovoneDataObject> {

  bovoneSubject: Subject<ExtendedBovoneDataObject> = new Subject();

  bovoneServerSocket: Observable<ExtendedBovoneDataObject> = webSocket<BovoneDataObject>('ws://localhost:8000/ws')
    .pipe(map((data) => {
      const extendedData: ExtendedBovoneDataObject = {...data, ...{label: this.createLabel(data)}};
      return extendedData;
    }));

  constructor() {
    this.bovoneServerSocket.subscribe(this.bovoneSubject);
  }

  subscribe(consumerId: any): Subject<ExtendedBovoneDataObject> {
    return this.bovoneSubject;
  }

  publish(value: ExtendedBovoneDataObject) {
    this.bovoneSubject.next(value);
  }

  private createLabel(data: BovoneDataObject): string {
    const date = new Date(data.time);
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }
}
