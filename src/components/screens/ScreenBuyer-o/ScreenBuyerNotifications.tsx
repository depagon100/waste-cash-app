import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from 'react-native-paper';

import { ScreenEmptyPage } from '../ScreenEmptyPage/ScreenEmptyPage';

export const ScreenBuyerNotifications: React.FC = () => {
  return (
    <View style={styles.container}>
      <ScreenEmptyPage icon="notifications" message="No Notifications" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grey200,
  },
});
