import React from 'react';
import {View} from 'react-native'
// import AuthScreen from '../containers/AuthScreen';
import AppNavigator from './RootNavigation';
import { colors } from '../../styles';

export default function NavigatorView() {
  // if (authState.isLoggedIn || authState.hasSkippedLogin) {
  //     return <AppNavigator />;
  // }
  // return <AuthScreen />;

  return  (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {/* <View style={{height: 50, backgroundColor: colors.secondary}}></View> */}
      <AppNavigator />
    </View>
  )
}
