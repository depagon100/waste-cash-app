import React from 'react';
import { Button, Dialog, Portal, Text } from 'react-native-paper';

interface Props {
  isVisible: boolean;
  message: string;
  onDismissDialog: () => void;
}

export const DialogSuccess: React.FC<Props> = ({
  message,
  isVisible,
  onDismissDialog,
}) => {
  return (
    <Portal>
      <Dialog visible={isVisible} onDismiss={onDismissDialog}>
        <Dialog.Content>
          <Text>{message}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismissDialog}>Okay</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
