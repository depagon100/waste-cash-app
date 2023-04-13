import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Colors, TextInput, Title } from 'react-native-paper';

interface Props {
  isLoading: boolean;
  isSuccess: boolean;
  onSubmit: (price: number) => void;
  onCancel: () => void;
}

export const BottomSheetMakeOffer: React.FC<Props> = ({
  isLoading,
  isSuccess,
  onSubmit,
  onCancel,
}) => {
  const [price, setPrice] = React.useState('');
  const inputPrice: any = React.useRef();

  const isCancelButtonDisabled = React.useMemo(
    () => isLoading || isSuccess,
    [isLoading, isSuccess],
  );

  const isSubmitButtonDisabled = React.useMemo(
    () => !price || isLoading || isSuccess,
    [price, isLoading, isSuccess],
  );

  const handlePriceChange = React.useCallback(
    (text: string) => setPrice(text),
    [setPrice],
  );

  const handlePriceSubmitEditting = React.useCallback(
    () => inputPrice.current.blur(),
    [inputPrice],
  );

  const handleCloseBottomSheet = React.useCallback(
    () => onCancel(),
    [onCancel],
  );

  const handleCreateOffer = React.useCallback(() => {
    inputPrice.current.blur();

    onSubmit(+price);
  }, [inputPrice, onSubmit, price]);

  return (
    <View style={styles.bottomSheetContent}>
      <Title>Make Offer</Title>

      <TextInput
        blurOnSubmit={false}
        keyboardType="numeric"
        label="Price"
        left={<TextInput.Affix text={'\u20B1'} />}
        mode="outlined"
        ref={inputPrice}
        returnKeyType="done"
        value={`${price}`}
        onChangeText={handlePriceChange}
        onSubmitEditing={handlePriceSubmitEditting}
      />

      <View style={styles.buttons}>
        <View style={styles.buttonContainer}>
          <Button
            color={Colors.white}
            disabled={isCancelButtonDisabled}
            labelStyle={styles.cancelButtonLabel}
            mode="contained"
            style={styles.cancelButton}
            onPress={handleCloseBottomSheet}
          >
            Cancel
          </Button>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            disabled={isSubmitButtonDisabled}
            labelStyle={styles.offerButtonLabel}
            mode="contained"
            onPress={handleCreateOffer}
          >
            Submit
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomSheetContent: {
    margin: 20,
  },
  buttonContainer: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    flexGrow: 1,
    marginTop: 20,
  },
  cancelButton: {
    marginRight: 20,
  },
  cancelButtonLabel: {
    color: Colors.green500,
  },
  offerButtonLabel: {
    color: Colors.white,
  },
});
