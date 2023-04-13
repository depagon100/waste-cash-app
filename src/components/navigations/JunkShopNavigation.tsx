import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

import ContainerListConversations from '@/containers/ContainerCommonListConversations';
import ContainerListNotifications from '@/containers/ContainerCommonListNotifications';
import ContainerProfile from '@/containers/ContainerCommonProfile';
import ContainerViewConversation from '@/containers/ContainerCommonViewConversation';

interface Props {
  hasNotificationBadge: boolean;
}

const JunkShopStack = createStackNavigator<Screens.JunkShopParams>();
const JunkShopInitialScreenTabs =
  createBottomTabNavigator<Screens.JunkShopInitialScreenTabs>();
const JunkShopNotificationScreenTabs =
  createMaterialTopTabNavigator<Screens.JunkShopNotificationScreenTabs>();

export const JunkShopnavigation: React.FC<Props> = ({
  hasNotificationBadge,
}) => {
  const NotificationsScreen = () => (
    <JunkShopNotificationScreenTabs.Navigator
      screenOptions={{
        // swipeEnabled: false,
        tabBarActiveTintColor: Colors.green500,
        tabBarInactiveTintColor: Colors.black,
        tabBarIndicatorStyle: styles.notificationTabIndicator,
      }}
    >
      <JunkShopNotificationScreenTabs.Screen
        component={ContainerListNotifications}
        name="NotificationsTabView"
        options={{ title: 'Notifications' }}
      />

      <JunkShopNotificationScreenTabs.Screen
        component={ContainerListConversations}
        name="MessagesTabView"
        options={{ title: 'Messages' }}
      />
    </JunkShopNotificationScreenTabs.Navigator>
  );

  const InitialScreen = () => (
    <JunkShopInitialScreenTabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.green500,
        tabBarInactiveTintColor: Colors.black,
      }}
    >
      <JunkShopInitialScreenTabs.Screen
        component={NotificationsScreen}
        name="NotificationsScreen"
        options={{
          tabBarLabel: 'Notifications',
          ...(hasNotificationBadge && { tabBarBadge: ' ' }),
          headerTitleAlign: 'center',
          tabBarIcon: ({ color, size, focused }) => (
            <Icon
              color={color}
              name={focused ? 'notifications' : 'notifications-outline'}
              size={size}
            />
          ),
        }}
      />

      <JunkShopInitialScreenTabs.Screen
        component={ContainerProfile}
        name="ProfileTabView"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Icon
              color={color}
              name={focused ? 'person' : 'person-outline'}
              size={size}
            />
          ),
          tabBarLabel: 'Profile',
        }}
      />
    </JunkShopInitialScreenTabs.Navigator>
  );

  return (
    <JunkShopStack.Group>
      <JunkShopStack.Screen
        component={InitialScreen}
        name="JunkShopInitialScreen"
        options={{ headerShown: false }}
      />

      {/* View Screens */}
      <JunkShopStack.Screen
        component={ContainerViewConversation}
        name="JunkShopViewConversationScreen"
        options={{ headerShadowVisible: true }}
      />
    </JunkShopStack.Group>
  );
};

const styles = StyleSheet.create({
  notificationTabIndicator: {
    backgroundColor: Colors.green500,
    height: 3,
  },
});
