import { NavigationProp } from '@react-navigation/native';
import React from 'react';

import { Container } from '@/atoms/index';
import { FlatListShops, SkeletonListShops } from '@/molecules/index';

interface Props {
  isLoading: boolean;
  shopList: Objects.User[];
  getShops: () => void;
  navigation: NavigationProp<Screens.BuyerStackParams>;
}

export const ScreenBuyerListShops: React.FC<Props> = ({
  isLoading,
  shopList,
  getShops,
  navigation,
}) => {
  const handleNavigateToConversation = (user: Objects.User) => {
    navigation.navigate('BuyerViewConversationScreen', { recipient: user });
  };

  React.useEffect(() => {
    getShops();
  }, [getShops]);

  return (
    <Container>
      {isLoading && <SkeletonListShops />}
      {!isLoading && Boolean(shopList.length) && (
        <FlatListShops
          list={shopList}
          onNavigateToConversation={handleNavigateToConversation}
        />
      )}
    </Container>
  );
};
