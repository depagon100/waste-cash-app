import React from 'react';
import { Avatar, Card } from 'react-native-paper';

interface Props {
  shop: Objects.User;
}

export const CardShop: React.FC<Props> = ({ shop }) => (
  <Card>
    <Card.Title
      left={(props) => (
        <Avatar.Text
          {...props}
          label={`${shop.firstName[0]}${shop.lastName[0]}`}
        />
      )}
      subtitle={`@${shop.username}`}
      title={shop.junkShopName}
    />
  </Card>
);
