/* eslint-disable import/no-unresolved */
import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';

import { colors, fonts } from '../../styles';

import MyPage from './MyPage';
import JobsList from './jobs/JobsList'

export default createBottomTabNavigator(
  {
    接单: {
      screen: JobsList,
      navigationOptions: {
        title: '接 单',
      },
    },
    我的: {
      screen: MyPage,
      navigationOptions: {
        title: '我 的'
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
      activeTintColor: colors.white,
      inactiveTintColor: colors.primary,
      labelStyle: {
        fontSize: 20,
      },
			tabBarItemContainer: {
        justifyContent: 'center',
        alignItems: 'center'
			},
			style: {
        backgroundColor: colors.secondary,
        padding: 10,
        justifyContent: 'center',
        alignItems :'center'
			},
    },
  },
);
