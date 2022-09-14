import {AfterViewInit, Component, OnInit} from '@angular/core';

import {
  CompactType,
  DisplayGrid,
  Draggable,
  GridsterConfig,
  GridsterItem,
  GridType,
  PushDirections,
  Resizable
} from 'angular-gridster2';
import {ChartConfiguration} from 'chart.js';
import {DropEvent} from 'angular-draggable-droppable';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {BovoneWidgetDefinition, NumberConversionModel} from '../../commons/model';
import {translateIfNecessary} from "../../commons/utils";
import {TranslateService} from "@ngx-translate/core";
import {from, map, mergeMap, Observable, of, toArray} from "rxjs";

interface Safe extends GridsterConfig {
  draggable: Draggable;
  resizable: Resizable;
  pushDirections: PushDirections;
}

interface BovoneDashboardItem extends GridsterItem, BovoneWidgetDefinition {
  // pass: doesn't add anything other than the extended interfaces
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({'flex-grow': '0.001'}),
        animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)', style({'flex-grow': '1'})),
      ]),
      transition(':leave', [
        style({'flex-grow': '*'}),
        animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)', style({'flex-grow': '0', width: '0'})),
      ]),
    ]),
    trigger('openCloseButton', [
      state('open', style({
        transform: 'rotate(0)'
      })),
      state('close', style({
        transform: 'rotate(45deg)'
      })),
      transition('open => close',[
        animate('250ms ease')
      ]),
      transition('close => open', [
        animate('250ms ease')
      ])
    ])
  ]
})
export class DashboardComponent implements OnInit, AfterViewInit {
  options: Safe;
  dashboard: Array<BovoneDashboardItem>;


  public canvas: any;
  public ctx;
  public chartColor;
  public chartEmail;
  public chartHours;

  isDrawerOpened = false;

  conversionModels: NumberConversionModel[] = [{
    from: 0,
    displayedValue: 'test',
  },
    {
      from: 3,
      displayedValue: 'test'
    }];

  chatHoursData: ChartConfiguration['data'] = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    datasets: [
      {
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
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        position: 'bottom'
      },
      tooltip: {
        bodySpacing: 4,
        mode:'nearest',
        intersect: true,
        position:'nearest',
        padding: 10,
        caretPadding:10
      },
    },
    responsive: true,
    layout: {
      padding: {left:0, right:0, top:15, bottom:15}
    }
  };
  chatHoursType: ChartConfiguration['type'] = 'line';


  showDndOverlay = false;


  constructor(private translateService: TranslateService) { }

  ngOnInit(): void {
    this.options = {
      gridType: GridType.ScrollVertical,
      compactType: CompactType.CompactUp,
      margin: 10,
      outerMargin: true,
      outerMarginTop: null,
      outerMarginRight: null,
      outerMarginBottom: null,
      outerMarginLeft: null,
      useTransformPositioning: true,
      mobileBreakpoint: 720,
      useBodyForBreakpoint: true,
      minCols: 6,
      maxCols: 6,
      minRows: 1,
      maxRows: 100,
      maxItemCols: 100,
      minItemCols: 1,
      maxItemRows: 100,
      minItemRows: 1,
      maxItemArea: 2500,
      minItemArea: 1,
      defaultItemCols: 1,
      defaultItemRows: 1,
      fixedColWidth: 105,
      fixedRowHeight: 105,
      keepFixedHeightInMobile: false,
      keepFixedWidthInMobile: false,
      scrollSensitivity: 10,
      scrollSpeed: 20,
      enableEmptyCellClick: false,
      enableEmptyCellContextMenu: false,
      enableEmptyCellDrag: false,
      enableOccupiedCellDrop: false,
      emptyCellDragMaxCols: 50,
      emptyCellDragMaxRows: 50,
      ignoreMarginInRow: false,
      draggable: {
        enabled: true,
        ignoreContent: true,
        dragHandleClass: 'drag-handle',
      },
      resizable: {
        enabled: true
      },
      swap: true,
      pushItems: true,
      disablePushOnDrag: false,
      disablePushOnResize: false,
      pushDirections: { north: true, east: true, south: true, west: false },
      pushResizeItems: false,
      displayGrid: DisplayGrid.Always,
      disableWindowResize: false,
      disableWarnings: false,
      scrollToNewItems: false,
      // emptyCellDropCallback: this.emptyCellClick.bind(this),
      enableEmptyCellDrop: false,
    };

    this.dashboard = [
      // { cols: 2, rows: 1, y: 0, x: 0 },
      { cols: 3, rows: 2, y: 3, x: 2, widgetType: 'chart', minItemCols: 3, minItemRows: 2, id: 'test', keys: ['test'], auto: true},
      { cols: 1, rows: 1, y: 0, x: 4, widgetType: 'number', id: 'test', keys: ['test'] },
      { cols: 1, rows: 1, y: 2, x: 5, widgetType: 'number', id: 'test', keys: ['test'] },
      { cols: 1, rows: 1, y: 1, x: 0, widgetType: 'number', id: 'test', keys: ['test'] },
      { cols: 1, rows: 1, y: 1, x: 0, widgetType: 'number', id: 'test', keys: ['test'] },
      // { cols: 3, rows: 2, y: 0, x: 2, widgetType: 'chart', minItemCols: 3, minItemRows: 2, id: 'test', keys: ['test'] },
      // {
      //   cols: 2,
      //   rows: 2,
      //   y: 3,
      //   x: 5,
      //   minItemRows: 2,
      //   minItemCols: 2,
      //   label: 'Min rows & cols = 2'
      // },
      // {
      //   cols: 2,
      //   rows: 2,
      //   y: 2,
      //   x: 0,
      //   maxItemRows: 2,
      //   maxItemCols: 2,
      //   label: 'Max rows & cols = 2'
      // },
      // {
      //   cols: 2,
      //   rows: 1,
      //   y: 2,
      //   x: 2,
      //   dragEnabled: true,
      //   resizeEnabled: true,
      //   label: 'Drag&Resize Enabled'
      // },
      // {
      //   cols: 1,
      //   rows: 1,
      //   y: 2,
      //   x: 4,
      //   dragEnabled: false,
      //   resizeEnabled: false,
      //   label: 'Drag&Resize Disabled'
      // },
      // { cols: 1, rows: 1, y: 2, x: 6 }
    ];
  }


  ngAfterViewInit(): void {
    // this.translateService.get("TITLE").subscribe((res)=>{
    //   this.conversionModels = this.parseConversionModels(this.conversionModels);
    // });
    this.parseConversionModels(this.conversionModels);
  }

  changedOptions(): void {
    if (this.options.api && this.options.api.optionsChanged) {
      this.options.api.optionsChanged();
    }
  }

  removeItem($event: MouseEvent | TouchEvent, item): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }
  addItem(item?: BovoneDashboardItem): void {
    if (!item) {
      this.dashboard.push({x: 0, y: 0, cols: 1, rows: 1, widgetType: 'number', id: 'test', keys: ['test'] });
    } else {
      this.dashboard.push(item);
    }
  }
  emptyCellClick(event: DragEvent, item: BovoneDashboardItem): void {
    item.cols = 3;
    item.widgetType = 'chart';
    this.dashboard.push(item);
  }
  //
  // drop($event: any) {
  //   console.log($event);

  // }

  showOverlay(show: boolean) {
    this.showDndOverlay = show;
  }

  onDropData($event: DropEvent<any>) {
    this.addItem({x: 0, y: 0, rows: 2, cols: 3, widgetType: 'chart', id: 'test', keys: ['test'] , auto: true});
  }

  onDrawerChange(opened: boolean) {
    console.log('onDrawerChange');
    this.isDrawerOpened = opened;
    this.options.api.resize();
  }
  /**
   * Translate conversion models values if necessary
   *
   * @param conversionModels
   */
  parseConversionModels(conversionModels: NumberConversionModel[]): Observable<NumberConversionModel[]> {
    return from(conversionModels).pipe(
      mergeMap((model) =>
        this.translateService.get(model.displayedValue.toUpperCase()).pipe(
          map(translation => {
            model.displayedValue = translation;
            return model;
          })
        )),
      toArray(),
    );
  }
}
