import { NavigationProp } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Button, Container, Logo } from '@/atoms/index';
import { UserRoles } from '@/constants/index';

interface Props {
  setRole: (role: UserRoles) => void;
  navigation: NavigationProp<Screens.LoggedOutStackParams>;
}

export const ScreenSelectRole: React.FC<Props> = ({ navigation, setRole }) => {
  const handleNavigateToBuyerLogin = () => {
    setRole(UserRoles.BUYER);

    navigation.navigate('SignInScreen');
  };

  const handleNavigateToJunkShopLogin = () => {
    setRole(UserRoles.JUNKSHOP);

    navigation.navigate('SignInScreen');
  };

  const handleNavigateToSellerLogin = () => {
    setRole(UserRoles.SELLER);

    navigation.navigate('SignInScreen');
  };

  return (
    <Container>
      <View style={styles.image}>
        <Logo />
      </View>
      <View style={styles.buttons}>
        <Button
          mode="contained"
          style={styles.button}
          onPress={handleNavigateToSellerLogin}
        >
          Seller
        </Button>

        <Button
          mode="contained"
          style={styles.button}
          onPress={handleNavigateToBuyerLogin}
        >
          Buyer
        </Button>

        <Button
          mode="contained"
          style={styles.button}
          onPress={handleNavigateToJunkShopLogin}
        >
          Junk Shop
        </Button>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  button: {
    marginBottom: 30,
  },
  buttons: {
    flex: 1,
    margin: 20,
  },
  image: {
    marginTop: 100,
  },
});
