import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisGraphicsComponent } from './analysis-graphics.component';

describe('AnalysisGraphicsComponent', () => {
  let component: AnalysisGraphicsComponent;
  let fixture: ComponentFixture<AnalysisGraphicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalysisGraphicsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalysisGraphicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
