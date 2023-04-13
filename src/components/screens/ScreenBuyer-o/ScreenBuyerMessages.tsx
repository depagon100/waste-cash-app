import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import { Colors } from 'react-native-paper';

import { BuyerStackParam, IConversationSummary, IUser } from '../../../types';
import { FlatListMessage } from '@molecules/FlatListMessage/FlastListMessage';
import { ScreenEmptyPage } from '../ScreenEmptyPage/ScreenEmptyPage';

interface Props {
  conversationList: IConversationSummary[];
  user: IUser;
  navigation: NavigationProp<BuyerStackParam>;
}

export const ScreenBuyerMessages: React.FC<Props> = ({
  conversationList,
  user,
  navigation,
}) => {
  const handleOnPressConversation = React.useCallback(
    (params: { conversationId: number; recipient: IUser }) =>
      navigation.navigate('BuyerChat', {
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
