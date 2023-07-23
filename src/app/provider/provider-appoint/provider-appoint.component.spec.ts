import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderAppointComponent } from './provider-appoint.component';

describe('ProviderAppointComponent', () => {
  let component: ProviderAppointComponent;
  let fixture: ComponentFixture<ProviderAppointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderAppointComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProviderAppointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
