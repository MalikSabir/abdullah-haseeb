import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProductsComponent } from './service-products.component';

describe('ServiceProductsComponent', () => {
  let component: ServiceProductsComponent;
  let fixture: ComponentFixture<ServiceProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
