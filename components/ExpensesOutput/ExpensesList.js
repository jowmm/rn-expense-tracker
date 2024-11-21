import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ExpenseItem from './ExpenseItem';

const renderExpenseItem = ({ item }) => {
  return <ExpenseItem {...item} />;
};

const ExpensesList = ({ data }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={({ id }) => `expense-item-${id}`}
      renderItem={renderExpenseItem}
    />
  );
};

export default ExpensesList;

const styles = StyleSheet.create({});
