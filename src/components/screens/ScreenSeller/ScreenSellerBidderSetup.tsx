import { NavigationProp } from '@react-navigation/native';
import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';

import { Container } from '@/atoms/index';
import {
  AppBarBidderSetup,
  DialogSuccess,
  FormCreateBidderSetup,
  FormUpdateBidderSetup,
} from '@/molecules/index';

interface Props {
  isLoading: boolean;
  mapData?: Objects.Map;
  productData: Objects.Product;
  success: string;
  clearMapData: () => void;
  createProductBidderSetup: (params: {
    date: string;
    time: string;
    location: string;
    latitude: string;
    longitude: string;
    mop: string;
  }) => void;
  setBidderSetupSuccess: (success: string) => void;
  updateProductBidderSetup: (params: {
    date?: string;
    time?: string;
    address?: {
      location?: string;
      latitude?: string;
      longitude?: string;
    };
    mop?: string;
  }) => void;
  navigation: NavigationProp<Screens.SellerStackParams>;
}

export const ScreenSellerBidderSetup: React.FC<Props> = ({
  isLoading,
  mapData,
  productData,
  success,
  clearMapData,
  createProductBidderSetup,
  setBidderSetupSuccess,
  updateProductBidderSetup,
  navigation,
}) => {
  const [isDialogVisible, setIsDialogVisible] = React.useState(false);
  const [isInitialized, setIsInitialized] = React.useState(false);

  const handleDialogVisibility = React.useCallback(() => {
    if (isDialogVisible) {
      setBidderSetupSuccess('');
    }

    setIsDialogVisible(!isDialogVisible);
  }, [isDialogVisible, setBidderSetupSuccess, setIsDialogVisible]);

  const handleNavigateToConversation = () => {
    if (productData.bidder) {
      navigation.navigate('SellerViewConversationScreen', {
        recipient: productData.bidder,
      });
    }
  };

  const handleNavigateToSetMap = () => {
    navigation.navigate('SellerSetMap', {
      ...((productData?.bidderSetup?.address || mapData) && {
        currentAddress: {
          latitude:
            productData?.bidderSetup?.address.latitude ||
            (mapData?.latitude as number),
          location:
            productData?.bidderSetup?.address.location ||
            mapData?.streetAddress ||
            '',
          longitude:
            productData?.bidderSetup?.address.longitude ||
            (mapData?.longitude as number),
        },
      }),
    });
  };

  React.useEffect(() => {
    clearMapData();

    setBidderSetupSuccess('');
    setIsInitialized(true);
  }, [clearMapData, setBidderSetupSuccess]);

  // open dialog for successfull bidder setup creation
  React.useEffect(() => {
    if (success) {
      setIsDialogVisible(true);
    }
  }, [success]);

  return (
    <Container>
      <DialogSuccess
        isVisible={isDialogVisible}
        message={success}
        onDismissDialog={handleDialogVisibility}
      />

      <FlatList
        data={[{}]}
        renderItem={() => (
          <SafeAreaView style={styles.content}>
            {isInitialized && !productData.bidderSetup && (
              <FormCreateBidderSetup
                isLoading={isLoading}
                mapData={mapData}
                onNavigateToSetMap={handleNavigateToSetMap}
                onSubmit={createProductBidderSetup}
              />
            )}

            {isInitialized && productData.bidderSetup && (
              <FormUpdateBidderSetup
                bidderSetup={productData?.bidderSetup}
                isLoading={isLoading}
                mapData={mapData}
                onNavigateToSetMap={handleNavigateToSetMap}
                onSubmit={updateProductBidderSetup}
              />
            )}
          </SafeAreaView>
        )}
        style={styles.scrollContent}
      />
      <AppBarBidderSetup onChat={handleNavigateToConversation} />
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    margin: 20,
  },
  scrollContent: {
    flex: 1,
  },
});
