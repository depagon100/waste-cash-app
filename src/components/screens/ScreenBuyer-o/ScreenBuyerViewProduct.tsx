import { AppbarBuyerViewProduct } from '@molecules/AppbarBuyerViewProduct/AppbarBuyerViewProduct';
import { BottomSheetMakeOffer } from '@molecules/BottomSheetMakeOffer/BottomSheetMakeOffer';
import { BottomSheetViewOffer } from '@molecules/BottomSheetViewOffer/BottomSheetViewOffer';
import { DialogCreateProductOfferSuccess } from '@molecules/DialogCreateProductOfferSuccess/DialogCreateProductOfferSuccess';
import { SkeletonViewProduct } from '@molecules/SkeletonSeller/SkeletonViewProduct';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import numeral from 'numeral';
import React from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import {
  ActivityIndicator,
  Chip,
  Colors,
  Paragraph,
  Subheading,
  Title,
} from 'react-native-paper';
import BottomSheet from 'react-native-raw-bottom-sheet';
import { Socket } from 'socket.io-client';

import {
  BuyerStackParam,
  IProduct,
  IProductOffer,
  ProductStatus,
} from '../../../types';

interface Props {
  isLoadingProduct: boolean;
  isLoadingProductOffer: boolean;
  hasOfferedAlready: boolean;
  productOfferSuccess: string;
  productData: IProduct;
  offer: IProductOffer;
  onCreateProductOffer: (params: { price: number }) => void;
  onGetProductData: (params: { productId: number }) => void;
  onSetProductOfferSuccess: (error: string | null) => void;
  onSetProductData: (productData: null) => void;
  navigation: NavigationProp<BuyerStackParam>;
  route: RouteProp<BuyerStackParam, 'BuyerViewProduct'>;
  socket: Socket;
}

export const ScreenBuyerViewProduct: React.FC<Props> = ({
  isLoadingProduct,
  isLoadingProductOffer,
  hasOfferedAlready,
  productOfferSuccess,
  productData,
  offer,
  onCreateProductOffer,
  onGetProductData,
  onSetProductData,
  onSetProductOfferSuccess,
  navigation,
  route,
  socket,
}) => {
  const { productId } = route.params;
  const bottomSheet: any = React.useRef();
  // const socket = React.useContext(SocketContext);

  const [
    isDialogProductOfferSuccessVisible,
    setIsDialogProductOfferSuccessVisible,
  ] = React.useState(false);

  const isActionButtonDisabled = React.useMemo(
    () => productData?.status === ProductStatus.SOLD,
    [productData],
  );

  const handleClearProductData = React.useCallback(
    () => onSetProductData(null),
    [onSetProductData],
  );

  const handleDismissDialogProductOfferSuccess = React.useCallback(() => {
    setIsDialogProductOfferSuccessVisible(false);

    onSetProductOfferSuccess(null);
  }, [onSetProductOfferSuccess]);

  const handleGetProductData = React.useCallback(
    () => onGetProductData({ productId }),
    [onGetProductData, productId],
  );

  const handleOnPressChatButton = React.useCallback(
    () =>
      navigation.navigate('BuyerChatProduct', {
        seller: productData.owner,
      }),
    [navigation, productData],
  );

  const handleOnPressOfferButton = React.useCallback(
    () => bottomSheet.current.open(),
    [bottomSheet],
  );

  const handleOnSubmitOffer = React.useCallback(
    (price: number) => onCreateProductOffer({ price }),
    [onCreateProductOffer],
  );

  const handleCancel = React.useCallback(
    () => bottomSheet.current.close(),
    [bottomSheet],
  );

  const handleOnBottomSheetClose = React.useCallback(() => {
    if (productOfferSuccess) {
      setIsDialogProductOfferSuccessVisible(true);
    }
  }, [productOfferSuccess]);

  // Socket
  React.useEffect(() => {
    socket.on('createOffer', (payload: any) => {
      console.log(`createOffer: ${payload}`);
    });

    return () => {
      // destroy current listener to avoid duplication of listener when this component rerender
      socket.off('createOffer');
    };
  }, [socket]);

  // Clear Product Data
  React.useEffect(() => {
    handleClearProductData();
  }, [handleClearProductData]);

  // Get Product Data
  React.useEffect(() => {
    handleGetProductData();
  }, [handleGetProductData]);

  // Close bottom sheet when product offer is success
  React.useEffect(() => {
    if (productOfferSuccess) {
      // close bottom sheet
      handleCancel();
    }
  }, [handleCancel, productOfferSuccess]);

  return (
    <View style={styles.container}>
      {isLoadingProduct && <SkeletonViewProduct />}
      {!isLoadingProduct && Boolean(productData?.name) && (
        <>
          <DialogCreateProductOfferSuccess
            isVisible={isDialogProductOfferSuccessVisible}
            success={productOfferSuccess}
            onDismissDialog={handleDismissDialogProductOfferSuccess}
          />

          <AppbarBuyerViewProduct
            hasOfferedAlready={hasOfferedAlready}
            isChatButtonDisabled={isActionButtonDisabled}
            isOfferButtonDisabled={isActionButtonDisabled}
            onPressChat={handleOnPressChatButton}
            onPressOffer={handleOnPressOfferButton}
          />

          <BottomSheet
            animationType="slide"
            closeOnDragDown={false}
            closeOnPressMask={false}
            height={200}
            ref={bottomSheet}
            onClose={handleOnBottomSheetClose}
          >
            {offer && Boolean(productOfferSuccess) && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator />
              </View>
            )}

            {offer && !productOfferSuccess && (
              <BottomSheetViewOffer
                offer={offer.price}
                onClose={handleCancel}
              />
            )}

            {!offer && (
              <BottomSheetMakeOffer
                isLoading={isLoadingProductOffer}
                isSuccess={Boolean(productOfferSuccess)}
                onCancel={handleCancel}
                onSubmit={handleOnSubmitOffer}
              />
            )}
          </BottomSheet>
          <ScrollView
            contentContainerStyle={styles.scrollContentContainer}
            keyboardShouldPersistTaps="handled"
            style={styles.scrollContent}
          >
            <Image
              source={{ uri: productData.thumbnail }}
              style={styles.imageCover}
            />
            <View style={styles.categoryContent}>
              <Chip
                mode="outlined"
                textStyle={styles.chipLabelStyle}
                onPress={() => {}}
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
  categoryContent: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
  chipLabelStyle: {
    color: Colors.green400,
  },
  container: {
    backgroundColor: Colors.grey200,
    flex: 1,
  },
  description: {
    marginTop: 20,
  },
  heading: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 15,
  },
  imageCover: {
    height: 200,
    width: '100%',
  },
  loadingContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
  scrollContent: {
    flex: 1,
    marginBottom: 50,
  },
  scrollContentContainer: {
    flexGrow: 1,
  },
});
