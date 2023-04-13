import React from 'react';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import { Colors, Text } from 'react-native-paper';
import { Chat, MessageType } from '@flyerhq/react-native-chat-ui';

import { IProduct, BuyerStackParam, ProductStatus } from '../../../types';

interface Props {
  productData: IProduct;
  navigation: NavigationProp<BuyerStackParam>;
  route: RouteProp<BuyerStackParam, 'BuyerChatProduct'>;
}

export const ScreenBuyerChatProduct: React.FC<Props> = ({
  productData,
  navigation,
  route,
}) => {
  const { seller } = route.params;

  const [messages, setMessages] = React.useState<MessageType.Any[]>([]);

  const addMessage = React.useCallback(
    (message: MessageType.Any) => {
      setMessages([message, ...messages]);
    },
    [setMessages, messages],
  );

  const handleSendMessage = React.useCallback(
    (message: MessageType.PartialText) => {
      const textMessage: MessageType.Text = {
        author: { id: '123' },
        id: '1',
        text: message.text,
        type: 'text',
      };

      addMessage(textMessage);
    },
    [addMessage],
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({ title: `@${seller.username}` });
  }, [navigation, seller]);

  return (
    <View style={styles.container}>
      {/* <View style={styles.productInfoSection}>
        <View style={styles.productInfoContainer}>
          <Image
            source={require('../../../assets/images/placeholder-cover.jpg')}
            style={styles.productImage}
          />
          <View style={styles.productContent}>
            <Title>{productData.name}</Title>
            <Text>{`\u20B1 ${numeral(productData.price).format(
              '0,0.00',
            )}`}</Text>
          </View>
        </View>
      </View> */}
      <Chat
        messages={messages}
        onSendPress={handleSendMessage}
        user={{ id: '123' }}
        // customBottomComponent={() => <Text>Sample</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grey200,
  },
  productInfoSection: {
    height: 80,
  },
  productInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  productContent: {
    marginLeft: 10,
  },
  productImage: {
    height: 80,
    width: 90,
  },
});
