import { NavigationProp, RouteProp } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Card, Colors, Text } from 'react-native-paper';

import { Button, Container } from '@/atoms/index';
import { UserRoles } from '@/constants/index';
import { EmptyListPlaceHolder } from '@/molecules/index';
import {
  formatDate,
  formatNotificationTitle,
  getNotificationIcon,
} from '@/utils/index';

interface Props {
  me: Objects.User;
  seenNotification: (notificationId: number) => void;
  navigation: NavigationProp<any>;
  route: RouteProp<any, any>;
}

export const ScreenViewNotification: React.FC<Props> = ({
  me,
  seenNotification,
  navigation,
  route,
}) => {
  const { params } = route;
  const notification = params as Objects.Notification;
  const isRejected = notification.event.includes('rejected');
  const hasChat = [
    'accepted-product-offer',
    'create-bidder-setup',
    'update-bidder-setup',
  ].includes(notification.event);

  const handleNavigateToViewProduct = (id: number) => {
    let productScreen = '';

    switch (me.role) {
      case UserRoles.BUYER:
        productScreen = 'BuyerViewProductScreen';
        break;

      case UserRoles.SELLER:
        productScreen = 'SellerViewProductScreen';
        break;
    }

    navigation.navigate(productScreen, { id });
  };

  const handleNavigateToConversation = (user?: Objects.User) => {
    navigation.navigate('BuyerViewConversationScreen', { recipient: user });
  };

  React.useEffect(() => {
    if (!notification.isSeen) {
      seenNotification(notification.id);
    }
  }, [notification, seenNotification]);

  return (
    <Container>
      <View style={styles.contentWrapper}>
        <View style={styles.content}>
          <Card elevation={2} mode="elevated">
            <Card.Content style={styles.content}>
              <View style={styles.avatarWrapper}>
                <Avatar.Icon
                  color={isRejected ? Colors.red700 : Colors.green700}
                  icon={getNotificationIcon(notification.event)}
                  size={84}
                  style={[
                    isRejected ? styles.avatarError : styles.avatarSuccess,
                    styles.avatar,
                  ]}
                />
              </View>
              <Text style={styles.title}>
                {formatNotificationTitle(notification.event)}
              </Text>

              <Text style={styles.description}>{notification.description}</Text>

              {Boolean(notification?.product) && (
                <Button
                  style={styles.viewProduct}
                  onPress={() =>
                    handleNavigateToViewProduct(
                      notification?.product?.id as number,
                    )
                  }
                >
                  View Product
                </Button>
              )}

              {hasChat && (
                <Button
                  onPress={() =>
                    handleNavigateToConversation(notification?.from)
                  }
                >
                  Chat Seller
                </Button>
              )}
            </Card.Content>
          </Card>
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  avatar: {
    alignSelf: 'center',
  },
  avatarError: {
    backgroundColor: Colors.red100,
  },
  avatarSuccess: {
    backgroundColor: Colors.green100,
  },
  avatarWrapper: {
    marginBottom: 20,
  },
  content: {
    margin: 20,
  },
  contentWrapper: {
    backgroundColor: Colors.grey300,
    flex: 1,
    justifyContent: 'center',
  },
  description: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
  },
  header: {
    backgroundColor: Colors.green500,
    height: 100,
  },
  title: {
    color: Colors.black,
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center',
  },
  viewProduct: {
    marginBottom: 10,
  },
});
