import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { Colors } from 'react-native-paper';

interface Props {
  text?: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
}

export const Composer: React.FC<Props> = ({
  text,
  placeholder = 'Type your message here...',
  onChangeText,
}) => (
  <TextInput
    enablesReturnKeyAutomatically
    placeholder={placeholder}
    placeholderTextColor={Colors.grey300}
    style={styles.textInput}
    underlineColorAndroid="transparent"
    value={text}
    onChangeText={onChangeText}
  />
);

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    fontSize: 16,
    height: 41,
    lineHeight: 16,
    marginLeft: 10,
  },
});
