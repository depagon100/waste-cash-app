import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Badge, Colors } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

import ContainerListConversations from '@/containers/ContainerCommonListConversations';
import ContainerListNotifications from '@/containers/ContainerCommonListNotifications';
import ContainerProfile from '@/containers/ContainerCommonProfile';
import ContainerSetMap from '@/containers/ContainerCommonSetMap';
import ContainerViewConversation from '@/containers/ContainerCommonViewConversation';
import ContainerViewNotification from '@/containers/ContainerCommonViewNotification';
import ContainerSellerBidderSetup from '@/containers/ContainerSellerBidderSetup';
import ContainerSellerCreateProduct from '@/containers/ContainerSellerCreateProduct';
import ContainerSellerListOffers from '@/containers/ContainerSellerListOffers';
import ContainerSellerListProducts from '@/containers/ContainerSellerListProducts';
import ContainerSellerViewProduct from '@/containers/ContainerSellerViewProduct';

interface Props {
  hasUnseenConversation: boolean;
  hasNotificationBadge: boolean;
}

const SellerStack = createStackNavigator<Screens.SellerStackParams>();
const SellerInitialScreenTabs =
  createBottomTabNavigator<Screens.SellerInitialScreenTabs>();
const SellerNotificationScreenTabs =
  createMaterialTopTabNavigator<Screens.SellerNotificationScreenTabs>();

export const SellerNavigation: React.FC<Props> = ({
  hasUnseenConversation,
  hasNotificationBadge,
}) => {
  const NotificationsScreen = () => (
    <SellerNotificationScreenTabs.Navigator
      screenOptions={{
        // swipeEnabled: false,
        tabBarActiveTintColor: Colors.green500,
        tabBarInactiveTintColor: Colors.black,
        tabBarIndicatorStyle: styles.notificationTabIndicator,
      }}
    >
      <SellerNotificationScreenTabs.Screen
        component={ContainerListNotifications}
        name="NotificationsTabView"
        options={{ title: 'Notifications' }}
      />

      <SellerNotificationScreenTabs.Screen
        component={ContainerListConversations}
        name="MessagesTabView"
        options={{
          title: 'Messages',
          ...(hasUnseenConversation && {
            tabBarBadge: () => <Badge size={18} style={styles.badge} />,
          }),
        }}
      />
    </SellerNotificationScreenTabs.Navigator>
  );

  const InitialScreen = () => (
    <SellerInitialScreenTabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.green500,
        tabBarInactiveTintColor: Colors.black,
      }}
    >
      <SellerInitialScreenTabs.Screen
        component={ContainerSellerListProducts}
        name="ProductsTabView"
        options={{
          headerTitleAlign: 'center',
          tabBarIcon: ({ color, size, focused }) => (
            <Icon
              color={color}
              name={focused ? 'home' : 'home-outline'}
              size={size}
            />
          ),
          tabBarLabel: 'Browse',
          title: 'Browse Products',
        }}
      />

      <SellerInitialScreenTabs.Screen
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
          title: 'Notifications',
        }}
      />

      <SellerInitialScreenTabs.Screen
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
    </SellerInitialScreenTabs.Navigator>
  );

  return (
    <SellerStack.Group>
      <SellerStack.Screen
        component={InitialScreen}
        name="SellerInitialScreen"
        options={{ headerShown: false }}
      />

      <SellerStack.Screen
        component={ContainerSellerCreateProduct}
        name="SellerCreateProductScreen"
        options={{
          headerShadowVisible: true,
          headerTitle: 'Create Product',
          headerTitleAlign: 'center',
        }}
      />

      {/* List Screens */}
      <SellerStack.Screen
        component={ContainerSellerListOffers}
        name="SellerListOffersScreen"
        options={{
          headerShadowVisible: true,
          headerTitle: 'Offers',
        }}
      />

      {/* View Screens */}
      <SellerStack.Screen
        component={ContainerSellerBidderSetup}
        name="SellerBidderSetup"
        options={{ headerShadowVisible: true, headerTitle: 'Set Up' }}
      />

      <SellerStack.Screen
        component={ContainerSellerViewProduct}
        name="SellerViewProductScreen"
        options={{ headerShadowVisible: true, headerTitle: '' }}
      />

      <SellerStack.Screen
        component={ContainerViewConversation}
        name="SellerViewConversationScreen"
        options={{ headerShadowVisible: true }}
      />

      <SellerStack.Screen
        component={ContainerViewNotification}
        name="SellerViewNotificationScreen"
        options={{ headerShadowVisible: true, title: 'Notification' }}
      />

      <SellerStack.Screen
        component={ContainerSetMap}
        name="SellerSetMap"
        options={{ headerShadowVisible: true, title: 'Set Location' }}
      />
    </SellerStack.Group>
  );
};

const styles = StyleSheet.create({
  badge: {
    left: -65,
    position: 'absolute',
    top: 8,
  },
  notificationTabIndicator: {
    backgroundColor: Colors.green500,
    height: 3,
  },
});
