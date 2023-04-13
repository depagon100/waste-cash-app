import * as dateFns from 'date-fns';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Colors, Text } from 'react-native-paper';

import { Button, Input, Select } from '@/atoms/index';

interface Props {
  isLoading: boolean;
  mapData?: Objects.Map;
  onNavigateToSetMap: () => void;
  onSubmit: (params: {
    date: string;
    time: string;
    location: string;
    latitude: string;
    longitude: string;
    mop: string;
  }) => void;
}

export const FormCreateBidderSetup: React.FC<Props> = ({
  isLoading,
  mapData,
  onNavigateToSetMap,
  onSubmit,
}) => {
  const [date, setDate] = React.useState<Date>();
  const [isDatePickerVisible, setIsDatePickerVisible] = React.useState(false);
  const [isTimePickerVisible, setIsTimePickerVisible] = React.useState(false);
  const [location, setLocation] = React.useState('');

  const [options, setOptions] = React.useState([
    { label: 'Cash', value: 'cash' },
    { label: 'GCash', value: 'gcash' },
    { label: 'Bank Transfer', value: 'bank_transfer' },
  ]);
  const [paymentMethod, setPaymentMethod] = React.useState('');
  const [time, setTime] = React.useState<Date>();

  const isSubmitButtonDisabled = !paymentMethod || !date || !time || isLoading;

  const handleDatePickerVisibility = () =>
    setIsDatePickerVisible(!isDatePickerVisible);

  const handleTimePickerVisibility = () =>
    setIsTimePickerVisible(!isTimePickerVisible);

  const handleOnChangeDate = (dateValue: Date) => {
    setDate(dateValue);
    handleDatePickerVisibility();
  };

  const handleNavigateToSetMap = () => onNavigateToSetMap();

  const handleOnChangeTime = (timeValue: Date) => {
    setTime(timeValue);
    handleTimePickerVisibility();
  };

  const handleSubmit = () => {
    onSubmit({
      date: date ? dateFns.format(date, 'MMMM d, Y') : '',
      latitude: `${mapData?.latitude}` || '',
      location: mapData?.streetAddress || '',
      longitude: `${mapData?.longitude}` || '',
      mop: paymentMethod,
      time: time ? dateFns.format(time, 'HH:mm') : '',
    });
  };

  React.useEffect(() => {
    if (mapData?.streetAddress) {
      setLocation(mapData.streetAddress);
    }
  }, [mapData]);

  return (
    <View style={styles.form}>
      <DateTimePicker
        display="default"
        isVisible={isDatePickerVisible}
        minimumDate={new Date()}
        mode="date"
        testID="date-picker"
        onCancel={handleDatePickerVisibility}
        onConfirm={handleOnChangeDate}
      />

      <DateTimePicker
        is24Hour
        display="default"
        isVisible={isTimePickerVisible}
        mode="time"
        testID="time-picker"
        onCancel={handleTimePickerVisibility}
        onConfirm={handleOnChangeTime}
      />

      <View style={styles.inputTextWrapper}>
        <TouchableOpacity onPress={handleNavigateToSetMap}>
          <Input multiline editable={false} label="Location" value={location} />
        </TouchableOpacity>
      </View>

      <View style={styles.inputWrapper}>
        <View style={styles.row}>
          <View style={[styles.rowItemWrapper, styles.rowItemWithMR]}>
            <TouchableOpacity onPress={handleDatePickerVisibility}>
              <Input
                editable={false}
                label="Date"
                value={date ? dateFns.format(date, 'MMMM d, Y') : ''}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.rowItemWrapper}>
            <TouchableOpacity onPress={handleTimePickerVisibility}>
              <Input
                editable={false}
                label="Time"
                value={time ? dateFns.format(time, 'HH:mm') : ''}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.inputTextWrapper}>
        <Select
          items={options}
          placeholder="Select Mode of Payment"
          setItems={setOptions}
          setValue={setPaymentMethod}
          value={paymentMethod}
        />
      </View>

      <View style={styles.buttonWrapper}>
        <Button
          disabled={isSubmitButtonDisabled}
          loading={isLoading}
          onPress={handleSubmit}
        >
          Save
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginBottom: 10,
  },
  buttonWrapper: {
    zIndex: -5,
  },
  form: {
    flex: 1,
    paddingBottom: 50,
  },
  inputTextWrapper: {
    marginBottom: 20,
  },
  inputWrapper: {
    marginBottom: 20,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  rowItemWithMR: {
    marginRight: 20,
  },
  rowItemWrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
