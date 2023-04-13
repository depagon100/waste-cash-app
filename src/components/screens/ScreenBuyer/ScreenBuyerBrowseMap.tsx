import { NavigationProp } from '@react-navigation/native';
import React from 'react';
import {
  Animated,
  Dimensions,
  Image,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker } from 'react-native-maps';
import { Card, Colors, Paragraph, Subheading } from 'react-native-paper';

import { Container } from '@/atoms/index';
import { PriceMarker } from '@/molecules/index';
import { formatPrice, isPointNear, summarizeText } from '@/utils/index';

const { height, width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;
const CARD_HEIGHT = 220;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

interface Props {
  productList: Objects.Product[];
  navigation: NavigationProp<Screens.BuyerStackParams>;
}

export const ScreenBuyerBrowseMap: React.FC<Props> = ({
  productList,
  navigation,
}) => {
  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  const [markId, setMarkId] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isWarningVisible, setIsWarningVisible] = React.useState(false);
  const [geoPosition, setGeoPosition] =
    React.useState<Geolocation.GeoPosition | null>();

  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);

  const list = productList.filter((product) => {
    return isPointNear({
      centerPoint: {
        lat: geoPosition?.coords.latitude || 0,
        lng: geoPosition?.coords.longitude || 0,
      },
      checkPoint: {
        lat: product.address?.latitude || 0,
        lng: product.address?.longitude || 0,
      },
      km: 2,
    });
  });

  const region = React.useMemo(() => {
    return {
      latitude: geoPosition?.coords.latitude || 0,
      latitudeDelta: 0.01,
      longitude: geoPosition?.coords.longitude || 0,
      longitudeDelta: 0.01 * (width / height),
    };
  }, [geoPosition]);

  const handleWarningVisiblity = () => setIsWarningVisible(!isWarningVisible);

  const hasLocationPermission = async () => {
    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      handleWarningVisiblity();

      return false;
    }
  };

  const handleMarkerPress = (mapEventData: any) => {
    const markerID = mapEventData._targetInst.return.key;

    console.log(markerID);

    setMarkId(markerID);

    const part1 = markerID * CARD_WIDTH;
    const part2 = markerID * 20;
    let x = part1 + part2;

    if (Platform.OS === 'ios') {
      x = x - SPACING_FOR_CARD_INSET;
    }

    (_scrollView.current as any).scrollTo({ animated: true, x, y: 0 });
  };

  const handleNavigateToViewProduct = (id: number) => {
    navigation.navigate('BuyerViewProductScreen', { id });
  };

  // identify current position
  React.useEffect(() => {
    setIsLoading(true);

    const getLocation = async () => {
      const hasPermission = await hasLocationPermission();

      if (!hasPermission) {
        console.log('No permission');
        return;
      }

      Geolocation.getCurrentPosition(
        async (position) => {
          console.log('current position');
          console.log(position);

          setGeoPosition(position);

          setIsLoading(false);
        },
        (error) => {
          console.log('cant find');
          setGeoPosition(null);

          setIsLoading(false);
        },
        {
          accuracy: {
            android: 'high',
            ios: 'best',
          },
          distanceFilter: 0,
          enableHighAccuracy: true,
          forceLocationManager: true,
          forceRequestLocation: true,
          maximumAge: 10000,
          showLocationDialog: false,
          timeout: 15000,
        },
      );
    };

    getLocation().catch((error) => console.log(error));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //
  React.useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      // animate 30% away from landing on the next item
      let index = Math.floor(value / CARD_WIDTH + 0.3);
      if (index >= productList.length) {
        index = productList.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          mapIndex = index;
          const coordinate = productList[index].address;
          if ((_map?.current as any)?.animateToRegion) {
            (_map.current as any).animateToRegion(
              {
                ...coordinate,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01 * (width / height),
              },
              350,
            );
          }
        }
      }, 10);

      clearTimeout(regionTimeout);
    });
  }, []);

  return (
    <View style={styles.container}>
      {isLoading && null}
      {!isLoading && Boolean(geoPosition) && (
        <>
          <MapView
            initialRegion={region}
            provider={'google'}
            ref={_map}
            style={styles.map}
          >
            {list.map((product, index) => {
              if (product?.address?.latitude && product?.address?.longitude) {
                return (
                  <Marker
                    coordinate={{
                      latitude: Number(product.address?.latitude),
                      longitude: Number(product.address?.longitude),
                    }}
                    draggable={false}
                    key={index}
                    onPress={handleMarkerPress}
                  >
                    <PriceMarker amount={String(formatPrice(product.price))} />
                  </Marker>
                );
              }
            })}
          </MapView>

          <Animated.ScrollView
            horizontal
            pagingEnabled
            // eslint-disable-next-line react-native/no-inline-styles
            contentContainerStyle={{
              paddingHorizontal:
                Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0,
            }}
            contentInset={{
              bottom: 0,
              left: SPACING_FOR_CARD_INSET,
              right: SPACING_FOR_CARD_INSET,
              top: 0,
            }}
            ref={_scrollView}
            scrollEnabled={false}
            scrollEventThrottle={1}
            showsHorizontalScrollIndicator={false}
            snapToAlignment="center"
            snapToInterval={CARD_WIDTH + 20}
            style={styles.scrollView}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      x: mapAnimation,
                    },
                  },
                },
              ],
              { useNativeDriver: true },
            )}
          >
            {list.map((product) => {
              if (product?.address?.latitude && product?.address?.longitude) {
                return (
                  <Card
                    elevation={10}
                    key={product.id}
                    style={styles.card}
                    onPress={() => handleNavigateToViewProduct(product?.id)}
                  >
                    <Card.Title
                      subtitle={`${product.category.name} - ${formatPrice(
                        product.price,
                      )}`}
                      title={product.name}
                    />
                    <Card.Cover source={{ uri: product.thumbnail }} />
                  </Card>
                );
              }
            })}
          </Animated.ScrollView>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    height: CARD_HEIGHT,
    marginHorizontal: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    width: CARD_WIDTH,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    backgroundColor: 'transparent',
    ...StyleSheet.absoluteFillObject,
  },
  price: {
    marginRight: 15,
  },
  scrollView: {
    bottom: 0,
    left: 0,
    paddingVertical: 10,
    position: 'absolute',
    right: 0,
  },
});
