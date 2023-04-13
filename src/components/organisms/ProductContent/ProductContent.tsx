import React from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { Chip, Colors, Paragraph, Subheading, Title } from 'react-native-paper';

import { Button, MessageBox } from '@/atoms/index';
import { DialogDeleteProduct } from '@/molecules/index';
import { formatPrice } from '@/utils/index';

interface Props {
  product: Objects.Product;
  showActions?: boolean;
  onDeleteProduct?: () => void;
}

export const ProductContent: React.FC<Props> = ({
  product,
  showActions,
  onDeleteProduct,
}) => {
  const [isDialogVisible, setIsDialogVisible] = React.useState(false);

  const handleDialogVisibility = () => setIsDialogVisible(!isDialogVisible);

  const handleDeleteproduct = () => {
    if (onDeleteProduct) {
      onDeleteProduct();
    }

    handleDialogVisibility();
  };

  return (
    <>
      <Image source={{ uri: product.thumbnail }} style={styles.imageCover} />
      <View style={styles.categoryContent}>
        <Chip
          mode="outlined"
          textStyle={styles.chipLabelStyle}
          onPress={() => {}}
        >
          {product.category.name}
        </Chip>
      </View>

      <View style={styles.productDetails}>
        <View style={styles.messageBox}>
          {showActions && Boolean(product.deletedAt) && (
            <MessageBox
              message="This product is already deleted!"
              type="error"
            />
          )}

          {!showActions && product.status === 'sold' && (
            <MessageBox
              message="This product is no longer available!"
              type="error"
            />
          )}
        </View>

        <Title>{product.name}</Title>
        <Subheading>{formatPrice(product.price)}</Subheading>

        <View style={styles.description}>
          <Paragraph>{product.description}</Paragraph>
        </View>

        {showActions && product.status === 'unsold' && !product.deletedAt && (
          <Button style={styles.button} onPress={handleDialogVisibility}>
            Delete
          </Button>
        )}
      </View>

      <View style={styles.randomBlock} />

      <DialogDeleteProduct
        isVisible={isDialogVisible}
        onAccept={handleDeleteproduct}
        onDismiss={handleDialogVisibility}
      />
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 50,
  },
  categoryContent: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
  chipLabelStyle: {
    color: Colors.green400,
  },
  description: {
    marginTop: 20,
  },
  imageCover: {
    height: 200,
    width: '100%',
  },
  messageBox: {
    marginBottom: 10,
    marginTop: 10,
  },
  productDetails: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 15,
  },
  randomBlock: {
    height: 60,
  },
});
