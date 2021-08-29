import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollFullTableComponent } from './scroll-full-table.component';

describe('ScrollFullTableComponent', () => {
  let component: ScrollFullTableComponent;
  let fixture: ComponentFixture<ScrollFullTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrollFullTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollFullTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
