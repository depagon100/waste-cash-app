import React from 'react';
import { StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Colors } from 'react-native-paper';

interface Props {
  items: { label: string; value: string }[];
  placeholder?: string;
  value: string;
  setItems: React.Dispatch<
    React.SetStateAction<{ label: string; value: string }[]>
  >;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export const Select: React.FC<Props> = ({
  items,
  placeholder,
  value,
  setItems,
  setValue,
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <DropDownPicker
      dropDownContainerStyle={styles.dropdownContent}
      items={items}
      open={open}
      placeholder={placeholder}
      setItems={setItems}
      setOpen={setOpen}
      setValue={setValue}
      style={[
        styles.dropdown,
        open ? styles.openDropdown : styles.closeDropdown,
      ]}
      textStyle={styles.textStyle}
      value={value}
    />
  );
};

const styles = StyleSheet.create({
  closeDropdown: {
    borderColor: Colors.grey700,
  },
  dropdown: {
    backgroundColor: Colors.grey100,
    borderRadius: 4,
    height: 60,
  },
  dropdownContent: {
    backgroundColor: Colors.grey100,
    borderColor: Colors.green500,
    borderRadius: 4,
  },
  openDropdown: {
    borderColor: Colors.green500,
  },
  textStyle: {
    fontSize: 16,
  },
});
