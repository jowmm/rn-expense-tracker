import axios from 'axios';

const firebaseUrl =
  'https://rn-expense-tracker-e79f0-default-rtdb.asia-southeast1.firebasedatabase.app';

export const storeExpense = (data) => {
  axios.post(`${firebaseUrl}/expenses.json`, data);
};

export const fetchExpenses = async () => {
  const response = await axios.get(`${firebaseUrl}/expenses.json`);

  const expenses = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }

  return expenses;
};
