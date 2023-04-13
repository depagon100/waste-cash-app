import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Paragraph, Subheading } from 'react-native-paper';

import { formatPrice, summarizeText } from '@/utils/index';

interface Props {
  product: Objects.Product;
}

export const CardProduct: React.FC<Props> = ({ product }) => (
  <Card>
    <Card.Cover source={{ uri: product.thumbnail }} />
    <Card.Title
      right={(props) => (
        <Subheading {...props}>{formatPrice(product.price)}</Subheading>
      )}
      rightStyle={styles.price}
      subtitle={product.category.name}
      title={product.name}
    />
    <Card.Content>
      <Paragraph>{summarizeText(product.description)}</Paragraph>
    </Card.Content>
  </Card>
);

const styles = StyleSheet.create({
  price: {
    marginRight: 15,
  },
});
