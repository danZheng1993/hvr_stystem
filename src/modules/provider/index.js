/* eslint-disable import/no-unresolved */
import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';

import { colors, fonts } from '../../styles';

import MyPage from './MyPage';
import JobsList from './jobs/JobsList'

const styles = StyleSheet.create({
  tabBarItemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: colors.white,
    paddingHorizontal: 10,
  },
  tabBarIcon: {
    width: 0,
    height: 0,
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
    接单: {
      screen: JobsList,
      navigationOptions: {
        header: null,
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
      activeTintColor: colors.white,
      inactiveTintColor: colors.primary,
			labelStyle: {
        fontSize: 28,
			},
			style: {
        backgroundColor: colors.secondary,
        justifyContent: 'center'
			},
    },
  },
);
