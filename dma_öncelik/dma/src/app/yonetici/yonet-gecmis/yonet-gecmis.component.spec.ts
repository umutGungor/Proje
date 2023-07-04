import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YonetGecmisComponent } from './yonet-gecmis.component';

describe('YonetGecmisComponent', () => {
  let component: YonetGecmisComponent;
  let fixture: ComponentFixture<YonetGecmisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YonetGecmisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YonetGecmisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
