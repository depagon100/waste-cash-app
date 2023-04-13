import React from 'react';
import {
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { ListItemConversation } from '../ListItemConversation/ListItemConversation';

interface Props {
  list: Objects.ConversationSummary[];
  me: Objects.User;
  onNavigateToConversation: (params: {
    conversationId: number;
    recipient: Partial<Objects.User>;
  }) => void;
}

export const FlatListConversations: React.FC<Props> = ({
  list,
  me,
  onNavigateToConversation,
}) => {
  const renderItem = ({ item }: { item: Objects.ConversationSummary }) => {
    const recipient =
      item.recipient.id === me?.id ? item.sender : item.recipient;
    const isMessageWasSentByMe = item.sender.id === me?.id;
    const isMessageWasSeen = isMessageWasSentByMe || item.message.isSeen;

    return (
      <TouchableWithoutFeedback
        onPress={() =>
          onNavigateToConversation({
            conversationId: item.id,
            recipient,
          })
        }
      >
        <View>
          <ListItemConversation
            conversationSummary={item}
            isMessageWasSeen={isMessageWasSeen!}
            isMessageWasSentByMe={isMessageWasSentByMe}
            recipient={recipient}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  };
  return (
    <FlatList<Objects.ConversationSummary>
      data={list}
      keyExtractor={(conversation) => `${conversation.id}`}
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
