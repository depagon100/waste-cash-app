import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import { View, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { Colors } from 'react-native-paper';

import { ProductStatus, ICategory, SellerStackParam } from '../../../types';
import { DialogCreateProductSuccess } from '@molecules/DialogCreateProductSuccess/DialogCreateProductSuccess';
import { FormCreateProduct } from '@molecules/FormCreateProduct/FormCreateProduct';
import { SkeletonCreateProduct } from '@molecules/SkeletonSeller/SkeletonCreateProduct';

interface Props {
  productError: string;
  productSuccess: string;
  categoryList: ICategory[];
  isCategoryLoading: boolean;
  isProductLoading: boolean;
  onCreateProduct: (params: {
    photo: any;
    name: string;
    category: string;
    description: string;
    price: number;
    status: ProductStatus;
  }) => void;
  onGetCategoryList: () => void;
  onSetProductSuccess: (message: string | null) => void;
  navigation: NavigationProp<SellerStackParam>;
}

export const ScreenSellerCreateProduct: React.FC<Props> = ({
  productError,
  productSuccess,
  categoryList,
  isCategoryLoading,
  isProductLoading,
  onCreateProduct,
  onGetCategoryList,
  onSetProductSuccess,
  navigation,
}) => {
  const [isDialogProductSuccessVisible, setIsDialogProductSuccessVisible] =
    React.useState(false);

  const handleGetCategoryList = React.useCallback(() => {
    onGetCategoryList();
  }, [onGetCategoryList]);

  const handleDismissDialogProductSuccess = React.useCallback(() => {
    setIsDialogProductSuccessVisible(false);

    onSetProductSuccess(null);
  }, [onSetProductSuccess]);

  const handleBrowseProductNavigate = React.useCallback(() => {
    navigation.navigate('SellerHome');
  }, [navigation]);

  // Get Category List
  React.useEffect(() => {
    handleGetCategoryList();
  }, [handleGetCategoryList]);

  // Show Dialog Product Success
  React.useEffect(() => {
    if (productSuccess) {
      setIsDialogProductSuccessVisible(true);
    }
  }, [productSuccess]);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollContent}
        contentContainerStyle={styles.scrollContentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <SafeAreaView style={styles.content}>
          <DialogCreateProductSuccess
            success={productSuccess}
            isVisible={isDialogProductSuccessVisible}
            onDismissDialog={handleDismissDialogProductSuccess}
          />

          {isCategoryLoading && <SkeletonCreateProduct />}

          {!isCategoryLoading && (
            <FormCreateProduct
              categoryList={categoryList}
              error={productError}
              success={productSuccess}
              isCreateProductLoading={isProductLoading}
              onBrowseProductNavigate={handleBrowseProductNavigate}
              onCreateProduct={onCreateProduct}
            />
          )}
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grey200,
  },
  scrollContent: {
    flex: 1,
  },
  scrollContentContainer: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    margin: 20,
  },
});
