import { StyleSheet } from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { getDateMinusDays } from '../util/date';
import { useEffect, useMemo } from 'react';
import { fetchExpenses } from '../util/http';
import { setExpenses } from '../store/expenses';
import { useDispatch, useSelector } from 'react-redux';

const RecentExpenses = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getExpenses = async () => {
      const expenses = await fetchExpenses();
      dispatch(setExpenses({ expenses }));
    };

    getExpenses();
  }, []);

  const recentExpenses = useSelector((state) =>
    state.expenses.list.filter(({ date }) => {
      const today = new Date();
      const date7daysAgo = getDateMinusDays(today, 7);

      return date > date7daysAgo && date <= today;
    })
  );

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod='Last 7 Days'
      fallback={'No expenses registered for the last 7 days.'}
    />
  );
};

export default RecentExpenses;

const styles = StyleSheet.create({});
