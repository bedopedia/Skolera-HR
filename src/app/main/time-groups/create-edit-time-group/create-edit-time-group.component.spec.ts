import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditTimeGroupComponent } from './create-edit-time-group.component';

describe('CreateEditTimeGroupComponent', () => {
  let component: CreateEditTimeGroupComponent;
  let fixture: ComponentFixture<CreateEditTimeGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditTimeGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditTimeGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
