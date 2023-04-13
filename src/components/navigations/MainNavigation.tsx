import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Socket } from 'socket.io-client';

import { UserRoles } from '@/constants/index';
import { ScreenLoading } from '@/screens/ScreenLoading';
import { navigationRef } from '@/state/navigation';

import { BuyerNavigation } from './BuyerNavigation';
import { JunkShopnavigation } from './JunkShopNavigation';
import { LoggedOutNavigation } from './LoggedOutNavigation';
import { SellerNavigation } from './SellerNavigation';
interface Props {
  hasUnseenConversation: boolean;
  hasUnseenNotification: boolean;
  isAuth: boolean;
  isInitialize: boolean;
  me: Objects.User;
  addConversationListMessage: (params: Objects.Message) => void;
  initialize: () => void;
  socket: Socket;
}

const Stack = createStackNavigator();

export const MainNavigation: React.FC<Props> = ({
  hasUnseenConversation,
  hasUnseenNotification,
  isAuth,
  isInitialize,
  me,
  addConversationListMessage,
  initialize,
  socket,
}) => {
  const hasNotificationBadge = hasUnseenConversation || hasUnseenNotification;

  // socket
  React.useEffect(() => {
    const hasCreateMessageListener = socket.hasListeners('createMessage');

    if (!hasCreateMessageListener) {
      console.log('Added createMessage listener');

      socket.on('createMessage', (payload: Objects.Message) => {
        if (payload.sender.id !== me?.id) {
          addConversationListMessage(payload);
        }
      });
    }

    // destroy current listener to avoid duplication of listener when this component rerender
    return () => {
      socket.off('createMessage');
    };
  }, [me, socket, addConversationListMessage]);

  // initialize app
  React.useEffect(() => {
    initialize();
  }, [initialize]);

  // display loading screen if app is not yet initialized
  if (!isInitialize) {
    return <ScreenLoading />;
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        {isAuth && me?.role === UserRoles.BUYER && (
          <Stack.Group>
            {BuyerNavigation({ hasNotificationBadge, hasUnseenConversation })}
          </Stack.Group>
        )}

        {isAuth && me?.role === UserRoles.JUNKSHOP && (
          <Stack.Group>
            {JunkShopnavigation({ hasNotificationBadge })}
          </Stack.Group>
        )}

        {isAuth && me?.role === UserRoles.SELLER && (
          <Stack.Group>
            {SellerNavigation({ hasNotificationBadge, hasUnseenConversation })}
          </Stack.Group>
        )}

        <Stack.Group>{LoggedOutNavigation({})}</Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
