import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from 'react-native-paper';

interface Props {
  amount: string;
}

export const PriceMarker: React.FC<Props> = ({ amount }) => {
  return (
    <View style={[styles.container]}>
      <View style={[styles.bubble]}>
        <Text style={styles.amount}>{amount}</Text>
      </View>
    </View>
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
    backgroundColor: Colors.green600,
    borderColor: Colors.grey500,
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
