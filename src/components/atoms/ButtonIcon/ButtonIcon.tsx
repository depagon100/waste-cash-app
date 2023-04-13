import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { Colors } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

export enum ButtonIconVariants {
  SUCCESS = 'success',
  ERROR = 'error',
}

interface Props extends TouchableOpacityProps {
  icon: string;
  variants?: ButtonIconVariants;
}

export const ButtonIcon: React.FC<Props> = ({ icon, variants, ...props }) => (
  <TouchableOpacity
    style={[
      styles.button,
      variants === ButtonIconVariants.ERROR ? styles.error : styles.success,
    ]}
    {...props}
  >
    <Icon name={icon} size={18} style={styles.icon} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  error: {
    backgroundColor: Colors.red500,
  },
  icon: {
    color: Colors.white,
  },
  success: {
    backgroundColor: Colors.green500,
  },
});
