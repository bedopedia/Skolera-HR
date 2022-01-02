import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTimeGroupComponent } from './edit-time-group.component';

describe('EditTimeGroupComponent', () => {
  let component: EditTimeGroupComponent;
  let fixture: ComponentFixture<EditTimeGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTimeGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTimeGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
