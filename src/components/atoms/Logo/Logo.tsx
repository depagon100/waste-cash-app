import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

export const Logo: React.FC = () => (
  <View
    style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}
  >
    <Image
      source={require('../../../assets/images/logo.png')}
      style={{
        alignItems: 'center',
        height: 200,
        justifyContent: 'center',
        width: 200,
      }}
    />
  </View>
);
