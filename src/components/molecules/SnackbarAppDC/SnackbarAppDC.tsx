import React from 'react';
import { Snackbar } from 'react-native-paper';

interface Props {
  isVisible: boolean;
  onDismissSnackbar: () => void;
}

export const SnackbarAppDC: React.FC<Props> = ({
  isVisible,
  onDismissSnackbar,
}) => {
  return (
    <Snackbar visible={isVisible} onDismiss={onDismissSnackbar}>
      Need Internet
    </Snackbar>
  );
};
