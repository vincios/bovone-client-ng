import {
  AfterViewInit,
  Component,
  Inject,
  Input, OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {SimpleChartComponent} from '../simple-chart/simple-chart.component';
import {BaseChartDirective} from 'ng2-charts';
import isObjectLike from 'lodash-es/isObjectLike.js';
import keys from 'lodash-es/keys';
import get from 'lodash-es/get';
import has from 'lodash-es/has'
import {STATISTICS_DATA_PRODUCER_TOKEN, StatisticsDataProducer} from '../../shared/statistics-data-producer';
import {getBarChart, getLineChart, getPieChart} from '../../shared/statistics-utils';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-auto-update-chart',
  templateUrl: './auto-update-chart.component.html',
  styleUrls: ['./auto-update-chart.component.scss']
})
export class AutoUpdateChartComponent<T> extends SimpleChartComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() dataKeys: string | string[];
  @Input() labelKey: string;
  /**
   * When a new data arrives, this has to be labeled to add a label on x axes. This function give to the
   * parent component to choose the possibility to define a labeling strategy.
   * If not defined, the new values will have an empty label
   */
  @Input() labelForNewData: (data: T) => string;

  /**
   * This value will be passed as parameter to the onNewData Service function.
   */
  @Input() chartId: any;

  /**
   * when the number of values on the chart exceed this number, old values will be removed
   */
  @Input() maxValues: number;

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  private dataProducerSubscription: Subscription;

  constructor(@Inject(STATISTICS_DATA_PRODUCER_TOKEN) private dataProducer: StatisticsDataProducer<T>) {
    super();
  }

  ngOnInit(): void {
    this.defaultChart();
  }

  ngAfterViewInit(): void {
    this.dataProducerSubscription = this.dataProducer.subscribe(this.chartId).subscribe((value) => {
      this.pushData(value);
    });
  }

  ngOnDestroy(): void {
    this.dataProducerSubscription.unsubscribe();
  }


  defaultChart(): void {
    const dataKeysArray = this.dataKeys ? [...this.dataKeys] : null;

    if (this.data && this.dataKeys && this.data.datasets.length !== dataKeysArray.length) {
      throw new Error(
        `Datasets number (${this.data.datasets.length}) must be equals to the data keys specified (${dataKeysArray.length})`
      );
    }

    if (!this.data || !this.options) {
      // if this.data or this.options aren't defined we have to use the ChartsUtils functions to generate the default ones.
      // To run these functions we need to generate parameters below...
      // TODO: adds the possibility to define colors and labels for empty charts
      let dataObject: {color?: string; values: any[]; label?: string}[];
      let labelsObject: unknown[];

      if (this.data) {
        // ... if this.data is defined we can extract from it the values for the parameters above
        labelsObject = this.data.labels;
        dataObject = this.data.datasets.map((dataset) => ({values: dataset.data}));
      } else if (!this.data && this.dataKeys) {
        // ... if this.data is not defined, we can create an empty graph that will have an empty list of labels and
        // one empty values list for each keys in this.dataKeys
        labelsObject = []; // chart will be empty
        dataObject = dataKeysArray.map((dataset) =>
          ({values: []}) // chart will be empty
        );
      } else {
        // ... if also this.dataKeys is empty we assume that the values that will receive will be single numbers,
        // so we create an empty graph with only one dataset
        labelsObject = [];
        dataObject = [{values: []}];
      }

      // we have to choose the right ChartsUtils function according to the chart type
      let helperFunction;

      switch (this.type) {
        case 'line':
          helperFunction = getLineChart;
          break;
        case 'bar':
          helperFunction = getBarChart;
          break;
        case 'pie':
          helperFunction = getPieChart;
          break;
        default:
          helperFunction = getLineChart;
          break; // other types of graph aren't yet implemented, we fall back to line chart
      }

      const {data, options} = helperFunction(labelsObject, dataObject);

      if (!this.data) {
        this.data = data;
      }
      if (!this.options) {
        this.options = options;
      }
    }
  }

  public pushData(data: T): void {
    const dataKeysList = this.dataKeys ? [...this.dataKeys] : null;
    // since this.data.datasets is always a list (with at least one dataset), we transform data to a list of values,
    // so we can then zip the data together with the dataset
    let dataList: any[];

    if (isObjectLike(data)) {
      if (!this.dataKeys && keys(data).length !== 1) {
        // if there are multiple properties on data object but a this.dataKeys object is not defined, we cannot
        // choose a value
        throw new Error('Cannot choose a value from a multi properties object. Maybe you forgot to define the dataKeys parameter?');
      }
      else if (!this.dataKeys && keys(data).length === 1) {
        // if this.dataKeys is not defined but the data object has only one property, we can use that as value
        const key = keys(data)[0];
        dataList = [data[key]];
      } else if (this.dataKeys) {
        dataList = dataKeysList.map((key) => get(data, key));
      }
    } else {
      // if is not an object we assume that data is a single value
      dataList = [data];
    }

    if (dataList.length !== this.data.datasets.length) {
      throw new Error(`The number of new values ${dataList.length} must be equals to the number of datasets ${this.data.datasets.length}`);
    }

    this.data.datasets.forEach((x, i) => {
      const num = dataList[i];

      if (this.maxValues && x.data.length > this.maxValues) {
        x.data.shift();
      }
      x.data.push(num);
    });

    if (this.maxValues && this.data?.labels?.length > this.maxValues) {
      this.data.labels.shift();
    }

    let label = '';

    if(this.labelKey && isObjectLike(data)) {
      if (!has(data, this.labelKey)) {
        console.warn('Key not found for label: ', this.labelKey);
      } else {
        label = data[this.labelKey];
      }
    } else if (this.labelForNewData) {
      label = this.labelForNewData(data);
    }
    this.data?.labels?.push(label);

    this.chart?.update();
  }

}
