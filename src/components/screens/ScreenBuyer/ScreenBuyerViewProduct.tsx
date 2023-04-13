import { NavigationProp, RouteProp } from '@react-navigation/native';
import React from 'react';

import { Container } from '@/atoms/index';
import { ProductStatus } from '@/constants/index';
import {
  AppbarViewProduct,
  BottomSheetViewProduct,
  DialogSuccess,
} from '@/molecules/index';
import { ProductContent } from '@/organisms/index';
import { ScreenLoading } from '@/screens/ScreenLoading';

interface Props {
  isProductLoading: boolean;
  isProductOfferLoading: boolean;
  me: Objects.User;
  productData: Objects.Product;
  productOfferData: Objects.ProductOffer | undefined;
  success: string;
  createProductOffer: (params: { price: number }) => void;
  getProduct: (id: number) => void;
  setProductOfferSuccess: (message: string) => void;
  navigation: NavigationProp<Screens.BuyerStackParams>;
  route: RouteProp<Screens.BuyerStackParams, 'BuyerViewProductScreen'>;
}

export const ScreenBuyerViewProduct: React.FC<Props> = ({
  isProductLoading,
  isProductOfferLoading,
  me,
  productData,
  productOfferData,
  success,
  createProductOffer,
  getProduct,
  setProductOfferSuccess,
  navigation,
  route,
}) => {
  const { id } = route.params;

  const [isDialogVisible, setIsDialogVisible] = React.useState(false);

  const bottomSheet: any = React.useRef();

  const handleDialogVisibility = () => {
    // clear success message
    if (isDialogVisible && success) {
      setProductOfferSuccess('');
    }

    setIsDialogVisible(!isDialogVisible);
  };

  const handleOpenBottomSheet = () => {
    bottomSheet.current.open();
  };

  const handleCloseBottomSheet = () => {
    bottomSheet.current.close();
  };

  const handleOnCloseBottomSheet = () => {
    if (success) {
      handleDialogVisibility();
    }
  };

  const handleNavigateToViewConversation = () => {
    navigation.navigate('BuyerViewConversationScreen', {
      recipient: productData.owner,
    });
  };

  const handleNavigateToViewMap = () => {
    if (productData?.bidderSetup) {
      navigation.navigate('BuyerViewMap');
    }
  };

  // fetch product details
  React.useEffect(() => {
    getProduct(id);
  }, [id, getProduct]);

  // close bottom sheet when product offer creation succeed
  React.useEffect(() => {
    if (success) {
      handleCloseBottomSheet();
    }
  }, [success]);

  return (
    <Container>
      <DialogSuccess
        isVisible={isDialogVisible}
        message={success}
        onDismissDialog={handleDialogVisibility}
      />

      {isProductLoading && <ScreenLoading />}
      {!isProductLoading && Boolean(productData) && (
        <>
          <ProductContent product={productData} />
          {(productData.status === ProductStatus.UNSOLD ||
            (Boolean(productData?.bidder) &&
              productData?.bidder?.id === me?.id)) && (
            <AppbarViewProduct
              isBuyer
              hasWinner={Boolean(productData.bidder)}
              isOfferExist={Boolean(productOfferData)}
              onChat={handleNavigateToViewConversation}
              onOffer={handleOpenBottomSheet}
              onViewMap={handleNavigateToViewMap}
            />
          )}
          <BottomSheetViewProduct
            innerRef={bottomSheet}
            isLoading={isProductOfferLoading}
            productOffer={productOfferData}
            success={success}
            onCancel={handleCloseBottomSheet}
            onClose={handleOnCloseBottomSheet}
            onCreateOffer={createProductOffer}
          />
        </>
      )}
    </Container>
  );
};
