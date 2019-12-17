/* eslint-disable import/no-unresolved */
import React from 'react';

import { Image, View, StyleSheet, Text } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';

import { colors, fonts } from '../../styles';

import HomeView from './Home/HomeContainer';
import PostJob from './PostJob'
import MyPage from './MyPage'
import Providers from './Providers';
import MediaSearch from './MediaSearch';
import Icon from 'react-native-vector-icons/FontAwesome';
const iconImage = require('../../../assets/images/vr.png');

const styles = StyleSheet.create({
  tabBarItemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  tabBarIconFocused: {
    color: colors.white
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
      screen: MediaSearch,
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
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconSource;
        switch (routeName) {
          case '首页':
            iconSource = "home";
            break;
          case '发现':
            iconSource = "eye";
            break;
          case '约拍':
            iconSource = "";
            break;
          case '服务':
            iconSource = "heart-o";
            break;
          case '我的':
            iconSource = "user-o";
            break;
          default:
            iconSource = "";
        }
        return (
          <View style={styles.tabBarItemContainer}>
            {iconSource ?
            <Icon
              style={styles.demoIcon}
              name={iconSource}
              size={30}
              color={colors.primary}
              style={[styles.tabBarIcon, focused && styles.tabBarIconFocused]}
            /> :
            <View style={{borderRadius:100, backgroundColor: colors.primary, borderWidth:3, borderColor: colors.white, width: 60, height: 60, marginBottom: 30}}>
              <Image
                resizeMode="cover"
                source={iconImage}
                style={{width:60, height: 60, borderRadius: 25}}
              />
            </View>
            }
          </View>
        );
      },
    }),
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
    tabBarOptions: {
      activeTintColor: colors.white,
      inactiveTintColor: colors.primary,
      showLabel: true,
      style: {
        backgroundColor: colors.secondary,
      },
    },
  },
);
