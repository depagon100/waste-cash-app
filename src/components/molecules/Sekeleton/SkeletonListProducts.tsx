import React from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from 'react-native-paper';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

export const SkeletonListProducts: React.FC = () => {
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
        { height: 200, key: 1, marginBottom: 30, width: '100%' },
        { height: 200, key: 2, marginBottom: 30, width: '100%' },
        { height: 200, key: 3, marginBottom: 30, width: '100%' },
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
