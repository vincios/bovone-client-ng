import { Directive, ElementRef, EventEmitter, NgZone, OnDestroy, OnInit, Output } from '@angular/core';
import { ResizedEvent } from './resized.event';

/**************************************************
 * https://github.com/vdolek/angular-resize-event *
 **************************************************/
@Directive({
  selector: '[resized]'
})
export class ResizedDirective implements OnInit, OnDestroy {
  @Output() public readonly resized;

  private observer: ResizeObserver;
  private oldRect?: DOMRectReadOnly;

  public constructor(
    private readonly element: ElementRef,
    private readonly zone: NgZone
  ) {
    this.resized = new EventEmitter<ResizedEvent>();
    this.observer = new ResizeObserver(entries => this.zone.run(() => this.observe(entries)));
  }

  public ngOnInit(): void {
    this.observer.observe(this.element.nativeElement);
  }

  public ngOnDestroy(): void {
    this.observer.disconnect();
  }

  private observe(entries: ResizeObserverEntry[]): void {
    const domSize = entries[0];
    const resizedEvent = new ResizedEvent(domSize.contentRect, this.oldRect);
    this.oldRect = domSize.contentRect;
    this.resized.emit(resizedEvent);
  }
}
