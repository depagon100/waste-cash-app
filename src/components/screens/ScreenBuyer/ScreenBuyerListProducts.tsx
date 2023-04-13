import { NavigationProp } from '@react-navigation/native';
import React from 'react';

import { Container } from '@/atoms/index';
import { FlatListProducts, SkeletonListProducts } from '@/molecules/index';

interface Props {
  isLoading: boolean;
  productList: Objects.Product[];
  getProducts: () => void;
  navigation: NavigationProp<Screens.BuyerStackParams>;
}

export const ScreenBuyerListProducts: React.FC<Props> = ({
  isLoading,
  productList,
  getProducts,
  navigation,
}) => {
  const handleNavigateToViewProduct = (id: number) => {
    navigation.navigate('BuyerViewProductScreen', { id });
  };

  React.useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <Container>
      {isLoading && <SkeletonListProducts />}
      {!isLoading && Boolean(productList.length) && (
        <FlatListProducts
          list={productList}
          onNavigateToViewProduct={handleNavigateToViewProduct}
        />
      )}
    </Container>
  );
};
