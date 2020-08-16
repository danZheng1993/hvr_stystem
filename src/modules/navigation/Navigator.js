import React from 'react';
import {View} from 'react-native'
// import AuthScreen from '../containers/AuthScreen';
import AppNavigator from './RootNavigation';
import { colors } from '../../styles';

export default function NavigatorView() {
  return  (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <AppNavigator />
    </View>
  )
}
