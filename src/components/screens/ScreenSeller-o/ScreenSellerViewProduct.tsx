import React from 'react';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { View, ScrollView, Image, StyleSheet } from 'react-native';
import { Colors, Chip, Title, Subheading, Paragraph } from 'react-native-paper';
import numeral from 'numeral';

import { IProduct, SellerStackParam } from '../../../types';
import { AppbarSellerViewProduct } from '@molecules/AppbarSellerViewProduct/AppbarSellerViewProduct';
import { SkeletonViewProduct } from '@molecules/SkeletonSeller/SkeletonViewProduct';

interface Props {
  isLoading: boolean;
  productData: IProduct;
  onGetProductData: (params: { productId: number }) => void;
  onSetProductData: (productData: null) => void;
  navigation: NavigationProp<SellerStackParam>;
  route: RouteProp<SellerStackParam, 'SellerViewProduct'>;
}

export const ScreenSellerViewProduct: React.FC<Props> = ({
  isLoading,
  productData,
  onGetProductData,
  onSetProductData,
  navigation,
  route,
}) => {
  const { productId, isRedirectToOffers } = route.params;

  const handleClearProductData = React.useCallback(
    () => onSetProductData(null),
    [onSetProductData],
  );

  const handleGetProductData = React.useCallback(
    () => onGetProductData({ productId }),
    [onGetProductData, productId],
  );

  const handleOnViewOffersNavigation = React.useCallback(
    (wasRedirectedFromNotification?: boolean) =>
      navigation.navigate('SellerViewOffers', {
        wasRedirectedFromNotification,
      }),
    [navigation],
  );

  // Clear Product Data
  React.useEffect(() => handleClearProductData(), [handleClearProductData]);

  // Get Product Data
  React.useEffect(() => {
    handleGetProductData();

    if (isRedirectToOffers) {
      handleOnViewOffersNavigation(true);
    }
  }, [handleGetProductData, isRedirectToOffers, handleOnViewOffersNavigation]);

  return (
    <View style={styles.container}>
      {isLoading && <SkeletonViewProduct />}
      {!isLoading && Boolean(productData?.name) && (
        <>
          <AppbarSellerViewProduct
            onPressOffer={handleOnViewOffersNavigation}
            isButtonOfferDisabled={!productData.offers.length}
          />
          <ScrollView
            style={styles.scrollContent}
            contentContainerStyle={styles.scrollContentContainer}
            keyboardShouldPersistTaps="handled"
          >
            <Image
              source={{ uri: productData.thumbnail }}
              style={styles.imageCover}
            />
            <View style={styles.categoryContent}>
              <Chip
                mode="outlined"
                onPress={() => {}}
                textStyle={styles.chipLabelStyle}
              >
                {productData.category.name}
              </Chip>
            </View>
            <View style={styles.heading}>
              <Title>{productData.name}</Title>
              <Subheading>{`\u20B1 ${numeral(productData.price).format(
                '0,0.00',
              )}`}</Subheading>

              <View style={styles.description}>
                <Paragraph>{productData.description}</Paragraph>
              </View>
            </View>
          </ScrollView>
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
  scrollContent: {
    flex: 1,
    marginBottom: 50,
  },
  scrollContentContainer: {
    flexGrow: 1,
  },
  imageCover: {
    width: '100%',
    height: 200,
  },
  categoryContent: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  chipLabelStyle: {
    color: Colors.green400,
  },
  heading: {
    margin: 20,
  },
  description: {
    marginTop: 20,
  },
});
