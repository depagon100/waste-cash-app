import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, Colors } from 'react-native-paper';

import { Button, ButtonSize } from '@/atoms/index';
interface Props {
  isRateExisting?: boolean;
  onOffer?: () => void;
  onRate?: () => void;
}

export const AppbarViewMap: React.FC<Props> = ({
  isRateExisting,
  onOffer,
  onRate,
}) => (
  <Appbar style={styles.appBar}>
    <View style={styles.appBarContent}>
      <Button
        icon="cash-multiple"
        size={ButtonSize.SMALL}
        style={styles.offerButton}
        onPress={onOffer}
      >
        View Offer
      </Button>

      {!isRateExisting && (
        <Button icon="star" size={ButtonSize.SMALL} onPress={onRate}>
          Rate
        </Button>
      )}
    </View>
  </Appbar>
);

const styles = StyleSheet.create({
  appBar: {
    backgroundColor: Colors.white,
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
  },
  appBarContent: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 10,
  },
  offerButton: {
    marginRight: 10,
  },
});
