import React from 'react';
import {
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { CardProduct } from '../CardProduct/CardProduct';

interface Props {
  list: Objects.Product[];
  onNavigateToViewProduct: (id: number) => void;
}

export const FlatListProducts: React.FC<Props> = ({
  list,
  onNavigateToViewProduct,
}) => {
  const renderItem = ({ item }: { item: Objects.Product }) => (
    <TouchableWithoutFeedback onPress={() => onNavigateToViewProduct(item.id)}>
      <View style={styles.item}>
        <CardProduct product={item} />
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <FlatList<Objects.Product>
      contentContainerStyle={styles.content}
      data={list}
      keyExtractor={(product) => `${product.id}`}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  content: {
    paddingBottom: 20,
    paddingTop: 20,
  },
  item: {
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
  },
});
