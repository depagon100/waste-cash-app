import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import { Colors, Avatar, Title, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { IUser, SellerStackParam } from '../../../types';

interface Props {
  userData: IUser;
  navigation: NavigationProp<SellerStackParam>;
}

export const ScreenSellerProfile: React.FC<Props> = ({
  userData,
  navigation,
}) => {
  const handleProfileSettingsNavigation = React.useCallback(
    () => navigation.navigate('SellerProfileSettings'),
    [navigation],
  );

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.headerSection}>
          <View style={styles.iconsWrapper}>
            <Icon
              name="cog-outline"
              color={Colors.white}
              size={32}
              onPress={handleProfileSettingsNavigation}
            />
          </View>
        </View>
        <View style={styles.profileSection}>
          <View style={styles.avatarWrapper}>
            <Avatar.Image
              source={require('../../../assets/images/default-user.png')}
            />
          </View>

          <View style={styles.textWrapper}>
            <Title style={styles.nameText}>
              {userData.firstName} {userData.lastName}
            </Title>
            <Text style={styles.roleText}>{userData.role.toUpperCase()}</Text>
          </View>
        </View>
      </View>
      <View style={styles.row} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.grey200,
  },
  row: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  headerSection: {
    height: 55,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: Colors.green400,
  },
  iconsWrapper: {
    flexDirection: 'row',
    marginRight: 20,
  },
  profileSection: {
    height: 80,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.green400,
  },
  avatarWrapper: {
    marginLeft: 20,
  },
  textWrapper: {
    marginLeft: 20,
  },
  nameText: {
    color: Colors.white,
    marginBottom: 0,
  },
  roleText: {
    color: Colors.white,
  },
});
