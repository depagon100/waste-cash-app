import React from 'react';
import { Button, Dialog, Portal, Text } from 'react-native-paper';

interface Props {
  isVisible: boolean;
  onSignInNavigation: () => void;
}

export const DialogSignIn: React.FC<Props> = ({
  isVisible,
  onSignInNavigation,
}) => {
  const handleSignInNavigation = React.useCallback(
    () => onSignInNavigation(),
    [onSignInNavigation],
  );

  return (
    <Portal>
      <Dialog dismissable={false} visible={isVisible}>
        <Dialog.Title>Successfully Sign Up!</Dialog.Title>
        <Dialog.Content>
          <Text>Thank you, your sign-up request was successful!</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={handleSignInNavigation}>
            Take me to Sign In Screen
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
