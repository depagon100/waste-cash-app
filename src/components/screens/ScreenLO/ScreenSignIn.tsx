import { NavigationProp } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import { Container, Logo } from '@/atoms/index';
import { FormSignIn } from '@/molecules/index';

interface Props {
  error: string;
  isLoading: boolean;
  setError: (error: string) => void;
  setLoading: (isLoading: boolean) => void;
  signIn: (params: { username: string; password: string }) => void;
  navigation: NavigationProp<Screens.LoggedOutStackParams>;
}

export const ScreenSignIn: React.FC<Props> = ({
  error,
  setError,
  isLoading,
  navigation,
  setLoading,
  signIn,
}) => {
  const handleNavigateToSignUp = () => {
    navigation.navigate('SignUpScreen');
  };

  React.useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  React.useEffect(() => {
    setError('');
  }, [setError]);

  return (
    <Container>
      <ScrollView
        contentContainerStyle={styles.scrollContentContainer}
        keyboardShouldPersistTaps="handled"
        style={styles.scrollContent}
      >
        <SafeAreaView style={styles.content}>
          <View style={styles.image}>
            <Logo />
          </View>

          <View style={styles.form}>
            <FormSignIn
              error={error}
              isLoading={isLoading}
              onNavigateToSignUp={handleNavigateToSignUp}
              onSignIn={signIn}
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
  image: {
    marginTop: 30,
  },
  scrollContent: {
    flex: 1,
  },
  scrollContentContainer: {
    flexGrow: 1,
  },
});
