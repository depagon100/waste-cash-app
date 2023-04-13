import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { ListItemReview } from '../ListItemReview/ListItemReview';

interface Props {
  list: Objects.Review[];
}

export const FlatListReviews: React.FC<Props> = ({ list }) => {
  const renderItem = ({ item }: { item: Objects.Review }) => (
    <ListItemReview review={item} />
  );

  return (
    <FlatList<Objects.Review>
      data={list}
      keyExtractor={(review) => `${review.id}`}
      renderItem={renderItem}
      style={styles.flatList}
    />
  );
};

const styles = StyleSheet.create({
  flatList: {
    marginBottom: -20,
  },
});
