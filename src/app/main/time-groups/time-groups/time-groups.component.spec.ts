import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeGroupsComponent } from './time-groups.component';

describe('TimeGroupsComponent', () => {
  let component: TimeGroupsComponent;
  let fixture: ComponentFixture<TimeGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
