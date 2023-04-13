import { Chat as ChatUI, MessageType } from '@flyerhq/react-native-chat-ui';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Colors } from 'react-native-paper';

import { Bubble } from './Bubble';
import { Toolbar } from './Toolbar';

interface Props {
  isSendDisabled: boolean;
  isLoading?: boolean;
  messages: MessageType.Any[];
  text: string;
  user: Objects.User;
  onChangeText: (text: string) => void;
  onSendPress: () => void;
}

export const Chat: React.FC<Props> = ({
  isLoading,
  isSendDisabled,
  messages,
  text,
  user,
  onChangeText,
  onSendPress,
}) => {
  const me = {
    id: `${user.id}`,
  };

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator animating={true} />
        </View>
      )}

      {!isLoading && (
        <ChatUI
          customBottomComponent={() => (
            <Toolbar
              isSendDisabled={isSendDisabled}
              text={text}
              onChangeText={onChangeText}
              onSendPress={onSendPress}
            />
          )}
          messages={messages || []}
          renderBubble={({ child, message, nextMessageInGroup }) => (
            <Bubble
              me={user}
              message={message}
              nextMessageInGroup={nextMessageInGroup}
            >
              {child}
            </Bubble>
          )}
          user={me}
          onSendPress={onSendPress}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  loadingContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
