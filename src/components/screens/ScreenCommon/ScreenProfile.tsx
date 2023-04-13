import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import { Avatar, Colors, Text, Title } from 'react-native-paper';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';

import { Button, Container } from '@/atoms/index';
import { FlatListReviews, FormUpdateUser } from '@/molecules/index';
import { capitalize } from '@/utils/index';

import { UserRoles } from '../../../types';

interface Props {
  isLoading: boolean;
  userData: Objects.User;
  reviewList: Objects.Review[];
  signOut: () => void;
  updateUser: (params: Partial<Objects.User>) => void;
}

export const ScreenProfile: React.FC<Props> = ({
  isLoading,
  userData,
  reviewList,
  signOut,
  updateUser,
}) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'profile', title: 'Profile' },
    { key: 'review', title: 'Reviews' },
  ]);

  const renderProfile = () => (
    <View style={styles.contentWithoutMargin}>
      <FlatList
        data={[{}]}
        renderItem={() => (
          <SafeAreaView style={styles.contentWithoutMargin}>
            <View style={styles.formContainer}>
              <View style={styles.content}>
                <Title>Details</Title>

                <FormUpdateUser
                  isLoading={isLoading}
                  userData={userData}
                  onUpdateUser={updateUser}
                />
              </View>
            </View>

            <View style={styles.content}>
              <Button mode="contained" onPress={signOut}>
                Sign out
              </Button>
            </View>
          </SafeAreaView>
        )}
        style={styles.scrollContent}
      />
    </View>
  );

  const renderReview = () => <FlatListReviews list={reviewList} />;

  const renderScene = SceneMap({
    profile: renderProfile,
    review: renderReview,
  });

  return (
    <Container>
      {userData && (
        <>
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Text style={styles.profile}>Profile Settings</Text>

              <View style={styles.userDetails}>
                <Avatar.Image
                  source={require('../../../assets/images/placeholder-user.png')}
                  style={styles.avatar}
                />
                <View>
                  <Text style={styles.role}>{capitalize(userData.role)}</Text>
                  <Text style={styles.name}>
                    {userData.firstName} {userData.lastName}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {userData.role === UserRoles.SELLER && (
            <TabView
              initialLayout={{ width: layout.width }}
              navigationState={{ index, routes }}
              renderScene={renderScene}
              renderTabBar={(props) => (
                <TabBar
                  {...props}
                  activeColor={Colors.green500}
                  inactiveColor={Colors.black}
                  indicatorStyle={{ backgroundColor: Colors.green500 }}
                  style={{ backgroundColor: Colors.white }}
                />
              )}
              onIndexChange={setIndex}
            />
          )}

          {userData.role !== UserRoles.SELLER && renderProfile()}
        </>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  avatar: {
    marginRight: 20,
  },
  content: {
    flex: 1,
    margin: 20,
  },
  contentWithoutMargin: {
    backgroundColor: Colors.grey200,
    flex: 1,
  },
  form: {
    flex: 1,
    margin: 20,
  },
  formContainer: {
    backgroundColor: Colors.white,
  },
  header: {
    backgroundColor: Colors.green600,
    height: 170,
  },
  headerContent: {
    marginLeft: 20,
    marginTop: 20,
  },
  name: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  profile: {
    color: Colors.white,
    fontSize: 28,
    marginBottom: 20,
  },
  role: {
    color: Colors.white,
    fontSize: 16,
  },
  scrollContent: {
    flex: 1,
  },
  userDetails: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
});
