import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElmaProductsComponent } from './elma-products.component';

describe('ElmaProductsComponent', () => {
  let component: ElmaProductsComponent;
  let fixture: ComponentFixture<ElmaProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElmaProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElmaProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
