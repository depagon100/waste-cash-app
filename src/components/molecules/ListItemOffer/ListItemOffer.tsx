import numeral from 'numeral';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Colors, Divider, List } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Button, ButtonIcon, ButtonIconVariants } from '@/atoms/index';
import { formatPrice } from '@/utils/index';

interface Props {
  offer: Objects.ProductOffer;
  onAccept: (id: number) => void;
  onReject: (id: number) => void;
}

export const ListItemOffer: React.FC<Props> = ({
  offer,
  onAccept,
  onReject,
}) => (
  <View>
    <List.Item
      description={formatPrice(offer.price)}
      left={() => (
        <View style={styles.avatarContainer}>
          <Avatar.Text
            label={`${offer.user.firstName[0]}${offer.user.lastName[0]}`}
            size={45}
          />
        </View>
      )}
      right={() => (
        <View style={styles.buttonContainer}>
          <View style={styles.buttonWrapperWithMR}>
            <ButtonIcon icon="done" onPress={() => onAccept(offer.id)} />
          </View>
          <ButtonIcon
            icon="close"
            variants={ButtonIconVariants.ERROR}
            onPress={() => onReject(offer.id)}
          />
        </View>
      )}
      testID="list-item-offer"
      title={`${offer.user.firstName} ${offer.user.lastName}`}
    />
    <Divider />
  </View>
);

const styles = StyleSheet.create({
  acceptLabelStyle: {
    color: Colors.white,
  },
  avatarContainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    margin: 5,
  },
  buttonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonWrapperWithMR: {
    marginRight: 10,
  },
});
