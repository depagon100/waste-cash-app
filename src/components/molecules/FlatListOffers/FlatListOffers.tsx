import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { ListItemOffer } from '../ListItemOffer/ListItemOffer';

interface Props {
  list: Objects.ProductOffer[];
  onAccept: (id: number) => void;
  onReject: (id: number) => void;
}

export const FlatListOffers: React.FC<Props> = ({
  list,
  onAccept,
  onReject,
}) => {
  const renderItem = ({ item }: { item: Objects.ProductOffer }) => (
    <ListItemOffer offer={item} onAccept={onAccept} onReject={onReject} />
  );

  return (
    <FlatList<Objects.ProductOffer>
      data={list}
      keyExtractor={(productOffer) => `${productOffer.id}`}
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
