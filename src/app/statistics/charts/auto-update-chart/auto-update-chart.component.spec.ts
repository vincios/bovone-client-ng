import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoUpdateChartComponent } from './auto-update-chart.component';

describe('AutoUpdateChartComponent', () => {
  let component: AutoUpdateChartComponent;
  let fixture: ComponentFixture<AutoUpdateChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoUpdateChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoUpdateChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
