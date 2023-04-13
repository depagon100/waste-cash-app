import React from 'react';
import { Button, Dialog, Portal, Text } from 'react-native-paper';

interface Props {
  isVisible: boolean;
  title: string;
  onAccept: () => void;
  onDismiss: () => void;
  onReject: () => void;
}

export const DialogAcceptOrRejectOffer: React.FC<Props> = ({
  isVisible,
  title,
  onAccept,
  onDismiss,
  onReject,
}) => {
  return (
    <Portal>
      <Dialog visible={isVisible} onDismiss={onDismiss}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Text>Are you sure with your choice</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={title.includes('Accept') ? onAccept : onReject}>
            Yes
          </Button>
          <Button onPress={onDismiss}>No</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
