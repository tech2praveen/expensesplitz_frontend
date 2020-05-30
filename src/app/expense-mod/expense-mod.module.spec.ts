import { ExpenseModModule } from './expense-mod.module';

describe('ExpenseModModule', () => {
  let expenseModModule: ExpenseModModule;

  beforeEach(() => {
    expenseModModule = new ExpenseModModule();
  });

  it('should create an instance', () => {
    expect(expenseModModule).toBeTruthy();
  });
});
