import React from 'react';
import { NavigationProp, useFocusEffect } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import { Colors } from 'react-native-paper';

import { IUser, BuyerStackParam } from '../../../types';
import { FlatListShop } from '@molecules/FlatListShop/FlatListShop';
import { SkeletonListShop } from '@molecules/SkeletonBuyer/SkeletonListShop';
import { ScreenEmptyPage } from '../ScreenEmptyPage/ScreenEmptyPage';

interface Props {
  isLoading: boolean;
  shopList: IUser[];
  onGetShopList: () => void;
  navigation: NavigationProp<BuyerStackParam>;
}

export const ScreenBuyerShops: React.FC<Props> = ({
  isLoading,
  shopList,
  onGetShopList,
  navigation,
}) => {
  const handleOnPressShop = React.useCallback(
    (shop: IUser) => navigation.navigate('BuyerChatShop', { shop }),
    [navigation],
  );

  // Get Shop List
  // useFocusEffect(
  //   React.useCallback(() => {
  //     if (!shopList.length) {
  //       onGetShopList();
  //     }
  //   }, [onGetShopList, shopList]),
  // );

  const handleGetShopList = React.useCallback(
    () => onGetShopList(),
    [onGetShopList],
  );

  // Get Shop List
  React.useEffect(() => {
    handleGetShopList();
  }, [handleGetShopList]);

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.skeletonContainer}>
          <SkeletonListShop />
        </View>
      )}

      {!isLoading && !shopList.length && (
        <ScreenEmptyPage icon="construct" message="No Junk Shops" />
      )}

      {!isLoading && Boolean(shopList.length) && (
        <>
          <FlatListShop data={shopList} onPressShop={handleOnPressShop} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grey200,
  },
  skeletonContainer: {
    flex: 1,
    margin: 20,
  },
  skeleton: {
    flex: 1,
    width: '100%',
  },
});
