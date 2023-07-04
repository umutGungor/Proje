import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HazirSiparislerComponent } from './hazir-siparisler.component';

describe('HazirSiparislerComponent', () => {
  let component: HazirSiparislerComponent;
  let fixture: ComponentFixture<HazirSiparislerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HazirSiparislerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HazirSiparislerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
