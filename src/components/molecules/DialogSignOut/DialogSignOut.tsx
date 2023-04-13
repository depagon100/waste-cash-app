import React from 'react';
import { Button, Dialog, Portal, Text } from 'react-native-paper';

interface Props {
  isVisible: boolean;
  onDismissDialog: () => void;
  onSignOut: () => void;
}

export const DialogSignOut: React.FC<Props> = ({
  isVisible,
  onDismissDialog,
  onSignOut,
}) => {
  const handleSignOut = React.useCallback(() => onSignOut(), [onSignOut]);

  return (
    <Portal>
      <Dialog visible={isVisible} onDismiss={onDismissDialog}>
        <Dialog.Content>
          <Text>Are you sure you want to Sign Out ?</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismissDialog}>Cancel</Button>
          <Button onPress={handleSignOut}>Confirm</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
