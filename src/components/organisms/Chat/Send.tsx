import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from 'react-native-paper';

interface Props {
  label?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  onPress?: () => void;
}

export const Send: React.FC<Props> = ({
  label = 'Send',
  disabled,
  children,
  onPress,
}) => (
  <TouchableOpacity
    disabled={disabled}
    style={[
      styles.container,
      disabled ? styles.buttonDisabled : styles.butttonEnabled,
    ]}
    onPress={onPress}
  >
    <View>{children || <Text style={styles.text}>{label}</Text>}</View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  buttonDisabled: {
    backgroundColor: Colors.green200,
  },
  butttonEnabled: {
    backgroundColor: Colors.green400,
  },
  container: {
    height: 44,
    justifyContent: 'flex-end',
  },
  text: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: '600',
    // backgroundColor: Colors.white,
    marginBottom: 12,
    marginLeft: 10,
    marginRight: 10,
  },
});
