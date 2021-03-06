/* eslint-disable import/no-unresolved */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { colors, fonts } from '../../styles';

import MyPage from './MyPage';
import JobsList from './jobs/JobsList'
import { isIphoneX } from '../../helpers';

const BottomTab = createBottomTabNavigator();

export default () => (
  <BottomTab.Navigator
    tabBarOptions={{
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
        justifyContent: 'center',
        alignItems :'center',
        height: 64,
        paddingBottom: isIphoneX() ? 24 : 16,
			},
    }}
  >
    <BottomTab.Screen name='接单' component={JobsList} options={{ title: '接 单' }} />
    <BottomTab.Screen name='我的' component={MyPage} options={{ title: '我 的' }} />
  </BottomTab.Navigator>
);
