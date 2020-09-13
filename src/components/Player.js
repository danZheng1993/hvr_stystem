import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import Video360 from '@uscsf/react-native-video360';
import { get } from 'lodash';
import { useNavigationState } from '@react-navigation/native';

import constants from '../constants'

const getRouteParam = (state) => {
  const { index, routes } = state;
  return get(routes, `[${index}].params`, {});
}

export default () => {
  const { url } = useNavigationState(getRouteParam);
  return (
    <View style={{ flex: 1, backgroundColor: '#3f3f3f' }}>
      <Video360
        source={{ uri: constants.MEDIA_BASE_URL + url }}
        style={{ flex: 1}}
      />
    </View>
  )
}
