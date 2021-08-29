import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkoleraMultiCheckboxComponent } from './skolera-multi-checkbox.component';

describe('SkoleraMultiCheckboxComponent', () => {
  let component: SkoleraMultiCheckboxComponent;
  let fixture: ComponentFixture<SkoleraMultiCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkoleraMultiCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkoleraMultiCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
