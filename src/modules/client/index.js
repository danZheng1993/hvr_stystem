/* eslint-disable import/no-unresolved */
import React from 'react';

import { Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';

import { colors, fonts } from '../../styles';

import HomeView from './Home/HomeContainer';
import PostJob from './PostJob'
import MyPage from './MyPage'
import Providers from './Providers';
import MediaSearch from './MediaSearch';

const iconPost = require('../../../assets/images/post.png');
const iconHome = require('../../../assets/images/home.png');
const iconEye = require('../../../assets/images/eye.png');
const iconUser = require('../../../assets/images/user.png');
const iconHeart = require('../../../assets/images/heart-o.png');

const styles = StyleSheet.create({
  tabBarItemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  tabBarIcon: {
    width: 23,
    height: 23,
    tintColor: colors.primary
  },
  tabBarIconFocused: {
    tintColor: colors.white
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
      tabBarItemContainer: ({focused}) => {
        console.warn('a')
      },
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconSource;
        switch (routeName) {
          case '首页':
            iconSource = iconHome;
            break;
          case '发现':
            iconSource = iconEye;
            break;
          case '约拍':
            iconSource = iconPost;
            break;
          case '服务':
            iconSource = iconHeart;
            break;
          case '我的':
            iconSource = iconUser;
            break;
          default:
            iconSource = iconPost;
        }
        return (
          <View style={styles.tabBarItemContainer}>
            {iconSource !== iconPost
              ? <Image
                  resizeMode="contain"
                  source={iconSource}
                  style={[styles.tabBarIcon, focused && styles.tabBarIconFocused]}
                />
              : <TouchableOpacity onPress={() => {navigation.navigate('PostJob')}}>
                  <Image
                    resizeMode="cover"
                    source={iconPost}
                    style={{width:50, height: 50, marginBottom: 20}}
                  />
              </TouchableOpacity>
            }
          </View>
        );
      },
    }),
    tabBarPosition: 'bottom',
    animationEnabled: true,
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
