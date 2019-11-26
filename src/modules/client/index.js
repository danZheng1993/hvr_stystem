/* eslint-disable import/no-unresolved */
import { Image, View, StyleSheet, Text } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';

import { colors, fonts } from '../../styles';

import HomeView from './Home/HomeContainer';
import PostJob from './PostJob'
import MyPage from './MyPage'
import Providers from './Providers';
import Location from '../../components/Location';
import MediaSearch from './MediaSearch';


const styles = StyleSheet.create({
  tabBarItemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: colors.white,
    paddingHorizontal: 10,
  },
  tabBarIconFocused: {
    tintColor: colors.primary,
    backgroundColor: colors.gray,
    color: colors.black
  },
  headerContainer: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
  headerImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: 70,
  },
  headerCaption: {
    fontFamily: fonts.primaryRegular,
    color: colors.white,
    fontSize: 18,
  },
});

export default createBottomTabNavigator(
  {
    首页: {
      screen: HomeView,
      navigationOptions: {
        header: null,
      },
    },
    发现: {
      screen: Location,
      navigationOptions: {
        
      },
    },
    约拍: {
      screen: PostJob,
      navigationOptions: {
        
      },
    },
    服务: {
      screen: Providers,
      navigationOptions: {
        
      },
    },
    我的: {
      screen: MyPage,
      navigationOptions: {
        
      },
    },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      // eslint-disable-next-line react/prop-types

    }),
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: false,
    tabBarOptions: {
			// activeTintColor: colors.black,
			activeTintColor: colors.black,
			labelStyle: {
				fontSize: 28,
			},
			style: {
				backgroundColor: colors.white,
			},
    },
  },
);
