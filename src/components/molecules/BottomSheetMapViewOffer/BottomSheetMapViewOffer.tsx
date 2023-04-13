import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors, Text, Title } from 'react-native-paper';
import BottomSheet from 'react-native-raw-bottom-sheet';

import { Button } from '@/atoms/index';
import { formatPrice } from '@/utils/index';

interface Props {
  innerRef: any;
  productOffer: Objects.ProductOffer | undefined;
  onCancel: () => void;
  onClose?: () => void;
}

export const BottomSheetMapViewOffer: React.FC<Props> = ({
  innerRef,
  productOffer,
  onCancel,
  onClose,
}) => {
  return (
    <BottomSheet
      animationType="slide"
      closeOnDragDown={false}
      closeOnPressMask={false}
      height={200}
      ref={innerRef}
      onClose={onClose}
    >
      <View style={styles.bottomSheetContent}>
        <Title>Your Offer</Title>
        <Text style={styles.offerPrice}>
          {formatPrice(productOffer!.price!)}
        </Text>

        <View style={styles.buttonContainer}>
          <Button onPress={onCancel}>Close</Button>
        </View>
      </View>
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
  offerPrice: {
    fontSize: 20,
    marginBottom: 15,
    marginTop: 15,
  },
});
