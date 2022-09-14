# Statistics Module
This module offers some components to show statistics data, like charts and numbers.

## ChartCard
ChartCard Component is a card that displays a chart.

You have to specify as ChartCard's child a Chart Component that will be displayed into the card.
Different 

```html
    <app-chart-card title="Card Title" subtitle="Card Subtilte" [footer]="{iconClass: 'fa fa-history', text: 'Footer Text'}">
      <!-- Put here the chart component you prefer -->
    </app-chart-card>
```

Different `Chart` components could use a different behavior to load the chart (like use a different chart library or a different behavior to load/update the data).

### SimpleChart
SimpleChart Component simply create a chart.js chart with the data you pass as `data` property. The chart must also have a `type` property (like 'line', 'pie' or any other chart.js chart type)
and a `options` property that contains the chart.js render options. See [ng2-charts](https://valor-software.com/ng2-charts/) and [chart.js](https://www.chartjs.org/docs/latest/configuration/) documentation for more informations about these properties.

Properties needed by this component can be quickly generated from your data using the `ChartUtils` helper functions.
#### Example
**Without helper function**
```ts
// TS file
chatHoursData: ChartConfiguration['data'] = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    datasets: [{
      borderColor: '#6bd098',
      backgroundColor: '#6bd098',
      pointRadius: 0,
      pointHoverRadius: 0,
      borderWidth: 3,
      data: [300, 310, 316, 322, 330, 326, 333, 345, 338, 354]
    },
      {
        borderColor: '#f17e5d',
        backgroundColor: '#f17e5d',
        pointRadius: 0,
        pointHoverRadius: 0,
        borderWidth: 3,
        data: [320, 340, 365, 360, 370, 385, 390, 384, 408, 420]
      },
      {
        borderColor: '#fcc468',
        backgroundColor: '#fcc468',
        pointRadius: 0,
        pointHoverRadius: 0,
        borderWidth: 3,
        data: [370, 394, 415, 409, 425, 445, 460, 450, 478, 484]
      }
    ]
  };

  chatHoursOptions: ChartConfiguration['options'] = {
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false
      },
    },
    scales: {
      yAxes: {
        beginAtZero: false,
        ticks: {
          color: '#9f9f9f',
          maxTicksLimit: 5,
          //padding: 20
        },
        grid: {
          drawBorder: false,
          color: (ctx) => (ctx.index === 0 ? '#ccc' : 'rgba(255,255,255,0.05)')
        }
      },
      xAxes: {
        grid: {
          drawBorder: false,
          color: (ctx) => (ctx.index === 0 ? 'transparent' : 'rgba(255,255,255,0.05)'),
          display: false,
        },
        ticks: {
          padding: 20,
          color: '#9f9f9f'
        }
      }
    },
  };

  chatHoursType: ChartConfiguration['type'] = 'line';
```
```html
<!--HTML Template-->
<app-chart-card title="Chat Behavior" subtitle="24 Hours performance"
  [footer]="{iconClass: 'fa fa-history', text: 'Updated 3 minutes ago'}">
    <app-simple-chart [type]="chatHoursType" [data]="chatHoursData" [options]="chatHoursOptions"></app-simple-chart>
</app-chart-card>
```

### AutoUpdateChart
An `AutoUpdateChart` can update the chart each time a Service emits a new value.

You have to create a Service that publishes new data on a `Subject` and that implements the `ChartUpdater` interface.

```ts
export interface StatisticsDataProducer<T> {
  subscribe(consumerId?: any): Subject<T>;
}
```

That is, the service must implement a `subscribe` functions that returns the Subject, so the `AutoUpdataChart` component can subscribe to it.
For now do not mind the parameter `consumerId`, it can be used to distinguish the charts that subscribe to the subject. More information will be introduced in the example below.

> **NOTE**: When multiple `AutoUpdaterChart`s are defined, all of them will be notified by the service. It is up to you to define a strategy to differentiate the values for each charts.
For example, using the `consumerId` parameter of the StatisticsDataProducer interface to differentiate the subject each char will subscribe.


The values emitted by the service can be of any type, but if it is an object then you have to use the `dataKeys` property to list the keys path (dot separated) to the 
values to use.

Lastly, you have to tell to the `AutoUpdateChart` component to use that Service, using a Provider. See the example.

#### Example
We want to implement an `AutoUpdateChart` that update its chart each time a Service `DataService` emits a new value that is an object of temperatures, like this:

```json
{
  "overall": 24, 
  "rooms": {
    "kitchen": 26,
    "bedroom": 23.5,
    "livingroom": 24.8
  }
}
```

First, we create a Service that implements `ChartUpdater`, it can be a new service or an existing service that, among all, also implements the interface.

```ts
import {Injectable} from '@angular/core';
import {StatisticsDataProducer} from '../statistics/commons/Updater';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService implements StatisticsDataProducer<{overall: number; rooms: {[key: any]: number }}> {

  chartDataEmitter = new Subject<{overall: number; rooms: {[key: any]: number }}>();

  constructor() {
  }

  subscribe(consumerId?: any): Subject<{overall: number; rooms: {[key: any]: number }}> {
    return this.chartDataEmitter;
  }

  publish(value: {overall: number; rooms: {[key: any]: number }}) {
    this.chartDataEmitter.next(value);
  }
}
```
For this example, the Service has also a `publish` method to permits to publish values for the charts. However, this function is not mandatory
and the Service can publish values in other ways (for example, data coming from an observable).

Then, we tell to the `AutoUpdateChart`s to use the `DataService` as provider to subscribe to the data events, using a Provider.
We add the provider into the `provide` section of the module/component where we want to use the `AutoUpdateChart`s.

```typescript
import {STATISTICS_DATA_PRODUCER_TOKEN} from '../../statistics/commons/Updater';
import {DataService} from '../../providers/data.service';

@NgModule({
  imports: [
    // ...
  ],
  declarations: [
      // ...
  ],
  providers: [
    {provide: STATISTICS_DATA_PRODUCER_TOKEN, useExisting: DataService}
  ]
})
```
We use `useExisting` so we are sure that exactly the same instance of `DataService` will be injected into every part of the app. We could also use the `useClass` property, 
but in this case we have to use the `STATISTICS_DATA_PRODUCER_TOKEN` injection token to be sure that will be injected the same `DataService` class that the `AutoUpdateChart`s instances are subscribed to.

```typescript
import {DataService} from '../../providers/data.service';
import {STATISTICS_DATA_PRODUCER_TOKEN} from '../../statistics/commons/Updater';

export class DashboardComponent implements OnInit {
    constructor(@Inject(STATISTICS_DATA_PRODUCER_TOKEN) private data: DataService) {}
}
```
Otherwise, a different instance of `DataService` (different from the one the charts are subscribed to) could be injected into the component, and the publishing won't work.

Lastly, we can add the `AutoUpdaterChart` to our template (e.g. in a `ChartCard`), specifying the keys we are interested to.

```html
<app-chart-card title="Room Temperatures" subtitle="24 Hours performance" [footer]="{iconClass: 'fa fa-history', text: 'Updated 3 minutes ago'}">
  <app-auto-update-chart type="line" [dataKeys]="['overall', 'rooms.kitchen']" [chartId]="'temperatures'" [labelForNewData]="getLabel"
                         maxValues="10"></app-auto-update-chart>
</app-chart-card>
```

Notes on allowed properties:

  - `type` property is always mandatory, so the component can render the right chart.
  - unlike `SimpleChart`, here `data` and `options` properties are not mandatory. If not provided, the chart will start as empty and rendered with default options derived from `ChartUtils` methods.
  - `dataKeys` is a list of keys (or path keys for nested objects) that will be extracted from the incoming value (if it is an object) and used as values for the chart's datasets.
  - `labelForNewData`: When a new data arrives, this has to be labeled to add a label on x axes. This function give to the  parent component to choose the possibility to define a labeling strategy.
     If not defined, the new values will have an empty label
  - `chartId`: can be any value. Il will be passed as parameter to the "subscribe" StatisticsDataProducer service function.
  - `maxValues`: when the number of values on the chart exceed this number, old values will be removed
