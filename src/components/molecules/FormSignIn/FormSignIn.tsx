import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors, Divider, Text } from 'react-native-paper';

import { Button, Input, PasswordInput } from '@/atoms/index';
interface Props {
  error: string;
  isLoading: boolean;
  onNavigateToSignUp: () => void;
  onSignIn: (params: { username: string; password: string }) => void;
}

export const FormSignIn: React.FC<Props> = ({
  error,
  isLoading,
  onNavigateToSignUp,
  onSignIn,
}) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const inputPassword: any = React.useRef();

  const isSignInButtonDisabled = !username || !password || isLoading;

  const handleUsernameChange = (text: string) => {
    setUsername(text);
  };

  const handleUsernameSubmitEditing = () => {
    inputPassword.current.focus();
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  const handleNavigateToSignUp = () => {
    onNavigateToSignUp();
  };

  const handleSignIn = () => {
    onSignIn({ password, username });
  };

  return (
    <View style={styles.form}>
      <View style={styles.inputTextContainer}>
        <View style={styles.inputWrapper}>
          <Input
            error={Boolean(error)}
            label="Email or Username"
            placeholder="Your Email or Username"
            returnKeyType="next"
            value={username}
            onChangeText={handleUsernameChange}
            onSubmitEditing={handleUsernameSubmitEditing}
          />
        </View>

        <PasswordInput
          error={Boolean(error)}
          innerRef={inputPassword}
          label="Password"
          placeHolder="Your Password"
          returnKeyType="done"
          onChangeText={handlePasswordChange}
        />
      </View>

      <Button
        disabled={isSignInButtonDisabled}
        loading={isLoading}
        style={styles.button}
        onPress={handleSignIn}
      >
        {isLoading ? 'Loading' : 'Sign In'}
      </Button>

      <Divider style={styles.divider} />

      <Button color={Colors.white} onPress={handleNavigateToSignUp}>
        Sign Up
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginBottom: 10,
  },
  divider: {
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
  signUpLabel: {
    color: Colors.green500,
  },
  textError: {
    color: Colors.red900,
  },
});
