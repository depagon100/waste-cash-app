import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, Colors } from 'react-native-paper';

import { Button, ButtonSize } from '@/atoms/index';
interface Props {
  hasWinner?: boolean;
  isBuyer?: boolean;
  isOfferButtonDisabled?: boolean;
  isOfferExist?: boolean;
  onChat?: () => void;
  onOffer?: () => void;
  onSetup?: () => void;
  onViewMap?: () => void;
}

export const AppbarViewProduct: React.FC<Props> = ({
  hasWinner,
  isBuyer,
  isOfferButtonDisabled,
  isOfferExist,
  onChat,
  onOffer,
  onSetup,
  onViewMap,
}) => (
  <Appbar style={styles.appBar}>
    <View style={styles.appBarContent}>
      {isBuyer && (
        <>
          <Button
            color={Colors.white}
            icon="chat-processing-outline"
            size={ButtonSize.SMALL}
            style={styles.buttonChat}
            onPress={onChat}
          >
            Chat
          </Button>
          {!hasWinner && (
            <Button
              disabled={isOfferButtonDisabled}
              icon="cash-multiple"
              size={ButtonSize.SMALL}
              onPress={onOffer}
            >
              {isOfferExist ? 'View Offer' : 'Make Offer'}
            </Button>
          )}

          {hasWinner && (
            <Button
              disabled={isOfferButtonDisabled}
              icon="map"
              size={ButtonSize.SMALL}
              onPress={onViewMap}
            >
              View Location
            </Button>
          )}
        </>
      )}

      {!isBuyer && (
        <>
          {!hasWinner && (
            <Button
              disabled={isOfferButtonDisabled}
              icon="cash-multiple"
              size={ButtonSize.SMALL}
              onPress={onOffer}
            >
              Offers
            </Button>
          )}

          {hasWinner && (
            <Button icon="alarm" size={ButtonSize.SMALL} onPress={onSetup}>
              Set Up
            </Button>
          )}
        </>
      )}
    </View>

    {/* {!hasWinner && (
      <View style={styles.appBarContent}>
        <Button
          color={Colors.white}
          icon="chat-processing-outline"
          size={ButtonSize.SMALL}
          style={styles.buttonChat}
          onPress={onChat}
        >
          Chat
        </Button>

        <Button
          disabled={isOfferButtonDisabled}
          icon="cash-multiple"
          size={ButtonSize.SMALL}
          onPress={onOffer}
        >
          {isBuyer ? (isOfferExist ? 'View Offer' : 'Make Offer') : 'Offers'}
        </Button>
      </View>
    )}

    {hasWinner && (
      <View style={styles.appBarContent}>
        <Button icon="alarm" size={ButtonSize.SMALL} onPress={onSetup}>
          Set Up
        </Button>
      </View>
    )} */}
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
