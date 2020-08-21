import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
// import Video360 from 'react-native-video360plugin';
import Video360 from '@uscsf/react-native-video360';
import { get } from 'lodash';

import { colors } from '../styles';
import constants from '../constants'

export default class Player extends React.Component {
  constructor(props) {
    super(props)
    this.state= {
      path: 'default.mp4'
    }
  }
  componentWillMount() {
    const routeParams = get(this.props, 'route.params', {});
    const { url: path = 'default.mp4' } = routeParams;
    this.setState({path})
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#3f3f3f' }}>
        <Video360
          // source={require("./default.mp4")}
          source={{ uri: constants.MEDIA_BASE_URL + this.state.path }}
          style={{ flex: 1}}
        />
      </View>
    );
  }
}