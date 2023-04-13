import React from 'react';
import {
  ActivityIndicator,
  Button,
  Dialog,
  Portal,
  Text,
} from 'react-native-paper';

interface Props {
  isVisible: boolean;
  onAccept: () => void;
  onDismiss: () => void;
}

export const DialogDeleteProduct: React.FC<Props> = ({
  isVisible,
  onAccept,
  onDismiss,
}) => {
  return (
    <Portal>
      <Dialog visible={isVisible} onDismiss={onDismiss}>
        <Dialog.Title>Delete product</Dialog.Title>
        <Dialog.Content>
          <Text>Are you sure you want to delete this product ?</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onAccept}>Yes</Button>
          <Button onPress={onDismiss}>No</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
