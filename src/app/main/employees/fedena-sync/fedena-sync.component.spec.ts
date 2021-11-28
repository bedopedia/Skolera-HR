import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FedenaSyncComponent } from './fedena-sync.component';

describe('FedenaSyncComponent', () => {
  let component: FedenaSyncComponent;
  let fixture: ComponentFixture<FedenaSyncComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FedenaSyncComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FedenaSyncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
