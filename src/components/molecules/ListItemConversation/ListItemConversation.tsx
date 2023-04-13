import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Colors, Divider, List, Text } from 'react-native-paper';

import { formatDate } from '@/utils/index';

interface Props {
  conversationSummary: Objects.ConversationSummary;
  isMessageWasSeen: boolean;
  isMessageWasSentByMe: boolean;
  recipient: Partial<Objects.User>;
}

export const ListItemConversation: React.FC<Props> = ({
  conversationSummary: conversation,
  isMessageWasSeen,
  isMessageWasSentByMe,
  recipient,
}) => {
  const isShop = Boolean(recipient?.junkShopName);
  const title = isShop
    ? recipient?.junkShopName
    : `${recipient.firstName} ${recipient.lastName}`;

  return (
    <View>
      <List.Item
        description={`${isMessageWasSentByMe ? 'You: ' : ''}${
          conversation.message.content
        }`}
        descriptionStyle={isMessageWasSeen ? styles.seen : styles.unseen}
        left={() => (
          <View style={styles.avatarContainer}>
            <Avatar.Text
              label={`${recipient.firstName?.[0]}${recipient.lastName?.[0]}`}
              size={45}
            />
          </View>
        )}
        right={() => (
          <Text style={isMessageWasSeen ? styles.seen : styles.unseen}>
            {Boolean(conversation.message.createdAt) &&
              formatDate(new Date(conversation.message.createdAt!))}
          </Text>
        )}
        testID="list-item-notification"
        title={title}
        titleStyle={isMessageWasSeen ? styles.seen : styles.unseen}
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
  seen: {
    color: Colors.grey800,
    fontWeight: 'normal',
  },
  unseen: {
    color: Colors.black,
    fontWeight: '900',
  },
});
