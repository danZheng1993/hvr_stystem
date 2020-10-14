/* eslint-disable import/no-unresolved */
import React from 'react';

import { Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { colors, fonts } from '../../styles';

import PostIcon from '../../../assets/images/post.png';
import HomeIcon from '../../../assets/images/home.png';
import EyeIcon from '../../../assets/images/eye.png';
import UserIcon from '../../../assets/images/user.png';
import HeartIcon from '../../../assets/images/heart-o.png';

import HomeView from './Home/HomeView';
import PostJob from './PostJob'
import MyPage from './MyPage'
import Providers from './Providers';
import MediaSearch from './MediaSearch';
import { isIphoneX } from '../../helpers';

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

const TabBarIcon = ({ focused, noTint, source, width = 23, height = 23 }) => (
  <Image
    resizeMode="contain"
    source={source}
    width={width}
    height={height}
    style={[!noTint && styles.tabBarIcon, { width, height, marginBottom: 8 }, !noTint && focused && styles.tabBarIconFocused]}
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
        paddingBottom: isIphoneX() ? 24 : 4,
        paddingTop: 12,
        height: isIphoneX() ? 86 : 60,
      },
    }}
  >
    <BottomTab.Screen
      name="首页"
      component={HomeView}
      options={{ tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} source={HomeIcon} /> }}
    />
    <BottomTab.Screen
      name="发现"
      component={MediaSearch}
      options={{ tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} source={EyeIcon} /> }}
    />
    <BottomTab.Screen
      name="约拍"
      component={PostJob}
      options={{ tabBarIcon: ({ focused }) => (
        <View style={{ position: 'absolute', top: -30 }}>
          <TabBarIcon noTint source={PostIcon} width={48} height={48} />
        </View>
      )}}
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
      options={{ tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} source={HeartIcon} /> }}
    />
    <BottomTab.Screen
      name="我的"
      component={MyPage}
      options={{ tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} source={UserIcon} /> }}
    />
  </BottomTab.Navigator>
);
