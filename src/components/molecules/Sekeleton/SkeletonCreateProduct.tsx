import React from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from 'react-native-paper';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

export const SkeletonCreateProduct: React.FC = () => {
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
        { height: 50, key: 1, marginBottom: 20, width: '100%' },
        { height: 60, key: 2, marginBottom: 20, width: '100%' },
        { height: 100, key: 3, marginBottom: 20, width: '100%' },
        { height: 50, key: 4, marginBottom: 20, width: '100%' },
        { height: 40, key: 5, marginBottom: 20, width: '100%' },
        { height: 40, key: 6, marginBottom: 20, width: '100%' },
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
