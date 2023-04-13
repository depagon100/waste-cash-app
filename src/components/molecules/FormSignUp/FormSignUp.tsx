import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors, HelperText, TextInput } from 'react-native-paper';

import { Button, Input, PasswordInput } from '@/atoms/index';
import { UserRoles } from '@/constants/index';
import { isValidEmail } from '@/utils/index';
interface Props {
  error: string;
  isLoading: boolean;
  role: UserRoles;
  onSignUp: (params: Omit<Objects.User, 'id'>) => void;
}

export const FormSignUp: React.FC<Props> = ({
  error,
  role,
  isLoading,
  onSignUp,
}) => {
  const [junkShopName, setJunkShopName] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [city, setCity] = React.useState('');
  const [zip, setZip] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const inputFirstName: any = React.useRef();
  const inputLastName: any = React.useRef();
  const inputAddress: any = React.useRef();
  const inputCity: any = React.useRef();
  const inputZip: any = React.useRef();
  const inputPhone: any = React.useRef();
  const inputEmail: any = React.useRef();
  const inputUsername: any = React.useRef();
  const inputPassword: any = React.useRef();
  const inputConfirmPassword: any = React.useRef();

  const isJunkShop = role === UserRoles.JUNKSHOP;
  const isSamePassword = confirmPassword && password === confirmPassword;

  const isSignUpButtonDisabled =
    (isJunkShop && !junkShopName) ||
    (Boolean(email) && !isValidEmail(email)) ||
    !firstName ||
    !lastName ||
    !address ||
    !city ||
    !zip ||
    !phone ||
    !email ||
    !username ||
    !password ||
    !isSamePassword ||
    isLoading;

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
  const handleEmailChange = (text: string) => {
    setEmail(text);
  };
  const handlUsernameChange = (text: string) => {
    setUsername(text);
  };
  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };
  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
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
  const handleEmailSubmitEditing = () => {
    inputUsername.current.focus();
  };
  const handleUsernameSubmitEditing = () => {
    inputPassword.current.focus();
  };
  const handlePasswordSubmitEditing = () => {
    inputConfirmPassword.current.focus();
  };
  const handleConfirmPasswordSubmitEditing = () => {
    handleSignUp();
  };

  // sign up
  const handleSignUp = () => {
    if (isSignUpButtonDisabled) {
      return;
    }

    onSignUp({
      address,
      city,
      email,
      firstName,
      lastName,
      password,
      phone,
      role: `${role}`,
      username,
      zip,
      ...(junkShopName && { junkShopName }),
    });
  };

  return (
    <View style={styles.form}>
      <View style={styles.inputTextContainer}>
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

        {/* email */}
        <View style={styles.inputWrapper}>
          <Input
            error={(Boolean(email) && !isValidEmail(email)) || Boolean(error)}
            innerRef={inputEmail}
            label="Email"
            placeholder="Your Email"
            returnKeyType="next"
            value={email}
            onChangeText={handleEmailChange}
            onSubmitEditing={handleEmailSubmitEditing}
          />
          {Boolean(email) && !isValidEmail(email) && (
            <HelperText visible type="error">
              Email address is invalid
            </HelperText>
          )}

          {Boolean(error) && (
            <HelperText visible type="error">
              {error}
            </HelperText>
          )}
        </View>

        {/* username */}
        <View style={styles.inputWrapper}>
          <Input
            innerRef={inputUsername}
            label="Username"
            placeholder="Your Username"
            returnKeyType="next"
            value={username}
            onChangeText={handlUsernameChange}
            onSubmitEditing={handleUsernameSubmitEditing}
          />
        </View>

        {/* password */}
        <View style={styles.inputWrapper}>
          <PasswordInput
            innerRef={inputPassword}
            label="Password"
            placeHolder="Your Password"
            returnKeyType="next"
            onChangeText={handlePasswordChange}
            onSubmitEditing={handlePasswordSubmitEditing}
          />
        </View>

        {/* confirm password */}
        <PasswordInput
          error={Boolean(confirmPassword) && !isSamePassword}
          innerRef={inputConfirmPassword}
          label="Confirm Password"
          placeHolder="Confirm your Password"
          returnKeyType="done"
          onChangeText={handleConfirmPasswordChange}
          onSubmitEditing={handleConfirmPasswordSubmitEditing}
        />
        {Boolean(confirmPassword) && !isSamePassword && (
          <HelperText visible type="error">
            Password does not match
          </HelperText>
        )}
      </View>

      <Button
        disabled={isSignUpButtonDisabled}
        loading={isLoading}
        style={styles.button}
        onPress={handleSignUp}
      >
        {isLoading ? 'Loading' : 'Sign Up'}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginBottom: 10,
  },
  form: {
    flex: 1,
  },
  inputTextContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    marginBottom: 15,
  },
  row: {
    flex: 1,
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
