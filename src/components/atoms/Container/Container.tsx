import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from 'react-native-paper';

interface Props {
  children?: React.ReactNode;
}

export const Container: React.FC<Props> = ({ children }) => (
  <View style={styles.container}>{children}</View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
});
