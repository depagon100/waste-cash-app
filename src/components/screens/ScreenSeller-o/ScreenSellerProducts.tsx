import React from 'react';
import { NavigationProp, useFocusEffect } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import { Colors, FAB } from 'react-native-paper';

import { IProduct, SellerStackParam } from '../../../types';
import { FlatListProduct } from '@molecules/FlatListProduct/FlatListProduct';
import { SkeletonListProduct } from '@molecules/SkeletonSeller/SkeletonListProduct';
import { ScreenEmptyPage } from '../ScreenEmptyPage/ScreenEmptyPage';

interface Props {
  productList: IProduct[];
  isLoading: boolean;
  onGetProductList: () => void;
  navigation: NavigationProp<SellerStackParam>;
}

export const ScreenSellerProducts: React.FC<Props> = ({
  productList,
  isLoading,
  onGetProductList,
  navigation,
}) => {
  const isFABVisible = React.useMemo(() => !isLoading, [isLoading]);

  const handleCreateProductNavigation = React.useCallback(
    () => navigation.navigate('SellerCreateProduct'),
    [navigation],
  );

  const handleViewProductNavigation = React.useCallback(
    (productId: number) =>
      navigation.navigate('SellerViewProduct', { productId }),
    [navigation],
  );

  // Get Product List
  // useFocusEffect(
  //   React.useCallback(() => {
  //     if (!productList.length) {
  //       onGetProductList();
  //     }
  //   }, [productList, onGetProductList]),
  // );

  React.useCallback(() => {
    onGetProductList();
  }, [onGetProductList]);

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.skeletonContainer}>
          <SkeletonListProduct />
        </View>
      )}

      {!isLoading && !productList.length && (
        <ScreenEmptyPage icon="cube" message="No Products" />
      )}

      {!isLoading && Boolean(productList.length) && (
        <View style={styles.flatListContainer}>
          <FlatListProduct
            data={productList}
            onViewProductNavigation={handleViewProductNavigation}
          />
        </View>
      )}

      <FAB
        color={Colors.white}
        icon="plus"
        visible={isFABVisible}
        onPress={handleCreateProductNavigation}
        style={styles.fab}
      />
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
  flatListContainer: {
    marginBottom: -20,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.green400,
  },
});
