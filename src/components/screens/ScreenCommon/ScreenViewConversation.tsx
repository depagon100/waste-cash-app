import { MessageType } from '@flyerhq/react-native-chat-ui';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import React from 'react';
import { Socket } from 'socket.io-client';

import { Container } from '@/atoms/index';
import { Chat } from '@/organisms/index';

interface Props {
  conversationData: Objects.Conversation;
  isLoading: boolean;
  me: Objects.User;
  addConversationDataMessage: (params: Objects.Message) => void;
  getConversationData: (params: {
    conversationId?: number;
    recipientId?: number;
  }) => void;
  seenMessages: (params: { conversationId: number }) => void;
  sendMessage: (params: {
    socket: Socket;
    conversationId?: number;
    recipientId?: number;
    content: string;
  }) => void;
  navigation: NavigationProp<any>;
  route: RouteProp<any, any>;
  socket: Socket;
}

export const ScreenViewConversation: React.FC<Props> = ({
  conversationData,
  isLoading,
  me,
  addConversationDataMessage,
  getConversationData,
  seenMessages,
  sendMessage,
  navigation,
  route,
  socket,
}) => {
  const { params } = route;
  const [message, setMessage] = React.useState('');

  const messages = React.useMemo(() => {
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

  const handleMessageChange = (text: string) => {
    setMessage(text);
  };

  const handleSendPress = () => {
    let toSend: {
      socket: Socket;
      content: string;
      conversationId?: number;
      recipientId?: number;
    } = {
      content: message,
      recipientId: params?.recipient?.id,
      socket,
    };

    if (conversationData?.id) {
      toSend.conversationId = conversationData.id;
    }

    // clear message input
    handleMessageChange('');

    // send message to server
    sendMessage(toSend);
  };

  // socket
  React.useEffect(() => {
    const hasDirectMessageListener = socket.hasListeners('directMessage');

    if (!hasDirectMessageListener) {
      console.log('Added directMessage listener');

      socket.on('directMessage', (payload: Objects.Message) => {
        if (payload.sender.id !== me?.id) {
          addConversationDataMessage(payload);
        }
      });
    }

    // destroy current listener to avoid duplication of listener when this component rerender
    return () => {
      socket.off('directMessage');
    };
  }, [me, socket, addConversationDataMessage]);

  // get conversation
  React.useEffect(() => {
    getConversationData({
      ...(params?.conversationId
        ? { conversationId: +params?.conversationId }
        : { recipientId: +params?.recipient?.id }),
    });
  }, [params, getConversationData]);

  // seen converastion
  React.useEffect(() => {
    if (
      conversationData?.id &&
      conversationData.messages.filter(
        (conversationMessage) =>
          conversationMessage.sender.id !== me?.id &&
          !conversationMessage.isSeen,
      )?.length
    ) {
      seenMessages({ conversationId: conversationData.id });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationData?.id, seenMessages]);

  // add title in header
  React.useLayoutEffect(() => {
    const title =
      params?.recipient?.junkShopName ||
      `${params?.recipient.firstName} ${params?.recipient.lastName}`;

    navigation.setOptions({ title });
  }, [params, navigation]);

  return (
    <Container>
      <Chat
        isLoading={isLoading}
        isSendDisabled={Boolean(!message)}
        messages={messages}
        text={message}
        user={me}
        onChangeText={handleMessageChange}
        onSendPress={handleSendPress}
      />
    </Container>
  );
};
