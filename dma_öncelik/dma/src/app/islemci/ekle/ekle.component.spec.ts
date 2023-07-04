import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EkleComponent } from './ekle.component';

describe('EkleComponent', () => {
  let component: EkleComponent;
  let fixture: ComponentFixture<EkleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EkleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EkleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
