import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkoleraEditComponent } from './skolera-edit.component';

describe('SkoleraEditComponent', () => {
  let component: SkoleraEditComponent;
  let fixture: ComponentFixture<SkoleraEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkoleraEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkoleraEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
