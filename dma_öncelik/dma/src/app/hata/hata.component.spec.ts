import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HataComponent } from './hata.component';

describe('HataComponent', () => {
  let component: HataComponent;
  let fixture: ComponentFixture<HataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
