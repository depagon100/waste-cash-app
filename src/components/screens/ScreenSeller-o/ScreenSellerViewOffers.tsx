import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, Text } from 'react-native-paper';

import { IProductOffer } from '../../../types';
import { DialogAcceptOffer } from '@molecules/DialogAcceptOffer/DialogAcceptOffer';
import { FlatListOffer } from '@molecules/FlatListOffer/FlatListOffer';

interface Props {
  offerList: IProductOffer[];
}

export const ScreenSellerViewOffers: React.FC<Props> = ({ offerList }) => {
  const [productOfferId, setProductOfferId] = React.useState(0);
  const [isDialogAcceptOfferVisible, setIsDialogAcceptOfferVisible] =
    React.useState(false);

  const handleOnPressAccept = React.useCallback(
    (id: number) => {
      setProductOfferId(id);

      setIsDialogAcceptOfferVisible(true);
    },
    [setProductOfferId, setIsDialogAcceptOfferVisible],
  );

  const handleDismissDialogAccepOffer = React.useCallback(() => {
    setProductOfferId(0);

    setIsDialogAcceptOfferVisible(false);
  }, [setProductOfferId, setIsDialogAcceptOfferVisible]);

  return (
    <View style={styles.container}>
      <DialogAcceptOffer
        isVisible={isDialogAcceptOfferVisible}
        onDismissDialog={handleDismissDialogAccepOffer}
      />
      <FlatListOffer data={offerList} onPressAccept={handleOnPressAccept} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
