import React from 'react';
import { Socket } from 'socket.io-client';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import { MessageType } from '@flyerhq/react-native-chat-ui';

import {
  BuyerStackParam,
  IConversation,
  IMessage,
  IUser,
} from '../../../types';
import { Chat } from '@organisms/Chat';

interface Props {
  conversationData: IConversation;
  me: IUser;
  isLoading: boolean;
  onAddConversationDataMessage: (params: IMessage) => void;
  onGetConversationData: (shopId: number) => void;
  onSendMessage: (params: {
    socket: Socket;
    conversationId?: number;
    recipientId?: number;
    content: string;
  }) => void;
  navigation: NavigationProp<BuyerStackParam>;
  route: RouteProp<BuyerStackParam, 'BuyerChatShop'>;
  socket: Socket;
}

export const ScreenBuyerChatShop: React.FC<Props> = ({
  conversationData,
  me,
  isLoading,
  onAddConversationDataMessage,
  onSendMessage,
  onGetConversationData,
  navigation,
  route,
  socket,
}) => {
  const { shop } = route.params;
  const [message, setMessage] = React.useState('');

  const formattedMessages = React.useMemo(() => {
    let result: MessageType.Any[] = [];

    result = conversationData?.messages.map((conversationMessage) => ({
      author: {
        id: `${conversationMessage.sender.id}`,
      },
      id: `${conversationMessage.id}`,
      text: conversationMessage.content,
      type: 'text',
    }));

    return result;
  }, [conversationData]);

  const handleMessageChange = React.useCallback(
    (text: string) => setMessage(text),
    [setMessage],
  );

  const handleSendPress = React.useCallback(() => {
    let toSend: {
      socket: Socket;
      content: string;
      conversationId?: number;
      recipientId?: number;
    } = {
      socket,
      content: message,
      recipientId: shop.id,
    };
    if (conversationData?.id) {
      toSend.conversationId = conversationData.id;
    }

    // clear message input
    setMessage('');
    // send message to server
    onSendMessage(toSend);
  }, [conversationData, message, shop, socket, onSendMessage, setMessage]);

  React.useLayoutEffect(() => {
    navigation.setOptions({ title: shop.junkShopName });
  }, [navigation, shop]);

  React.useEffect(() => {
    onGetConversationData(shop.id);
  }, [shop, onGetConversationData]);

  // Socket
  React.useEffect(() => {
    const hasDirectMessageListener = socket.hasListeners('directMessage');

    if (!hasDirectMessageListener) {
      console.log('Added directMessage listener');
      socket.on('directMessage', (payload: IMessage) => {
        if (payload.sender.id !== me?.id) {
          onAddConversationDataMessage(payload);
        }
      });
    }

    return () => {
      // destroy current listener to avoid duplication of listener when this component rerender
      socket.off('directMessage');
    };
  }, [socket, me, onAddConversationDataMessage]);

  return (
    <View style={styles.container}>
      <Chat
        messages={formattedMessages}
        text={message}
        user={me}
        isLoading={isLoading}
        isSendDisabled={Boolean(!message)}
        onChangeText={handleMessageChange}
        onSendPress={handleSendPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
