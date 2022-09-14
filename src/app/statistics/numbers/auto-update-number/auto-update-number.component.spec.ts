import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoUpdateNumberComponent } from './auto-update-number.component';

describe('AutoUpdateNumberComponent', () => {
  let component: AutoUpdateNumberComponent;
  let fixture: ComponentFixture<AutoUpdateNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoUpdateNumberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoUpdateNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
