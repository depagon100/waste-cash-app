import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors, TextInput, Title } from 'react-native-paper';

import { Button, Input } from '@/atoms/index';
import { ProductStatus } from '@/constants/index';

interface Props {
  isLoading: boolean;
  isSuccess: boolean;
  onCancel: () => void;
  onCreateOffer: (params: { price: number }) => void;
}

export const FormCreateOffer: React.FC<Props> = ({
  isLoading,
  isSuccess,
  onCreateOffer,
  onCancel,
}) => {
  const [price, setPrice] = React.useState('');

  const inputPrice: any = React.useRef();

  const isCancelButtonDisabled = isLoading || isSuccess;
  const isSubmitButtonDisabled = !price || isLoading || isSuccess;

  const handlePriceChange = (text: string) => setPrice(text);

  const handlePriceSubmitEditting = () => inputPrice.current.blur();

  const handleCreateOffer = () => {
    onCreateOffer({ price: +price });
  };

  return (
    <View style={styles.bottomSheetContent}>
      <Title>Make Offer</Title>

      <Input
        innerRef={inputPrice}
        keyboardType="numeric"
        label="Price"
        left={<TextInput.Affix text={'\u20B1'} />}
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
            style={styles.cancelButton}
            onPress={onCancel}
          >
            Cancel
          </Button>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            disabled={isSubmitButtonDisabled}
            labelStyle={styles.offerButtonLabel}
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
