import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkoleraOrderByComponent } from './skolera-order-by.component';

describe('SkoleraOrderByComponent', () => {
  let component: SkoleraOrderByComponent;
  let fixture: ComponentFixture<SkoleraOrderByComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkoleraOrderByComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkoleraOrderByComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
