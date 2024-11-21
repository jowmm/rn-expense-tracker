import { StyleSheet } from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { useSelector } from 'react-redux';

const AllExpenses = () => {
  const expensesList = useSelector((state) => state.expenses.list);

  return <ExpensesOutput expenses={expensesList} expensesPeriod='Total' fallback={'No registered expenses found!'} />;
};

export default AllExpenses;

const styles = StyleSheet.create({});
