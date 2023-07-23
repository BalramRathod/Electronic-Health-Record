import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderDashComponent } from './provider-dash.component';

describe('ProviderDashComponent', () => {
  let component: ProviderDashComponent;
  let fixture: ComponentFixture<ProviderDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProviderDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
