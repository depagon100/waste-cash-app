import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { TextInput, Subheading, Button, Colors } from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import * as ImagePicker from 'react-native-image-picker';

import { ProductStatus, ICategory } from '../../../types';

interface Props {
  error: string;
  success: string;
  categoryList: ICategory[];
  isCreateProductLoading: boolean;
  onBrowseProductNavigate: () => void;
  onCreateProduct: (params: {
    photo: any;
    name: string;
    category: string;
    description: string;
    price: number;
    status: ProductStatus;
  }) => void;
}

export const FormCreateProduct: React.FC<Props> = ({
  error,
  success,
  categoryList,
  isCreateProductLoading,
  onBrowseProductNavigate,
  onCreateProduct,
}) => {
  const [assets, setAssets] = React.useState<any>([]);
  const [name, setName] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [isDropdownVisible, setIsDropdownVisible] = React.useState(false);

  const inputPrice: any = React.useRef();

  const categories = React.useMemo(() => {
    return categoryList.map((categoryItem) => ({
      label: categoryItem.name,
      value: categoryItem.name,
    }));
  }, [categoryList]);

  const isSubmitButtonDisabled = React.useMemo(
    () =>
      !assets.length ||
      !name ||
      !category ||
      !description ||
      isCreateProductLoading,
    [assets, name, category, description, isCreateProductLoading],
  );

  const handleChoosePhoto = () => {
    ImagePicker.launchImageLibrary(
      {
        maxHeight: 220,
        maxWidth: 200,
        selectionLimit: 1,
        mediaType: 'photo',
        includeBase64: true,
        includeExtra: false,
      },
      (response) => {
        setAssets(response.assets);
      },
    );
  };

  const handleNameChange = React.useCallback(
    (text: string) => setName(text),
    [setName],
  );

  const handleCategoryChange = React.useCallback(
    (text: string) => setCategory(text),
    [setCategory],
  );

  const handleDescriptionChange = React.useCallback(
    (text: string) => setDescription(text),
    [setDescription],
  );

  const handlePriceChange = React.useCallback(
    (text: string) => setPrice(text),
    [setPrice],
  );

  const handleToggleDropdown = React.useCallback(
    () => setIsDropdownVisible(!isDropdownVisible),
    [setIsDropdownVisible, isDropdownVisible],
  );

  const handleSubmit = React.useCallback(() => {
    onCreateProduct({
      photo: assets[0],
      name,
      category,
      description,
      price: +price,
      status: ProductStatus.UNSOLD,
    });

    inputPrice.current.blur();
  }, [onCreateProduct, assets, name, category, description, price]);

  const handleBrowseProductNavigate = React.useCallback(
    () => onBrowseProductNavigate(),
    [onBrowseProductNavigate],
  );

  const handleClearForm = React.useCallback(() => {
    handleNameChange('');
    handleCategoryChange('');
    handleDescriptionChange('');
    handlePriceChange('');
  }, [
    handleNameChange,
    handleCategoryChange,
    handleDescriptionChange,
    handlePriceChange,
  ]);

  // clear form is success
  React.useEffect(() => {
    if (success) {
      handleClearForm();
    }
  }, [success, handleClearForm]);

  return (
    <View style={styles.form}>
      <View style={styles.inputTextContainer}>
        {Boolean(assets?.length) &&
          assets?.map((asset: any) => {
            return (
              <Image
                resizeMode="cover"
                resizeMethod="scale"
                style={styles.photo}
                source={{ uri: asset.uri }}
                key={asset.uri}
              />
            );
          })}
        <Button
          mode="contained"
          onPress={handleChoosePhoto}
          style={styles.button}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}
        >
          Choose Photo
        </Button>
        <TextInput
          mode="outlined"
          returnKeyType="done"
          label="Name"
          placeholder="Sample Product Name"
          blurOnSubmit={false}
          error={Boolean(error)}
          value={name}
          onChangeText={handleNameChange}
          style={styles.inputText}
        />

        <View style={styles.dropdownContainer}>
          <DropDown
            mode="outlined"
            label="Category"
            visible={isDropdownVisible}
            showDropDown={handleToggleDropdown}
            onDismiss={handleToggleDropdown}
            setValue={handleCategoryChange}
            value={category}
            list={categories}
            dropDownContainerHeight={40}
            dropDownContainerMaxHeight={40}
          />
        </View>

        <TextInput
          mode="outlined"
          returnKeyType="next"
          label="Description"
          placeholder="Describe your product"
          blurOnSubmit={false}
          multiline
          numberOfLines={4}
          error={Boolean(error)}
          value={description}
          onChangeText={handleDescriptionChange}
          style={styles.textArea}
        />

        <TextInput
          mode="outlined"
          keyboardType="numeric"
          returnKeyType="next"
          label="Price"
          blurOnSubmit={false}
          error={Boolean(error)}
          value={`${price}`}
          onChangeText={handlePriceChange}
          onSubmitEditing={handleSubmit}
          ref={inputPrice}
          style={styles.inputText}
          left={<TextInput.Affix text={'\u20B1'} />}
        />

        {Boolean(error) && (
          <Subheading style={styles.textError}>{error}</Subheading>
        )}
      </View>

      <Button
        mode="contained"
        onPress={handleSubmit}
        disabled={isSubmitButtonDisabled}
        loading={isCreateProductLoading}
        style={styles.button}
        contentStyle={styles.buttonContent}
        labelStyle={styles.buttonLabel}
      >
        {isCreateProductLoading ? 'Loading' : 'Submit'}
      </Button>

      <Button
        mode="contained"
        color={Colors.white}
        onPress={handleBrowseProductNavigate}
        disabled={isCreateProductLoading}
        style={styles.button}
        contentStyle={styles.buttonContent}
        labelStyle={styles.cancelLabel}
      >
        Cancel
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
  },
  photo: {
    height: 220,
    marginBottom: 20,
  },
  inputTextContainer: {
    marginBottom: 20,
  },
  inputText: {
    marginBottom: 15,
    height: 50,
  },
  dropdownContainer: {
    marginBottom: 15,
  },
  textArea: {
    marginBottom: 15,
    minHeight: 80,
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
  },
  textError: {
    color: Colors.red900,
  },
  button: {
    marginBottom: 10,
  },
  buttonContent: {
    height: 50,
  },
  buttonLabel: {
    color: Colors.white,
  },
  cancelLabel: {
    color: Colors.green500,
  },
  divider: {
    marginBottom: 10,
  },
});
