import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HazirlananComponent } from './hazirlanan.component';

describe('HazirlananComponent', () => {
  let component: HazirlananComponent;
  let fixture: ComponentFixture<HazirlananComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HazirlananComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HazirlananComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
