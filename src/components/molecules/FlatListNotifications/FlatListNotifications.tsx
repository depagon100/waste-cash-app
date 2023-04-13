import React from 'react';
import {
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { ListItemNotification } from '../ListItemNotification/ListItemNotification';

interface Props {
  list: Objects.Notification[];
  onNavigateToNotification: (notification: Objects.Notification) => void;
}

export const FlatListNotifications: React.FC<Props> = ({
  list,
  onNavigateToNotification,
}) => {
  const renderItem = ({ item }: { item: Objects.Notification }) => (
    <TouchableWithoutFeedback onPress={() => onNavigateToNotification(item)}>
      <View>
        <ListItemNotification notification={item} />
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <FlatList<Objects.Notification>
      data={list}
      keyExtractor={(notification) => `${notification.id}`}
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
