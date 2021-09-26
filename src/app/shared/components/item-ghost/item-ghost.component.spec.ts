import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemGhostComponent } from './item-ghost.component';

describe('ItemGhostComponent', () => {
  let component: ItemGhostComponent;
  let fixture: ComponentFixture<ItemGhostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemGhostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemGhostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
