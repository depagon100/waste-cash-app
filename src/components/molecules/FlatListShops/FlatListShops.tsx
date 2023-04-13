import React from 'react';
import {
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { CardShop } from '../CardShop/CardShop';

interface Props {
  list: Objects.User[];
  onNavigateToConversation: (shop: Objects.User) => void;
}

export const FlatListShops: React.FC<Props> = ({
  list,
  onNavigateToConversation,
}) => {
  const renderItem = ({ item }: { item: Objects.User }) => (
    <TouchableWithoutFeedback onPress={() => onNavigateToConversation(item)}>
      <View style={styles.item}>
        <CardShop shop={item} />
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <FlatList<Objects.User>
      contentContainerStyle={styles.content}
      data={list}
      keyExtractor={(shop) => `${shop.id}`}
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
