import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersDateComponent } from './orders-date.component';

describe('OrdersDateComponent', () => {
  let component: OrdersDateComponent;
  let fixture: ComponentFixture<OrdersDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersDateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrdersDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
