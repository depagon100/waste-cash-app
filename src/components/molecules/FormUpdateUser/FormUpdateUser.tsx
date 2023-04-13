import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors, TextInput } from 'react-native-paper';

import { Button, Input } from '@/atoms/index';
import { UserRoles } from '@/constants/index';

interface Props {
  isLoading: boolean;
  userData: Objects.User;
  onUpdateUser: (params: Partial<Objects.User>) => void;
}

export const FormUpdateUser: React.FC<Props> = ({
  isLoading,
  userData,
  onUpdateUser,
}) => {
  const [junkShopName, setJunkShopName] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [city, setCity] = React.useState('');
  const [zip, setZip] = React.useState('');
  const [phone, setPhone] = React.useState('');

  const inputFirstName: any = React.useRef();
  const inputLastName: any = React.useRef();
  const inputAddress: any = React.useRef();
  const inputCity: any = React.useRef();
  const inputZip: any = React.useRef();
  const inputPhone: any = React.useRef();
  const inputEmail: any = React.useRef();

  const isJunkShop = userData.role === UserRoles.JUNKSHOP;

  const isFirstNameUpdated = firstName !== userData.firstName;
  const isLastNameUpdated = lastName !== userData.lastName;
  const isAddressUpdated = address !== userData.address;
  const isCityUpdated = city !== userData.city;
  const isZipUpdated = zip !== userData.zip;
  const isPhoneUpdated = phone !== userData.phone;
  const isAnyFieldUpdated =
    isFirstNameUpdated ||
    isLastNameUpdated ||
    isAddressUpdated ||
    isCityUpdated ||
    isZipUpdated ||
    isPhoneUpdated;

  const isSaveButtonDisabled = !isAnyFieldUpdated || isLoading;

  // Handle changes
  const handleJunkShopNameChange = (text: string) => {
    setJunkShopName(text);
  };
  const handleFirstNameChange = (text: string) => {
    setFirstName(text);
  };
  const handleLastNameChange = (text: string) => {
    setLastName(text);
  };
  const handleAddressChange = (text: string) => {
    setAddress(text);
  };
  const handleCityChange = (text: string) => {
    setCity(text);
  };
  const handleZipChange = (text: string) => {
    setZip(text);
  };
  const handlePhoneChange = (text: string) => {
    setPhone(text);
  };

  // handle submit editting
  const handleJunkShopNameSubmitEditing = () => {
    inputFirstName.current.focus();
  };
  const handleFirstNameSubmitEditing = () => {
    inputLastName.current.focus();
  };
  const handleLastNameSubmitEditing = () => {
    inputAddress.current.focus();
  };
  const handleAddressSubmitEditing = () => {
    inputCity.current.focus();
  };
  const handleCitySubmitEditing = () => {
    inputZip.current.focus();
  };
  const handleZipSubmitEditing = () => {
    inputPhone.current.focus();
  };
  const handlePhoneSubmitEditing = () => {
    inputEmail.current.focus();
  };

  // update user
  const handleUpdateUser = () => {
    onUpdateUser({
      address,
      city,
      firstName,
      lastName,
      phone,
      zip,
    });
  };

  React.useEffect(() => {
    if (userData) {
      setFirstName(userData?.firstName);
      setLastName(userData?.lastName);
      setAddress(userData?.address);
      setCity(userData?.city);
      setZip(userData?.zip);
      setPhone(userData?.phone);
    }
  }, []);

  return (
    <View style={styles.form}>
      <View>
        {isJunkShop && (
          <View style={styles.inputWrapper}>
            <Input
              label="Junk Shop Name"
              placeholder="Your Junk Shop Name"
              returnKeyType="next"
              value={junkShopName}
              onChangeText={handleJunkShopNameChange}
              onSubmitEditing={handleJunkShopNameSubmitEditing}
            />
          </View>
        )}

        {/* first and last name */}
        <View style={styles.inputWrapper}>
          <View style={styles.row}>
            <View style={[styles.rowItemWrapper, styles.rowItemWithMR]}>
              <Input
                innerRef={inputFirstName}
                label="First Name"
                placeholder="Your First Name"
                returnKeyType="next"
                value={firstName}
                onChangeText={handleFirstNameChange}
                onSubmitEditing={handleFirstNameSubmitEditing}
              />
            </View>
            <View style={styles.rowItemWrapper}>
              <Input
                innerRef={inputLastName}
                label="Last Name"
                placeholder="Your Last Name"
                returnKeyType="next"
                value={lastName}
                onChangeText={handleLastNameChange}
                onSubmitEditing={handleLastNameSubmitEditing}
              />
            </View>
          </View>
        </View>

        {/* address */}
        <View style={styles.inputWrapper}>
          <Input
            innerRef={inputAddress}
            label="Address"
            placeholder="Your Address"
            returnKeyType="next"
            value={address}
            onChangeText={handleAddressChange}
            onSubmitEditing={handleAddressSubmitEditing}
          />
        </View>

        {/* city and zip code */}
        <View style={styles.inputWrapper}>
          <View style={styles.row}>
            <View style={[styles.rowItemWrapper, styles.rowItemWithMR]}>
              <Input
                innerRef={inputCity}
                label="City"
                placeholder="Your City"
                returnKeyType="next"
                value={city}
                onChangeText={handleCityChange}
                onSubmitEditing={handleCitySubmitEditing}
              />
            </View>
            <View style={styles.rowItemWrapper}>
              <Input
                innerRef={inputZip}
                keyboardType="number-pad"
                label="Zip Code"
                maxLength={5}
                placeholder="Your Zip Code"
                returnKeyType="next"
                value={zip}
                onChangeText={handleZipChange}
                onSubmitEditing={handleZipSubmitEditing}
              />
            </View>
          </View>
        </View>

        {/* phone */}
        <View style={styles.inputWrapper}>
          <Input
            innerRef={inputPhone}
            keyboardType="number-pad"
            label="Phone Number"
            left={<TextInput.Affix text="+63" />}
            maxLength={10}
            placeholder="Your Phone Number"
            returnKeyType="next"
            value={phone}
            onChangeText={handlePhoneChange}
            onSubmitEditing={handlePhoneSubmitEditing}
          />
        </View>
      </View>

      <Button
        disabled={isSaveButtonDisabled}
        loading={isLoading}
        style={styles.button}
        onPress={handleUpdateUser}
      >
        {isLoading ? 'Loading' : 'Save'}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginBottom: 10,
  },
  form: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  inputWrapper: {
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
  },
  rowItemWithMR: {
    marginRight: 20,
  },
  rowItemWrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  signUpLabel: {
    color: Colors.green500,
  },
  textError: {
    color: Colors.red900,
  },
});
