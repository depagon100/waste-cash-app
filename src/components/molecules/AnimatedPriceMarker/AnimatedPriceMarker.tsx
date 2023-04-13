import React from 'react';
import { Animated, StyleSheet, Text } from 'react-native';

interface Props {
  amount: string;
  selected: any;
  style: any;
}

export const AnimatedPriceMarker: React.FC<Props> = ({
  amount,
  selected,
  style,
}) => {
  const background = selected.interpolate({
    inputRange: [0, 1],
    outputRange: ['#FF5A5F', '#4da2ab'],
  });

  const border = selected.interpolate({
    inputRange: [0, 1],
    outputRange: ['#D23F44', '#007a87'],
  });

  return (
    <Animated.View style={[styles.container, style]}>
      <Animated.View
        style={[
          styles.bubble,
          {
            backgroundColor: background,
            borderColor: border,
          },
        ]}
      >
        <Text style={styles.dollar}>$</Text>
        <Text style={styles.amount}>{amount}</Text>
      </Animated.View>
      <Animated.View style={[styles.arrowBorder, { borderTopColor: border }]} />
      <Animated.View style={[styles.arrow, { borderTopColor: background }]} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  amount: {
    color: '#fff',
    fontSize: 13,
  },
  arrow: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#FF5A5F',
    borderWidth: 4,
    marginTop: -9,
  },
  arrowBorder: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#D23F44',
    borderWidth: 4,
    marginTop: -0.5,
  },
  bubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#FF5A5F',
    borderColor: '#D23F44',
    borderRadius: 3,
    borderWidth: 0.5,
    flex: 0,
    flexDirection: 'row',
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  container: {
    alignSelf: 'flex-start',
    flexDirection: 'column',
  },
  dollar: {
    color: '#fff',
    fontSize: 10,
  },
  selectedArrow: {
    borderTopColor: '#4da2ab',
  },
  selectedArrowBorder: {
    borderTopColor: '#007a87',
  },
  selectedBubble: {
    backgroundColor: '#4da2ab',
    borderColor: '#007a87',
  },
});
