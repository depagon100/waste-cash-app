import numeral from 'numeral';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Colors, Divider, List } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Button, ButtonIcon, ButtonIconVariants } from '@/atoms/index';
import { formatPrice } from '@/utils/index';

interface Props {
  review: Objects.Review;
}

export const ListItemReview: React.FC<Props> = ({ review }) => {
  const reviewer = review.reviewer.firstName
    .split('')
    .map((char, index) => {
      if (index !== 0 && index !== review.reviewer.firstName.length - 1) {
        return '*';
      }

      return char;
    })
    .join('');

  return (
    <View>
      <List.Item
        description={review.feedback}
        left={() => (
          <View style={styles.avatarContainer}>
            <Avatar.Text label={`${review.reviewer.firstName[0]}`} size={45} />
          </View>
        )}
        right={() => (
          <View style={styles.buttonContainer}>
            <Rating imageSize={15} startingValue={+review.rate} />
          </View>
        )}
        testID="list-item-reviewer"
        title={reviewer}
      />
      <Divider />
    </View>
  );
};

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
