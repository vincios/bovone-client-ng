import {AfterContentChecked, Component, Input, OnInit} from '@angular/core';
import {ResizedEvent} from '../../../shared/directives/resized/resized.event';
import {NumberConversionModel} from '../../../commons/model';
import has from 'lodash-es/has';

@Component({
  selector: 'app-simple-number',
  templateUrl: './simple-number.component.html',
  styleUrls: ['./simple-number.component.scss']
})
export class SimpleNumberComponent implements OnInit, AfterContentChecked {
  @Input() conversionModels: NumberConversionModel[];
  @Input() value = 0;

  // containerRect: DOMRectReadOnly;
  preferredFontSize = 1; // rem
  displayValue;

  constructor() { }

  ngOnInit(): void { }

  ngAfterContentChecked(): void {
    if (!this.displayValue && this.conversionModels) {
      this.displayValue = this.parseNumber(this.value);
    }
  }

  onResize($event: ResizedEvent) {
    // this.containerRect = $event.newRect;
    console.log($event);
    this.preferredFontSize = this.calcFontSize($event.newRect);
    console.log(this.preferredFontSize);
  }

  parseNumber(value): string {
    value = Number.parseInt(value, 10);
    let convertedString;
    if (this.conversionModels && this.conversionModels.length > 0) {
      for(const model of this.conversionModels) {
        if (has(model, 'exact') && value === model.exact) {
          convertedString = model.displayedValue;
          break;
        } else if (has(model, 'from') || has(model, 'to')) {
          const fromPassed = !has(model, 'from') || value >= model.from;
          const toPassed = !has(model, 'to') || value <= model.to;

          if (fromPassed && toPassed) {
            convertedString = model.displayedValue;
            break;
          }
        }
      }
    }

    return convertedString ? convertedString : `${value}`;
  }

  /**
   * Calculate a preferred size for the font.
   */
  calcFontSize(containerRect: DOMRectReadOnly): number {
    if (!containerRect) {
      return 0;
    }

    const width = containerRect.width;
    const height = containerRect.height;

    // We take account for the value to display: if it is a string (i.e. this.displayValue),
    // we take also account for the length of the string.
    // 6 and 22 are two magic numbers used as scale factors for, respectively, a string value and a number value.
    return this.displayValue ?  height/(6*this.displayValue?.length) : height/22;
  }
}
