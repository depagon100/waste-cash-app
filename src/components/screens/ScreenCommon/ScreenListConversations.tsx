import { NavigationProp } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Container } from '@/atoms/index';
import { UserRoles } from '@/constants/index';
import { EmptyListPlaceHolder, FlatListConversations } from '@/molecules/index';

interface Props {
  conversationList: Objects.ConversationSummary[];
  userData: Objects.User;
  navigation: NavigationProp<any>;
}

export const ScreenListConversations: React.FC<Props> = ({
  conversationList,
  userData,
  navigation,
}) => {
  const handleOnNavigateToConversation = (params: {
    conversationId: number;
    recipient: Partial<Objects.User>;
  }) => {
    let conversationScreen = '';

    switch (userData.role) {
      case UserRoles.BUYER:
        conversationScreen = 'BuyerViewConversationScreen';
        break;

      case UserRoles.JUNKSHOP:
        conversationScreen = 'JunkShopViewConversationScreen';
        break;

      case UserRoles.SELLER:
        conversationScreen = 'SellerViewConversationScreen';
        break;
    }

    navigation.navigate(conversationScreen, params);
  };

  return (
    <Container>
      {!conversationList.length && (
        <EmptyListPlaceHolder icon="chatbubbles" message="No Messages" />
      )}

      {Boolean(conversationList.length) && (
        <FlatListConversations
          list={conversationList}
          me={userData}
          onNavigateToConversation={handleOnNavigateToConversation}
        />
      )}

      <View style={styles.clear} />
    </Container>
  );
};

const styles = StyleSheet.create({
  clear: {
    height: 20,
  },
});
