import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellCalendarComponent } from './sell-calendar.component';

describe('SellCalendarComponent', () => {
  let component: SellCalendarComponent;
  let fixture: ComponentFixture<SellCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellCalendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
