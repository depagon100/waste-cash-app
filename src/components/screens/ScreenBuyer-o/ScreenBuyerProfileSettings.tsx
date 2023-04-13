import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Colors, Button } from 'react-native-paper';

import { DialogSignOut } from 'components/molecules/DialogSignOut/DialogSignOut';

interface Props {
  onSignOut: () => void;
}

export const ScreenBuyerProfileSettings: React.FC<Props> = ({ onSignOut }) => {
  const [isSignOutDialogVisible, setIsSignOutDialogVisible] =
    React.useState(false);

  const handleShowSignOutDialog = React.useCallback(() => {
    setIsSignOutDialogVisible(true);
  }, [setIsSignOutDialogVisible]);

  const handleDismissSignOutDialog = React.useCallback(() => {
    setIsSignOutDialogVisible(false);
  }, [setIsSignOutDialogVisible]);

  const handleSignOut = React.useCallback(() => {
    onSignOut();

    setIsSignOutDialogVisible(false);
  }, [onSignOut, setIsSignOutDialogVisible]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContent}>
        <DialogSignOut
          isVisible={isSignOutDialogVisible}
          onDismissDialog={handleDismissSignOutDialog}
          onSignOut={handleSignOut}
        />

        <Button
          mode="contained"
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}
          onPress={handleShowSignOutDialog}
        >
          Sign Out
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grey200,
  },
  scrollContent: {
    flex: 1,
    margin: 20,
  },
  dialog: {
    flex: 1,
  },
  buttonContent: {
    height: 50,
  },
  buttonLabel: {
    color: Colors.white,
  },
});
