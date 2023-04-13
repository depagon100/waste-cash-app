import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Colors, Text, Title } from 'react-native-paper';
import BottomSheet from 'react-native-raw-bottom-sheet';

import { Button } from '@/atoms/index';
import { formatPrice } from '@/utils/index';

import { FormCreateOffer } from '../FormCreateOffer/FormCreateOffer';

interface Props {
  innerRef: any;
  isLoading: boolean;
  productOffer: Objects.ProductOffer | undefined;
  success: string;
  onCancel: () => void;
  onClose: () => void;
  onCreateOffer: (params: { price: number }) => void;
}

export const BottomSheetViewProduct: React.FC<Props> = ({
  innerRef,
  isLoading,
  productOffer,
  success,
  onCancel,
  onClose,
  onCreateOffer,
}) => {
  const renderLoading = (): React.ReactNode => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator />
    </View>
  );

  const renderViewOffer = (): React.ReactNode => (
    <View style={styles.bottomSheetContent}>
      <Title>Your Offer</Title>
      <Text style={styles.offerPrice}>{formatPrice(productOffer!.price!)}</Text>

      <View style={styles.buttonContainer}>
        <Button onPress={onCancel}>Close</Button>
      </View>
    </View>
  );

  return (
    <BottomSheet
      animationType="slide"
      closeOnDragDown={false}
      closeOnPressMask={false}
      height={200}
      ref={innerRef}
      onClose={onClose}
    >
      {/* render loading when creating product offer suceeded */}
      {productOffer && Boolean(success) && renderLoading()}

      {/* render view offer */}
      {productOffer && !success && renderViewOffer()}

      {/* render create offer form */}
      {!productOffer && (
        <FormCreateOffer
          isLoading={isLoading}
          isSuccess={Boolean(success)}
          onCancel={onCancel}
          onCreateOffer={onCreateOffer}
        />
      )}
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  bottomSheetContent: {
    margin: 20,
  },
  buttonContainer: {
    marginTop: 20,
  },
  loadingContainer: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    flex: 1,
    justifyContent: 'center',
  },
  offerPrice: {
    fontSize: 20,
    marginBottom: 15,
    marginTop: 15,
  },
});
