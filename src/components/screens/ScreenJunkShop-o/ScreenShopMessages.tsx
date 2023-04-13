import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import { Colors } from 'react-native-paper';

import { ShopStackParam, IConversationSummary, IUser } from '../../../types';
import { FlatListMessage } from '@molecules/FlatListMessage/FlastListMessage';
import { ScreenEmptyPage } from '../ScreenEmptyPage/ScreenEmptyPage';

interface Props {
  conversationList: IConversationSummary[];
  user: IUser;
  navigation: NavigationProp<ShopStackParam>;
}

export const ScreenShopMessages: React.FC<Props> = ({
  conversationList,
  user,
  navigation,
}) => {
  const handleOnPressConversation = React.useCallback(
    (params: { conversationId: number; recipient: IUser }) =>
      navigation.navigate('ShopChat', {
        conversationId: params.conversationId,
        recipient: params.recipient,
      }),
    [navigation],
  );

  return (
    <View style={styles.container}>
      {!conversationList.length && (
        <ScreenEmptyPage icon="chatbubbles" message="No Messages" />
      )}

      {Boolean(conversationList.length) && (
        <FlatListMessage
          data={conversationList}
          me={user}
          onPressConversation={handleOnPressConversation}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grey200,
  },
});
