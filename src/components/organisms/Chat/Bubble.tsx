/* eslint-disable react-native/no-inline-styles */
import { MessageType } from '@flyerhq/react-native-chat-ui';
import React from 'react';
import { View } from 'react-native';
import { Colors } from 'react-native-paper';

interface Props {
  children: React.ReactNode;
  me: Objects.User;
  message: MessageType.Any;
  nextMessageInGroup: boolean;
}

export const Bubble: React.FC<Props> = ({
  children,
  me,
  message,
  nextMessageInGroup,
}) => (
  <View
    style={{
      backgroundColor:
        `${me?.id}` !== message.author.id ? Colors.grey300 : Colors.green500,
      borderRadius: 20,
      margin: 0,
      overflow: 'hidden',
      padding: 0,
    }}
  >
    {children}
  </View>
);
