import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Colors, Divider, List, Text } from 'react-native-paper';

import {
  formatDate,
  formatNotificationTitle,
  getNotificationIcon,
} from '@/utils/index';

interface Props {
  notification: Objects.Notification;
}

export const ListItemNotification: React.FC<Props> = ({ notification }) => {
  const isRejected = notification.event.includes('rejected');

  return (
    <View>
      <List.Item
        description={notification.description}
        descriptionStyle={notification.isSeen ? styles.seen : styles.unseen}
        left={() => (
          <View style={styles.avatarContainer}>
            <Avatar.Icon
              color={isRejected ? Colors.red700 : Colors.green700}
              icon={getNotificationIcon(notification.event)}
              size={45}
              style={isRejected ? styles.avatarError : styles.avatarSuccess}
            />
          </View>
        )}
        right={() => (
          <Text style={notification.isSeen ? styles.seen : styles.unseen}>
            {Boolean(notification.createdAt) &&
              formatDate(new Date(notification.createdAt!))}
          </Text>
        )}
        testID="list-item-notification"
        title={formatNotificationTitle(notification.event)}
        titleStyle={notification.isSeen ? styles.seen : styles.unseen}
      />
      <Divider />
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    margin: 5,
  },
  avatarError: {
    backgroundColor: Colors.red100,
  },
  avatarSuccess: {
    backgroundColor: Colors.green100,
  },
  seen: {
    color: Colors.grey800,
    fontWeight: 'normal',
  },
  unseen: {
    color: Colors.black,
    fontWeight: '900',
  },
});
