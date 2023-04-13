import { NavigationProp } from '@react-navigation/native';
import React from 'react';

import { Container } from '@/atoms/index';
import {
  DialogAcceptOrRejectOffer,
  EmptyListPlaceHolder,
  FlatListOffers,
} from '@/molecules/index';

interface Props {
  isLoading: boolean;
  productData: Objects.Product;
  productOfferList: Objects.ProductOffer[];
  acceptProductOffer: (offerId: number) => void;
  rejectProductOffer: (offerId: number) => void;
  navigation: NavigationProp<Screens.SellerStackParams>;
}

export const ScreenSellerListOffers: React.FC<Props> = ({
  productData,
  productOfferList,
  acceptProductOffer,
  rejectProductOffer,
  navigation,
}) => {
  const [id, setId] = React.useState(0);
  const [isDialogVisible, setIsDialogVisible] = React.useState(false);
  const [title, setTitle] = React.useState('');

  const handleDialogVisibility = () => {
    setIsDialogVisible(!isDialogVisible);
  };

  const handleShowAcceptDialog = (offerId: number) => {
    setId(offerId);
    setTitle('Accept Offer');

    handleDialogVisibility();
  };

  const handleShowRejectDialog = (offerId: number) => {
    setId(offerId);
    setTitle('Reject Offer');

    handleDialogVisibility();
  };

  const handleAccept = () => {
    acceptProductOffer(id);

    handleDialogVisibility();
  };

  const handleReject = () => {
    rejectProductOffer(id);

    handleDialogVisibility();
  };

  // redirect to view product screen
  // useFocusEffect(
  //   React.useCallback(() => {
  //     if (productData.bidder) {
  //       navigation.navigate('SellerViewProductScreen', { id: productData.id });
  //     }
  //   }, [productData, navigation]),
  // );

  return (
    <Container>
      <DialogAcceptOrRejectOffer
        isVisible={isDialogVisible}
        title={title}
        onAccept={handleAccept}
        onDismiss={handleDialogVisibility}
        onReject={handleReject}
      />

      {Boolean(productOfferList.length) && (
        <FlatListOffers
          list={productOfferList}
          onAccept={handleShowAcceptDialog}
          onReject={handleShowRejectDialog}
        />
      )}

      {!productOfferList.length && (
        <EmptyListPlaceHolder icon="pricetags-outline" message="No Offers" />
      )}
    </Container>
  );
};
