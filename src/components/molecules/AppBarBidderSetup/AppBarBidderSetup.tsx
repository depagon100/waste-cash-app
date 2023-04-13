import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, Button, Colors } from 'react-native-paper';

interface Props {
  onChat?: () => void;
}

export const AppBarBidderSetup: React.FC<Props> = ({ onChat }) => (
  <Appbar style={styles.appBar}>
    <View style={styles.appBarContent}>
      <Button
        icon="chat-processing-outline"
        mode="outlined"
        style={styles.buttonChat}
        onPress={onChat}
      >
        Chat
      </Button>
    </View>
  </Appbar>
);

const styles = StyleSheet.create({
  appBar: {
    backgroundColor: Colors.white,
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
  },
  appBarContent: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 10,
  },
  button: {
    marginRight: 10,
  },
  buttonChat: {
    marginRight: 10,
  },
  buttonSetupLabel: {
    color: Colors.white,
  },
});
