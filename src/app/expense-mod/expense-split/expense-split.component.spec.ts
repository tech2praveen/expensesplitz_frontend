import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseSplitComponent } from './expense-split.component';

describe('ExpenseSplitComponent', () => {
  let component: ExpenseSplitComponent;
  let fixture: ComponentFixture<ExpenseSplitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseSplitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseSplitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
