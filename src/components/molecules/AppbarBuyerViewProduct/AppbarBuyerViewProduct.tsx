import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, Button, Colors } from 'react-native-paper';

interface Props {
  isChatButtonDisabled: boolean;
  isOfferButtonDisabled: boolean;
  hasOfferedAlready?: boolean;
  onPressChat: () => void;
  onPressOffer: () => void;
}

export const AppbarBuyerViewProduct: React.FC<Props> = ({
  isChatButtonDisabled,
  isOfferButtonDisabled,
  hasOfferedAlready,
  onPressChat,
  onPressOffer,
}) => (
  <Appbar style={styles.appBar}>
    <View style={styles.appBarContent}>
      <Button
        disabled={isChatButtonDisabled}
        icon="chat-processing-outline"
        mode="outlined"
        style={styles.buttonChat}
        onPress={onPressChat}
      >
        Chat
      </Button>

      {hasOfferedAlready && (
        <Button
          disabled={isOfferButtonDisabled}
          icon="cash-multiple"
          labelStyle={styles.buttonOfferLabel}
          mode="contained"
          onPress={onPressOffer}
        >
          View Offer
        </Button>
      )}

      {!hasOfferedAlready && (
        <Button
          disabled={isOfferButtonDisabled}
          icon="cash-multiple"
          labelStyle={styles.buttonOfferLabel}
          mode="contained"
          onPress={onPressOffer}
        >
          Make Offer
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
  buttonChat: {
    marginRight: 10,
  },
  buttonOfferLabel: {
    color: Colors.white,
  },
});
