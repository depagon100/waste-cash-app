import { NavigationProp, RouteProp } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { Container } from '@/atoms/index';
import { AppbarViewProduct } from '@/molecules/index';
import { ProductContent } from '@/organisms/index';
import { ScreenLoading } from '@/screens/ScreenLoading';

interface Props {
  isLoading: boolean;
  productData: Objects.Product;
  deleteProduct: (id: number) => void;
  getProduct: (id: number) => void;
  navigation: NavigationProp<Screens.SellerStackParams>;
  route: RouteProp<Screens.SellerStackParams, 'SellerViewProductScreen'>;
}

export const ScreenSellerViewProduct: React.FC<Props> = ({
  isLoading,
  productData,
  deleteProduct,
  getProduct,
  navigation,
  route,
}) => {
  const { id } = route.params;

  const handleNavigateToOffersScreen = () => {
    navigation.navigate('SellerListOffersScreen');
  };

  const handleDeleteProduct = () => {
    deleteProduct(id);
  };

  const handleOffer = () => {
    if (productData.bidder) {
      // show sheet
    } else {
      handleNavigateToOffersScreen();
    }
  };

  const handleNavigateToSetupBidder = () => {
    navigation.navigate('SellerBidderSetup');
  };

  React.useEffect(() => {
    getProduct(id);
  }, [id, getProduct]);

  return (
    <Container>
      {isLoading && <ScreenLoading />}
      {!isLoading && Boolean(productData) && (
        <>
          <ScrollView
            contentContainerStyle={styles.scrollContentContainer}
            keyboardShouldPersistTaps="handled"
            style={styles.scrollContent}
          >
            <ProductContent
              showActions
              product={productData}
              onDeleteProduct={handleDeleteProduct}
            />
          </ScrollView>
          {!productData.deletedAt && (
            <AppbarViewProduct
              hasWinner={Boolean(productData.bidder)}
              isOfferButtonDisabled={
                !productData.offers.filter(
                  (offer) => offer.status !== 'rejected',
                ).length
              }
              onOffer={handleOffer}
              onSetup={handleNavigateToSetupBidder}
            />
          )}
        </>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 50,
  },
  scrollContent: {
    flex: 1,
    marginBottom: 60,
  },
  scrollContentContainer: {
    flexGrow: 1,
  },
});
