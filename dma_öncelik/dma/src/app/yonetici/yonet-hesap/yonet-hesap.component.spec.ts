import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YonetHesapComponent } from './yonet-hesap.component';

describe('YonetHesapComponent', () => {
  let component: YonetHesapComponent;
  let fixture: ComponentFixture<YonetHesapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YonetHesapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YonetHesapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
