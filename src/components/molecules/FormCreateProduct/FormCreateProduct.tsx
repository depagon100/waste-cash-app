import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import { Colors, TextInput } from 'react-native-paper';

import { Button, Input, Select } from '@/atoms/index';
import { ProductStatus } from '@/constants/index';

interface Props {
  categories: Objects.Category[];
  isLoading: boolean;
  mapData?: Objects.Map;
  onCancel: () => void;
  onNavigateToSetMap: () => void;
  onSubmit: (
    params: Partial<Omit<Objects.Product, 'category'>> & {
      category: string;
      photo: any;
    },
  ) => void;
}

export const FormCreateProduct: React.FC<Props> = ({
  categories,
  isLoading,
  mapData,
  onCancel,
  onNavigateToSetMap,
  onSubmit,
}) => {
  const [assets, setAssets] = React.useState<any>([]);
  const [name, setName] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [options, setOptions] = React.useState<
    {
      label: string;
      value: string;
    }[]
  >([]);
  const [price, setPrice] = React.useState('');
  const [location, setLocation] = React.useState('');

  const isCreateProductButtonDisabled =
    isLoading || !name || !category || !description || !price || !assets.length;

  const handleChooseImage = () => {
    ImagePicker.launchImageLibrary(
      {
        includeBase64: true,
        includeExtra: false,
        maxHeight: 220,
        maxWidth: 200,
        mediaType: 'photo',
        selectionLimit: 1,
      },
      (response) => {
        setAssets(response.assets);
      },
    );
  };

  const handleDescriptionChange = (text: string) => {
    setDescription(text);
  };

  const handleNameChange = (text: string) => {
    setName(text);
  };

  const handlePriceChange = (text: string) => {
    setPrice(text);
  };

  const handleNavigateToSetMap = () => onNavigateToSetMap();

  const handleSubmit = () => {
    onSubmit({
      ...(mapData && {
        address: {
          latitude: mapData.latitude,
          location: mapData.streetAddress,
          longitude: mapData.longitude,
        },
      }),
      category,
      description,
      name,
      photo: assets[0],
      price: +price,
      status: ProductStatus.UNSOLD,
    });
  };

  React.useEffect(() => {
    setOptions(
      categories.map((item) => ({
        label: item.name,
        value: item.name,
      })),
    );
  }, [categories]);

  React.useEffect(() => {
    if (mapData?.streetAddress) {
      setLocation(mapData.streetAddress);
    }
  }, [mapData]);

  return (
    <View style={styles.form}>
      <View style={styles.inputTextContainer}>
        {Boolean(assets?.length) &&
          assets?.map((asset: any) => {
            return (
              <Image
                key={asset.uri}
                resizeMethod="scale"
                resizeMode="cover"
                source={{ uri: asset.uri }}
                style={styles.image}
              />
            );
          })}

        <Button style={styles.button} onPress={handleChooseImage}>
          Choose Image
        </Button>

        <View style={styles.inputWrapper}>
          <Input
            label="Name"
            placeholder="Your Product Name"
            returnKeyType="done"
            value={name}
            onChangeText={handleNameChange}
          />
        </View>

        <View style={styles.inputWrapper}>
          {/* <DropDown
            dropDownContainerHeight={options.length * 50}
            dropDownContainerMaxHeight={options.length * 50 + 50}
            label="Category"
            list={options}
            mode="outlined"
            setValue={handleCategoryChange}
            showDropDown={handleDropdownVisibility}
            value={category}
            visible={isDropdownVisible}
            onDismiss={handleDropdownVisibility}
          /> */}
          <Select
            items={options}
            setItems={setOptions}
            setValue={setCategory}
            value={category}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Input
            multiline
            blurOnSubmit={false}
            label="Description"
            numberOfLines={4}
            placeholder="Describe your product"
            returnKeyType="next"
            style={styles.textArea}
            value={description}
            onChangeText={handleDescriptionChange}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Input
            keyboardType="numeric"
            label="Price"
            left={<TextInput.Affix text={'\u20B1'} />}
            placeholder="Your Product Price"
            returnKeyType="next"
            value={price}
            onChangeText={handlePriceChange}
          />
        </View>

        <View style={styles.inputWrapper}>
          <TouchableOpacity onPress={handleNavigateToSetMap}>
            <Input
              multiline
              editable={false}
              label="Location"
              value={location}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Button
        disabled={isCreateProductButtonDisabled}
        loading={isLoading}
        style={styles.button}
        onPress={handleSubmit}
      >
        {isLoading ? 'Loading' : 'Submit'}
      </Button>

      <Button color={Colors.white} onPress={onCancel}>
        Cancel
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginBottom: 10,
  },
  form: {
    flex: 1,
  },
  image: {
    height: 220,
    marginBottom: 20,
  },
  inputTextContainer: {
    marginBottom: 10,
  },
  inputWrapper: {
    marginBottom: 15,
  },
  signUpLabel: {
    color: Colors.green500,
  },
  textArea: {
    justifyContent: 'flex-start',
    minHeight: 80,
    textAlignVertical: 'top',
  },
  textError: {
    color: Colors.red900,
  },
});
