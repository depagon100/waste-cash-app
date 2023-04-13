import { Colors } from 'react-native-paper';

export const extractNotificationDetails = (
  notification: Objects.Notification,
) => {
  const isRejected = notification.event.includes('rejected');

  return {
    iconColor: isRejected ? Colors.red700 : Colors.green700,
  };
};
