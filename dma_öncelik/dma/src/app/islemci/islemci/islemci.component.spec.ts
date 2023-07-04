import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IslemciComponent } from './islemci.component';

describe('IslemciComponent', () => {
  let component: IslemciComponent;
  let fixture: ComponentFixture<IslemciComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IslemciComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IslemciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
