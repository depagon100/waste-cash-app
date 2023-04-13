import * as dateFns from 'date-fns';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';

import { Button, Input, Select } from '@/atoms/index';

interface Props {
  bidderSetup?: Objects.BidderSetup;
  isLoading: boolean;
  mapData?: Objects.Map;
  onNavigateToSetMap: () => void;
  onSubmit: (params: {
    date?: string;
    time?: string;
    address?: {
      location?: string;
      latitude?: string;
      longitude?: string;
    };
    mop?: string;
  }) => void;
}

export const FormUpdateBidderSetup: React.FC<Props> = ({
  bidderSetup,
  isLoading,
  mapData,
  onNavigateToSetMap,
  onSubmit,
}) => {
  const [date, setDate] = React.useState<Date>();
  const [isDatePickerVisible, setIsDatePickerVisible] = React.useState(false);
  const [isTimePickerVisible, setIsTimePickerVisible] = React.useState(false);
  const [location, setLocation] = React.useState('');
  const [paymentMethod, setPaymentMethod] = React.useState('');
  const [time, setTime] = React.useState<Date>();
  const [options, setOptions] = React.useState([
    { label: 'Cash', value: 'cash' },
    { label: 'GCash', value: 'gcash' },
    { label: 'Bank Transfer', value: 'bank_transfer' },
  ]);

  const isLocationUpdated = bidderSetup?.address.location !== location;
  const isDateUpdated =
    date && bidderSetup?.date !== dateFns.format(date, 'MMMM d, Y');
  const isTimeUpdated =
    time && bidderSetup?.time !== dateFns.format(time, 'HH:mm');
  const isMOPUpdated = paymentMethod && bidderSetup?.mop !== paymentMethod;

  const isAnyFieldUpdated =
    isLocationUpdated || isDateUpdated || isTimeUpdated || isMOPUpdated;

  const isSubmitButtonDisabled = !isAnyFieldUpdated || isLoading;

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
      ...(isLocationUpdated && {
        address: {
          latitude: `${mapData?.latitude}` || '',
          location: mapData?.streetAddress || '',
          longitude: `${mapData?.longitude}` || '',
        },
      }),
      ...(isDateUpdated && {
        date: date ? dateFns.format(date, 'MMMM d, Y') : '',
      }),
      ...(isTimeUpdated && {
        time: time ? dateFns.format(time, 'HH:mm') : '',
      }),
      ...(isMOPUpdated && {
        mop: paymentMethod,
      }),
    });
  };

  React.useEffect(() => {
    if (mapData?.streetAddress) {
      setLocation(mapData.streetAddress);
    }
  }, [mapData]);

  React.useEffect(() => {
    if (bidderSetup) {
      const splittedTime = bidderSetup?.time?.split(':');
      let hours = 0;
      let minutes = 0;

      if (splittedTime.length) {
        hours = +splittedTime[0];
        minutes = +splittedTime[1];
      }

      setLocation(bidderSetup.address.location);
      setDate(new Date(bidderSetup.date));
      setTime(dateFns.set(new Date(bidderSetup.date), { hours, minutes }));
      setPaymentMethod(bidderSetup.mop);
    }
  }, [bidderSetup]);

  return (
    <View style={styles.form}>
      <DateTimePicker
        date={date}
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
          Update
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
