import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

type Props = React.ComponentProps<typeof TextInput> & { innerRef?: any };

export const Input: React.FC<Props> = ({ ...props }) => (
  <TextInput
    blurOnSubmit={props?.blurOnSubmit || false}
    mode={props?.mode || 'outlined'}
    ref={props?.innerRef}
    {...props}
  />
);

const styles = StyleSheet.create({
  inputText: {
    height: 50,
    marginBottom: 15,
  },
});
