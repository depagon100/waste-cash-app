import { NavigationProp } from '@react-navigation/native';
import axios, { AxiosError } from 'axios';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import { Container, Logo } from '@/atoms/index';
import { UserRoles } from '@/constants/index';
import { DialogSignIn, FormSignUp } from '@/molecules/index';
import { Auth } from '@/services/index';

interface Props {
  role: UserRoles;
  navigation: NavigationProp<Screens.LoggedOutStackParams>;
}

export const ScreenSignUp: React.FC<Props> = ({ role, navigation }) => {
  const [error, setError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDialogVisible, setIsDialogVisible] = React.useState(false);

  const handleSignUp = (params: Omit<Objects.User, 'id'>) => {
    setError('');
    setIsLoading(true);

    Auth.register(params)
      .then(() => {
        setIsDialogVisible(true);
      })
      .catch((apiError) => {
        if (axios.isAxiosError(apiError)) {
          if (apiError?.response) {
            const axiosError = apiError?.response as Objects.ServiceError;
            if (axiosError?.status && axiosError.status === 400) {
              setError(axiosError.data.message);
            }
          }
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleNavigateToSignIn = () => {
    navigation.navigate('SignInScreen');
  };

  return (
    <Container>
      <ScrollView
        contentContainerStyle={styles.scrollContentContainer}
        keyboardShouldPersistTaps="handled"
        style={styles.scrollContent}
      >
        <SafeAreaView style={styles.content}>
          <DialogSignIn
            isVisible={isDialogVisible}
            onSignInNavigation={handleNavigateToSignIn}
          />

          <View style={styles.form}>
            <FormSignUp
              error={error}
              isLoading={isLoading}
              role={role}
              onSignUp={handleSignUp}
            />
          </View>
        </SafeAreaView>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    margin: 20,
  },
  form: {
    flex: 1,
  },
  scrollContent: {
    flex: 1,
  },
  scrollContentContainer: {
    flexGrow: 1,
  },
});
