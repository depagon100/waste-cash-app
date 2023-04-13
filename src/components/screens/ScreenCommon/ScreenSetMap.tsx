import { NavigationProp, RouteProp } from '@react-navigation/native';
import React from 'react';
import { Dimensions, PermissionsAndroid, StyleSheet, View } from 'react-native';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker } from 'react-native-maps';
import { Snackbar } from 'react-native-paper';

import { Button, Container } from '@/atoms/index';

interface Props {
  setMapData: (mapData: Objects.Map) => void;
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any>;
}

export const ScreenSetMap: React.FC<Props> = ({
  setMapData,
  navigation,
  route,
}) => {
  const { params } = route;
  const { height, width } = Dimensions.get('window');
  const [isWarningVisible, setIsWarningVisible] = React.useState(false);
  const [geoPosition, setGeoPosition] =
    React.useState<Geolocation.GeoPosition | null>();
  const [address, setAddress] = React.useState('');

  const autoCompleteRef: any = React.useRef();

  const region = React.useMemo(() => {
    return {
      latitude: geoPosition?.coords.latitude || 0,
      latitudeDelta: 0.01,
      longitude: geoPosition?.coords.longitude || 0,
      longitudeDelta: 0.01 * (width / height),
    };
  }, [geoPosition, height, width]);

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

  const handleOnSetMap = () => {
    setMapData({
      latitude: region.latitude,
      longitude: region.longitude,
      streetAddress: address,
    });

    navigation.goBack();
  };

  // identifies default position and address
  React.useEffect(() => {
    const getLocation = async () => {
      const hasPermission = await hasLocationPermission();

      if (!hasPermission) {
        return;
      }

      Geolocation.getCurrentPosition(
        async (position) => {
          setGeoPosition(position);
          const currentLocation = await Geocoder.from({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          if (currentLocation.results.length) {
            setAddress(currentLocation.results[0].formatted_address);
          }
        },
        (error) => {
          setGeoPosition(null);
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

    if (
      typeof params?.currentAddress === 'undefined' ||
      !Object.keys(params?.currentAddress).length
    ) {
      getLocation().catch((error) => console.log(error));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // set default address
  React.useEffect(() => {
    if (
      typeof params?.currentAddress !== 'undefined' &&
      Object.keys(params?.currentAddress).length &&
      !address
    ) {
      autoCompleteRef?.current?.setAddressText(params.currentAddress.location);

      setGeoPosition({
        coords: {
          accuracy: 20,
          altitude: null,
          heading: null,
          latitude: +params.currentAddress.latitude,
          longitude: +params.currentAddress.longitude,
          speed: null,
        },
        timestamp: +new Date(),
      });
    } else if (Boolean(address) && autoCompleteRef?.current) {
      autoCompleteRef?.current?.setAddressText(address);
    }
  }, [autoCompleteRef, address, params]);

  // set address whenever region changed
  React.useEffect(() => {
    if (region.latitude && region.longitude) {
      Geocoder.from({
        latitude: region.latitude,
        longitude: region.longitude,
      }).then((res) => {
        if (res.results.length) {
          setAddress(res.results[0].formatted_address);
        }
      });
    }
  }, [region.latitude, region.longitude]);

  return (
    <Container>
      <Snackbar visible={isWarningVisible} onDismiss={handleWarningVisiblity}>
        Location is currently disabled
      </Snackbar>

      <View style={styles.autoCompleteWrapper}>
        <GooglePlacesAutocomplete
          fetchDetails
          debounce={200}
          minLength={2}
          placeholder="Search"
          query={{
            components: 'country:ph',
            key: 'AIzaSyBNxWWbvboL9bLF7NAPysYvYP54xuNFVec',
            language: 'en',
          }}
          ref={autoCompleteRef}
          onPress={async (data, details) => {
            if (details?.geometry) {
              const newCurrentPosition = {
                coords: {
                  latitude: details?.geometry.location.lat,
                  longitude: details?.geometry.location.lng,
                },
              } as unknown as Geolocation.GeoPosition;

              setGeoPosition(newCurrentPosition);
            }
          }}
        />
      </View>

      <MapView zoomEnabled region={region} style={styles.map}>
        <Marker
          draggable
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
          onDragEnd={async (e) => {
            if (e.nativeEvent?.coordinate) {
              const newCurrentPosition = {
                coords: {
                  latitude: e.nativeEvent.coordinate.latitude,
                  longitude: e.nativeEvent.coordinate.longitude,
                },
              } as unknown as Geolocation.GeoPosition;

              setGeoPosition(newCurrentPosition);

              const currentLocation = await Geocoder.from({
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
              });

              if (currentLocation.results.length) {
                setAddress(currentLocation.results[0].formatted_address);
              }
            }
          }}
        />
      </MapView>

      <View style={styles.buttonWrapper}>
        <Button
          disabled={!address || params?.currentAddress === address}
          onPress={handleOnSetMap}
        >
          Set
        </Button>
      </View>
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
  buttonWrapper: {
    bottom: 10,
    elevation: 3,
    paddingHorizontal: 15,
    position: 'absolute',
    width: '100%',
    zIndex: 100,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height: '75%',
    marginTop: 70,
  },
});
