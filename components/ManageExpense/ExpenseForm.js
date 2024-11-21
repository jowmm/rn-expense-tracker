import { Alert, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Input from '../UI/Input';
import Button from '../UI/Button';
import { getFormattedDate } from '../../util/date';

const ExpenseForm = ({ onCancel, onSubmit, submitLabel, defaultValue }) => {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValue ? defaultValue.amount.toString() : 0,
      isValid: true,
    },
    date: {
      value: defaultValue ? getFormattedDate(defaultValue.date) : '',
      isValid: true,
    },
    description: {
      value: defaultValue ? defaultValue.description : '',
      isValid: true,
    },
  });

  const inputChangeHandler = (text, prop) => {
    setInputs((prev) => ({
      ...prev,
      [prop]: { value: text, isValid: true },
    }));
  };

  const submitHandler = () => {
    const expenseData = {
      amount: Number(inputs.amount.value),
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      // Alert.alert('Invalid Input', 'Please check your input values.');
      setInputs(({ amount, date, description }) => ({
        amount: { ...amount, isValid: amountIsValid },
        date: { ...date, isValid: dateIsValid },
        description: { ...description, isValid: descriptionIsValid },
      }));
      return;
    }

    onSubmit(expenseData);
  };

  return (
    <View style={styles.rootConainer}>
      <View style={styles.amountDateContainer}>
        <Input
          label='Amount'
          style={styles.rowInput}
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onChangeText: (text) => inputChangeHandler(text, 'amount'),
            value: inputs.amount.value,
          }}
          isValid={inputs.amount.isValid}
        />
        <Input
          label='Date'
          style={styles.rowInput}
          textInputConfig={{
            placeholder: 'yyyy-MM-dd',
            maxLength: 10,
            onChangeText: (text) => inputChangeHandler(text, 'date'),
            value: inputs.date.value,
          }}
          isValid={inputs.date.isValid}
        />
      </View>
      <Input
        label='Description'
        textInputConfig={{
          multiline: true,
          onChangeText: (text) => inputChangeHandler(text, 'description'),
          value: inputs.description.value,
        }}
        isValid={inputs.description.isValid}
      />
      <View style={styles.buttonContainer}>
        <Button mode='flat' onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={submitHandler} style={styles.button}>
          {submitLabel}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  rootConainer: {},
  amountDateContainer: {
    flexDirection: 'row',
    alignItems: 'start',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
