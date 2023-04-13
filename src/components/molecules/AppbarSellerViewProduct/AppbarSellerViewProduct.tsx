import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, Button, Colors } from 'react-native-paper';

interface Props {
  hasBidder?: boolean;
  isButtonOfferDisabled: boolean;
  onPressChat?: () => void;
  onPressOffer?: () => void;
}

export const AppbarSellerViewProduct: React.FC<Props> = ({
  hasBidder,
  isButtonOfferDisabled,
  onPressChat,
  onPressOffer,
}) => (
  <Appbar style={styles.appBar}>
    <View style={styles.appBarContent}>
      {!hasBidder && (
        <View>
          {' '}
          <Button
            icon="chat-processing-outline"
            mode="outlined"
            style={styles.buttonChat}
          >
            Chat
          </Button>
          <Button
            disabled={isButtonOfferDisabled}
            icon="cash-multiple"
            labelStyle={styles.buttonOfferLabel}
            mode="contained"
            onPress={onPressOffer}
          >
            Offers
          </Button>
        </View>
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
  buttonChat: {
    marginRight: 10,
  },
  buttonOfferLabel: {
    color: Colors.white,
  },
});
