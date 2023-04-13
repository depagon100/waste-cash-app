import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, Colors } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  message: string;
  icon?: string;
}

export const ScreenEmptyPage: React.FC<Props> = ({ message, icon }) => (
  <View style={styles.container}>
    {icon && (
      <Icon name={icon} color={Colors.grey400} size={122} style={styles.icon} />
    )}
    <Title style={styles.title}>{message ?? 'Nothing to see here.'}</Title>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    color: Colors.grey400,
  },
});
