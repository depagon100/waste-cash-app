import React from 'react';
import { Portal, Dialog, Text, Button } from 'react-native-paper';

interface Props {
  error: string;
  isVisible: boolean;
  onDismissDialog: () => void;
}

export const DialogAppError: React.FC<Props> = ({
  error,
  isVisible,
  onDismissDialog,
}) => {
  return (
    <Portal>
      <Dialog visible={isVisible} onDismiss={onDismissDialog}>
        <Dialog.Content>
          <Text>{error}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismissDialog}>OK</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
