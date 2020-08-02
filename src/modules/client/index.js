/* eslint-disable import/no-unresolved */
import React from 'react';

import { Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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

const BottomTab = createBottomTabNavigator();

const TabBarIcon = ({ focused, source, width = 23, height = 23 }) => (
  <Image
    resizeMode="contain"
    source={source}
    style={[styles.tabBarIcon, { width, height }, focused && styles.tabBarIconFocused]}
  />
)

export default () => (
  <BottomTab.Navigator
    tabBarOptions={{
      activeTintColor: colors.white,
      inactiveTintColor: colors.primary,
      showLabel: true,
      style: {
        backgroundColor: colors.secondary,
      },
    }}
  >
    <BottomTab.Screen
      name="首页"
      component={HomeView}
      options={{ tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} source={iconHome} /> }}
    />
    <BottomTab.Screen
      name="发现"
      component={MediaSearch}
      options={{ tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} source={iconEye} /> }}
    />
    <BottomTab.Screen
      name="约拍"
      component={PostJob}
      options={{ tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} source={iconPost} width={50} height={50} /> }}
      listeners={({ navigation }) => ({
        tabPress: (e) => {
          e.preventDefault();
          navigation.navigate('PostJob');
        }
      })}
    />
    <BottomTab.Screen
      name="服务"
      component={Providers}
      options={{ tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} source={iconHeart} /> }}
    />
    <BottomTab.Screen
      name="我的"
      component={MyPage}
      options={{ tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} source={iconUser} /> }}
    />
  </BottomTab.Navigator>
);
