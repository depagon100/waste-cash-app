import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Badge, Colors, IconButton, Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

import ContainerBuyerBrowseMap from '@/containers/ContainerBuyerBrowseMap';
import ContainerBuyerListProducts from '@/containers/ContainerBuyerListProducts';
import ContainerBuyerListShops from '@/containers/ContainerBuyerListShops';
import ContainerBuyerViewMap from '@/containers/ContainerBuyerViewMap';
import ContainerBuyerViewProduct from '@/containers/ContainerBuyerViewProduct';
import ContainerListConversations from '@/containers/ContainerCommonListConversations';
import ContainerListNotifications from '@/containers/ContainerCommonListNotifications';
import ContainerProfile from '@/containers/ContainerCommonProfile';
import ContainerViewConversation from '@/containers/ContainerCommonViewConversation';
import ContainerViewNotification from '@/containers/ContainerCommonViewNotification';
import navigation from '@/state/navigation';

interface Props {
  hasUnseenConversation: boolean;
  hasNotificationBadge: boolean;
}

const BuyerStack = createStackNavigator<Screens.BuyerStackParams>();
const BuyerInitialScreenTabs =
  createBottomTabNavigator<Screens.BuyerInitialScreenTabs>();
const BuyerNotificationScreenTabs =
  createMaterialTopTabNavigator<Screens.BuyerNotificationScreenTabs>();

export const BuyerNavigation: React.FC<Props> = ({
  hasUnseenConversation,
  hasNotificationBadge,
}) => {
  const handleNavigateToBrowseMap = () => {
    // navigation.navigate('BuyerProductMapScreen');
    navigation()?.navigate('BuyerProductMapScreen' as any);
  };

  const NotificationsScreen = () => (
    <BuyerNotificationScreenTabs.Navigator
      screenOptions={{
        // swipeEnabled: false,
        tabBarActiveTintColor: Colors.green500,
        tabBarInactiveTintColor: Colors.black,
        tabBarIndicatorStyle: styles.notificationTabIndicator,
      }}
    >
      <BuyerNotificationScreenTabs.Screen
        component={ContainerListNotifications}
        name="NotificationsTabView"
        options={{ title: 'Notifications' }}
      />

      <BuyerNotificationScreenTabs.Screen
        component={ContainerListConversations}
        name="MessagesTabView"
        options={{
          title: 'Messages',
          ...(hasUnseenConversation && {
            tabBarBadge: () => <Badge size={18} style={styles.badge} />,
          }),
        }}
      />
    </BuyerNotificationScreenTabs.Navigator>
  );

  const InitialScreen = () => (
    <BuyerInitialScreenTabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.green500,
        tabBarInactiveTintColor: Colors.black,
      }}
    >
      <BuyerInitialScreenTabs.Screen
        component={ContainerBuyerListProducts}
        name="ProductsTabView"
        options={{
          headerLeft: () => <Title style={styles.title}>Browse Products</Title>,
          headerRight: () => (
            <IconButton
              color={Colors.green700}
              icon={'map-marker'}
              style={styles.browseMapButton}
              onPress={handleNavigateToBrowseMap}
            />
          ),
          headerTitle: '',
          tabBarIcon: ({ color, size, focused }) => (
            <Icon
              color={color}
              name={focused ? 'home' : 'home-outline'}
              size={size}
            />
          ),
          tabBarLabel: 'Browse',
        }}
      />

      <BuyerInitialScreenTabs.Screen
        component={ContainerBuyerListShops}
        name="ShopsTabView"
        options={{
          headerTitleAlign: 'center',
          tabBarIcon: ({ color, size, focused }) => (
            <Icon
              color={color}
              name={focused ? 'construct' : 'construct-outline'}
              size={size}
            />
          ),
          tabBarLabel: 'Junk Shop',
          title: 'Junk Shop',
        }}
      />

      <BuyerInitialScreenTabs.Screen
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

      <BuyerInitialScreenTabs.Screen
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
    </BuyerInitialScreenTabs.Navigator>
  );

  return (
    <BuyerStack.Group>
      <BuyerStack.Screen
        component={InitialScreen}
        name="BuyerInitialScreen"
        options={{ headerShown: false }}
      />

      {/* View Screens */}
      <BuyerStack.Screen
        component={ContainerBuyerBrowseMap}
        name="BuyerProductMapScreen"
        options={{ headerShadowVisible: true, headerTitle: '' }}
      />

      <BuyerStack.Screen
        component={ContainerBuyerViewProduct}
        name="BuyerViewProductScreen"
        options={{ headerShadowVisible: true, headerTitle: '' }}
      />

      <BuyerStack.Screen
        component={ContainerViewConversation}
        name="BuyerViewConversationScreen"
        options={{ headerShadowVisible: true }}
      />

      <BuyerStack.Screen
        component={ContainerViewNotification}
        name="BuyerViewNotificationScreen"
        options={{
          headerShadowVisible: true,
          headerTitle: '',
        }}
      />

      <BuyerStack.Screen
        component={ContainerBuyerViewMap}
        name="BuyerViewMap"
        options={{
          headerShadowVisible: true,
          headerTitle: '',
        }}
      />
    </BuyerStack.Group>
  );
};

const styles = StyleSheet.create({
  badge: {
    left: -65,
    position: 'absolute',
    top: 8,
  },
  browseMapButton: {
    backgroundColor: Colors.green100,
    marginRight: 20,
  },
  notificationTabIndicator: {
    backgroundColor: Colors.green500,
    height: 3,
  },
  title: {
    marginLeft: 20,
  },
});
