import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Colors, Title } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import BottomSheet from 'react-native-raw-bottom-sheet';

import { Button, Input } from '@/atoms/index';

interface Props {
  innerRef: any;
  isLoading: boolean;
  isSuccess: boolean;
  onCreateReview: (params: { rate: number; feedback?: string }) => void;
  onCancel: () => void;
  onClose?: () => void;
}

export const BottomSheetMapRate: React.FC<Props> = ({
  innerRef,
  isLoading,
  isSuccess,
  onCreateReview,
  onCancel,
  onClose,
}) => {
  const [rating, setRating] = React.useState(0);
  const [feedback, setFeedback] = React.useState('');

  const isCancelButtonDisabled = isLoading || isSuccess;
  const isSubmitButtonDisabled = !rating || isLoading || isSuccess;

  const handleFeedbackChange = (text: string) => setFeedback(text);

  const handleRatingChange = (rate: number) => setRating(rate);

  const handleCreateRating = () => {
    onCreateReview({ feedback, rate: rating });
  };

  const renderLoading = (): React.ReactNode => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator />
    </View>
  );

  return (
    <BottomSheet
      animationType="slide"
      closeOnDragDown={false}
      closeOnPressMask={false}
      height={isLoading ? 200 : 400}
      ref={innerRef}
      onClose={onClose}
    >
      {Boolean(isLoading) && renderLoading()}

      {!isLoading && !isSuccess && (
        <View style={styles.bottomSheetContent}>
          <Title>Rate Seller</Title>

          <View style={styles.startContainer}>
            <Rating startingValue={0} onFinishRating={handleRatingChange} />
          </View>

          <View style={styles.inputWrapper}>
            <Input
              multiline
              blurOnSubmit={false}
              label="Feedback"
              numberOfLines={4}
              placeholder="Give your feedback"
              returnKeyType="next"
              style={styles.textArea}
              onChangeText={handleFeedbackChange}
            />
          </View>

          <View style={styles.buttons}>
            <View style={styles.buttonContainer}>
              <Button
                color={Colors.white}
                disabled={isCancelButtonDisabled}
                style={styles.cancelButton}
                onPress={onCancel}
              >
                Cancel
              </Button>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                disabled={isSubmitButtonDisabled}
                labelStyle={styles.offerButtonLabel}
                onPress={handleCreateRating}
              >
                Submit
              </Button>
            </View>
          </View>
        </View>
      )}
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  bottomSheetContent: {
    margin: 20,
  },
  buttonContainer: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    flexGrow: 1,
    marginTop: 20,
  },
  cancelButton: {
    marginRight: 20,
  },
  cancelButtonLabel: {
    color: Colors.green500,
  },
  inputWrapper: {
    marginBottom: 15,
  },
  loadingContainer: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    flex: 1,
    justifyContent: 'center',
  },
  offerButtonLabel: {
    color: Colors.white,
  },
  offerPrice: {
    fontSize: 20,
    marginBottom: 15,
    marginTop: 15,
  },
  startContainer: {
    marginBottom: 20,
    marginTop: 40,
  },
  textArea: {
    justifyContent: 'flex-start',
    minHeight: 80,
    textAlignVertical: 'top',
  },
});
