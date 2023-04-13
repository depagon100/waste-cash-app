import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors, Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  message: string;
  icon?: string;
}

export const EmptyListPlaceHolder: React.FC<Props> = ({ icon, message }) => (
  <View style={styles.container}>
    {icon && (
      <Icon color={Colors.grey400} name={icon} size={122} style={styles.icon} />
    )}
    <Title style={styles.title}>{message ?? 'Nothing to see here.'}</Title>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
  icon: {
    marginBottom: 10,
  },
  title: {
    color: Colors.grey400,
    fontWeight: 'bold',
  },
});
