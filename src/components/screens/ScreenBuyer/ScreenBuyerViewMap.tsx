import { NavigationProp, RouteProp } from '@react-navigation/native';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Paragraph, Text, Title } from 'react-native-paper';

import { Container } from '@/atoms/index';
import {
  AppbarViewMap,
  BottomSheetMapRate,
  BottomSheetMapViewOffer,
  DialogSuccess,
} from '@/molecules/index';

interface Props {
  isLoading: boolean;
  success: string;
  productData: Objects.Product;
  createProductReview: (params: { rate: number; feedback?: string }) => void;
  setProductReviewSuccess: (message: string) => void;
  route: RouteProp<Screens.BuyerStackParams, 'BuyerViewMap'>;
}

export const ScreenBuyerViewMap: React.FC<Props> = ({
  isLoading,
  productData,
  success,
  createProductReview,
  setProductReviewSuccess,
  route,
}) => {
  const { bidderSetup } = productData;
  const { height, width } = Dimensions.get('window');

  const [isDialogVisible, setIsDialogVisible] = React.useState(false);
  const bottomSheetViewOffer: any = React.useRef();
  const bottomSheetRate: any = React.useRef();

  const region = {
    latitude: +(bidderSetup?.address?.latitude || 0),
    latitudeDelta: 0.001,
    longitude: +(bidderSetup?.address?.longitude || 0),
    longitudeDelta: 0.001 * (width / height),
  };

  const handleOpenBottomSheetViewOffer = () => {
    bottomSheetViewOffer.current.open();
  };

  const handleCloseBottomSheetViewOffer = () => {
    bottomSheetViewOffer.current.close();
  };

  const handleOpenBottomSheetRate = () => {
    bottomSheetRate.current.open();
  };

  const handleCloseBottomSheetRate = () => {
    bottomSheetRate.current.close();
  };

  const handleOnCloseBottomSheetRate = () => {
    if (success) {
      handleDialogVisibility();
    }
  };

  const handleDialogVisibility = () => {
    // clear success message
    if (isDialogVisible && success) {
      setProductReviewSuccess('');
    }

    setIsDialogVisible(!isDialogVisible);
  };

  // close bottom sheet when product offer creation succeed
  React.useEffect(() => {
    if (success) {
      handleCloseBottomSheetRate();
    }
  }, [success]);

  return (
    <Container>
      <DialogSuccess
        isVisible={isDialogVisible}
        message={success}
        onDismissDialog={handleDialogVisibility}
      />

      <MapView zoomEnabled region={region} style={styles.map}>
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
        />
      </MapView>

      <View style={styles.content}>
        <Title>{bidderSetup?.address?.location}</Title>
        <View style={styles.descriptions}>
          <Paragraph style={styles.text}>
            <Text style={styles.bold}>Date:</Text> {bidderSetup?.date}
          </Paragraph>
          <Paragraph style={styles.text}>
            <Text style={styles.bold}>Time:</Text> {bidderSetup?.time}
          </Paragraph>
          <Paragraph style={styles.text}>
            <Text style={styles.bold}>Mode of Payment:</Text> {bidderSetup?.mop}
          </Paragraph>
        </View>
      </View>

      <AppbarViewMap
        isRateExisting={Boolean(productData?.review)}
        onOffer={handleOpenBottomSheetViewOffer}
        onRate={handleOpenBottomSheetRate}
      />

      <BottomSheetMapViewOffer
        innerRef={bottomSheetViewOffer}
        productOffer={productData?.offer}
        onCancel={handleCloseBottomSheetViewOffer}
      />

      <BottomSheetMapRate
        innerRef={bottomSheetRate}
        isLoading={isLoading}
        isSuccess={Boolean(success)}
        onCancel={handleCloseBottomSheetRate}
        onClose={handleOnCloseBottomSheetRate}
        onCreateReview={createProductReview}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  autoCompleteWrapper: {
    elevation: 3,
    paddingHorizontal: 15,
    position: 'absolute',
    top: 10,
    width: '100%',
    zIndex: 100,
  },
  bold: {
    fontWeight: 'bold',
  },
  buttonWrapper: {
    bottom: 10,
    elevation: 3,
    paddingHorizontal: 15,
    position: 'absolute',
    width: '100%',
    zIndex: 100,
  },
  content: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    marginTop: '60%',
  },
  descriptions: {
    marginTop: 15,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height: '40%',
  },
  text: {
    fontSize: 16,
  },
});
