import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeGroupsListComponent } from './time-groups-list.component';

describe('TimeGroupsListComponent', () => {
  let component: TimeGroupsListComponent;
  let fixture: ComponentFixture<TimeGroupsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeGroupsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeGroupsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
