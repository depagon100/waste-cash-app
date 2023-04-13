import React from 'react';
import { StyleSheet } from 'react-native';
import { Colors, FAB as PaperFab } from 'react-native-paper';

type Props = React.ComponentProps<typeof PaperFab>;

export const FAB: React.FC<Props> = ({ ...props }) => (
  <PaperFab color={Colors.white} style={styles.fab} {...props} />
);

const styles = StyleSheet.create({
  fab: {
    backgroundColor: Colors.green400,
    bottom: 0,
    margin: 16,
    position: 'absolute',
    right: 0,
  },
});
