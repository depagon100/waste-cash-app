import { NavigationProp } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Container, FAB, Select } from '@/atoms/index';
import {
  EmptyListPlaceHolder,
  FlatListProducts,
  SkeletonListProducts,
} from '@/molecules/index';

interface Props {
  isLoading: boolean;
  productList: Objects.Product[];
  getProducts: () => void;
  navigation: NavigationProp<Screens.SellerStackParams>;
}

export const ScreenSellerListProducts: React.FC<Props> = ({
  isLoading,
  productList,
  getProducts,
  navigation,
}) => {
  const [productStatus, setProductStatus] = React.useState('all');
  const [options, setOption] = React.useState([
    { label: 'All', value: 'all' },
    { label: 'Unsold', value: 'unsold' },
    { label: 'Sold', value: 'sold' },
  ]);

  const result =
    !productStatus || productStatus === 'all'
      ? productList
      : productList.filter((product) => product.status === productStatus);

  const handleNavigateToViewProduct = (id: number) => {
    navigation.navigate('SellerViewProductScreen', { id });
  };

  const handleNavigateToCreateProduct = () => {
    navigation.navigate('SellerCreateProductScreen');
  };

  React.useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <Container>
      {isLoading && <SkeletonListProducts />}
      {!isLoading && Boolean(productList.length) && (
        <View>
          <View style={styles.dropdownContainer}>
            <Select
              items={options}
              setItems={setOption}
              setValue={setProductStatus}
              value={productStatus}
            />
          </View>

          <FlatListProducts
            list={result}
            onNavigateToViewProduct={handleNavigateToViewProduct}
          />
        </View>
      )}
      {!isLoading && !productList.length && (
        <EmptyListPlaceHolder icon="cube" message="No products" />
      )}

      <FAB icon="plus" onPress={handleNavigateToCreateProduct} />
    </Container>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },
});
