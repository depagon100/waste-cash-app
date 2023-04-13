import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors, Paragraph } from 'react-native-paper';

interface Props {
  message: string;
  type: 'error' | 'success';
}

export const MessageBox: React.FC<Props> = ({ message, type }) => (
  <View
    style={[
      styles.messageBox,
      type === 'success' ? styles.messageBoxSuccess : styles.messageBoxError,
    ]}
  >
    <Paragraph
      style={[
        styles.message,
        type === 'success' ? styles.messageSuccess : styles.messageError,
      ]}
    >
      {message}
    </Paragraph>
  </View>
);

const styles = StyleSheet.create({
  message: {
    fontWeight: 'bold',
  },
  messageBox: {
    borderRadius: 4,
    padding: 10,
  },
  messageBoxError: {
    backgroundColor: Colors.red50,
    borderColor: Colors.red300,
  },
  messageBoxSuccess: {
    backgroundColor: Colors.green50,
    borderColor: Colors.green300,
  },
  messageError: {
    color: Colors.red700,
  },
  messageSuccess: {
    color: Colors.green700,
  },
});
