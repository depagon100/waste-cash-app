import React from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from 'react-native-paper';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

export const SkeletonViewProduct: React.FC = () => {
  return (
    <SkeletonContent
      isLoading
      animationDirection="horizontalLeft"
      animationType="pulse"
      boneColor={Colors.grey500}
      containerStyle={styles.skeleton}
      duration={3000}
      highlightColor={Colors.grey400}
      layout={[
        { height: 200, key: 1, marginBottom: 20, width: '100%' },
        {
          borderRadius: 30,
          height: 30,
          key: 2,
          marginBottom: 15,
          marginLeft: 20,
          width: 150,
        },
        {
          height: 40,
          key: 3,
          marginBottom: 10,
          marginLeft: 20,
          width: '70%',
        },
        {
          height: 30,
          key: 4,
          marginBottom: 30,
          marginLeft: 20,
          width: '50%',
        },
        {
          height: 30,
          key: 5,
          marginBottom: 10,
          marginLeft: 20,
          width: '90%',
        },
        {
          height: 30,
          key: 6,
          marginBottom: 10,
          marginLeft: 20,
          width: '90%',
        },
        {
          height: 30,
          key: 7,
          marginBottom: 10,
          marginLeft: 20,
          width: '60%',
        },
        {
          height: 30,
          key: 8,
          marginBottom: 10,
          marginLeft: 20,
          width: '80%',
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  skeleton: {
    flex: 1,
    width: '100%',
  },
});
