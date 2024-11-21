import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useLayoutEffect } from 'react';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import Button from '../components/UI/Button';
import { addExpense, removeExpense, updateExpense } from '../store/expenses';
import { useDispatch } from 'react-redux';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { storeExpense } from '../util/http';

const ManageExpense = ({ route, navigation }) => {
  const expense = route.params?.expense;
  const expenseId = expense?.id;
  const isEditing = Boolean(expenseId);

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? `Edit Expense - ${expenseId}` : 'Add Expense',
    });
  }, [navigation, expenseId, isEditing]);

  const deletExpenseHandler = () => {
    dispatch(removeExpense({ expenseId }));
    navigation.goBack();
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = (data) => {
    if (isEditing) {
      dispatch(
        updateExpense({
          expense: {
            id: expenseId,
            ...data,
          },
        })
      );
    } else {
      storeExpense(data);
      dispatch(
        addExpense({
          expense: data,
        })
      );
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        submitLabel={isEditing ? 'Update' : 'Add'}
        defaultValue={expense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon='trash'
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deletExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});
