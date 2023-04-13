import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import ContainerLOSelectRole from '@/containers/ContainerLOSelectRole';
import ContainerLOSignIn from '@/containers/ContainerLOSignIn';
import ContainerLOSignUp from '@/containers/ContainerLOSignUp';

const LoggedoutStack = createStackNavigator<Screens.LoggedOutStackParams>();

export const LoggedOutNavigation: React.FC = () => {
  return (
    <LoggedoutStack.Group>
      <LoggedoutStack.Screen
        component={ContainerLOSelectRole}
        name="SelectRoleScreen"
        options={{ headerShown: false }}
      />

      <LoggedoutStack.Screen
        component={ContainerLOSignIn}
        name="SignInScreen"
        options={{ title: 'Sign In' }}
      />

      <LoggedoutStack.Screen
        component={ContainerLOSignUp}
        name="SignUpScreen"
        options={{ title: 'Sign Up' }}
      />
    </LoggedoutStack.Group>
  );
};
