import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YonetRaporComponent } from './yonet-rapor.component';

describe('YonetRaporComponent', () => {
  let component: YonetRaporComponent;
  let fixture: ComponentFixture<YonetRaporComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YonetRaporComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YonetRaporComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
