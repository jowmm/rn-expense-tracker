import { StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import { GlobalStyles } from '../../constants/styles';

const Input = ({ label, style, textInputConfig, isValid }) => {
  const isMultiline = textInputConfig.multiline;
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.label, !isValid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput
        style={[
          styles.textInput,
          isMultiline && styles.inputMultiline,
          !isValid && styles.invalidInput,
        ]}
        {...textInputConfig}
      />
      {!isValid && (
        <Text style={[styles.invalidLabel, styles.invalidText]}>
          Invalid input
        </Text>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  textInput: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  invalidLabel: {
    color: GlobalStyles.colors.error50,
  },
  invalidText: {
    fontSize: 12,
    marginVertical: 8,
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error50,
  },
});
