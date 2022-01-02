import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTimeGroupComponent } from './create-time-group.component';

describe('CreateTimeGroupComponent', () => {
  let component: CreateTimeGroupComponent;
  let fixture: ComponentFixture<CreateTimeGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTimeGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTimeGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
