import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkoleraConfirmationComponent } from './skolera-confirmation.component';

describe('SkoleraConfirmationComponent', () => {
  let component: SkoleraConfirmationComponent;
  let fixture: ComponentFixture<SkoleraConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkoleraConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkoleraConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
