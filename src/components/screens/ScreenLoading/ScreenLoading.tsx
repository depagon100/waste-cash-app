import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

export const ScreenLoading: React.FC = () => (
  <View style={styles.container}>
    <ActivityIndicator animating={true} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
});
