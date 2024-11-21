import { createSlice } from '@reduxjs/toolkit';

const expensesSlice = createSlice({
  name: 'expenses',
  initialState: {
    list: [],
  },
  reducers: {
    addExpense: ({ list }, { payload: { expense } }) => {
      list.push({ id: list.length + 1, ...expense });
    },
    removeExpense: ({ list }, { payload: { expenseId } }) => {
      const deletedExpenseIndex = list.findIndex(({ id }) => id === expenseId);
      list.splice(deletedExpenseIndex, 1);
    },
    updateExpense: (
      { list },
      {
        payload: {
          expense: { id, description, amount, date },
        },
      }
    ) => {
      const updatedExpense = list.map((exp) => {
        if (exp.id === id) {
          exp.description = description;
          exp.amount = amount;
          exp.date = date;
        }

        return exp;
      });
      list = updatedExpense;
    },
    setExpenses: ({ list }, { payload: { expenses } }) => {
      list = expenses;
    },
  },
});

export const { addExpense, removeExpense, updateExpense, setExpenses } =
  expensesSlice.actions;
export default expensesSlice.reducer;
