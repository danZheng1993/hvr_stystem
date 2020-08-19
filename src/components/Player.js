import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import Video360 from 'react-native-video360plugin';
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
        <Video360 urlVideo={constants.MEDIA_BASE_URL + this.state.path} modeVideo={1} style={{ flex: 1}} />
        {/* <Video360 urlVideo="http://903317e44c09.ngrok.io/mediaSource/default.mp4" modeVideo={1} style={{ flex: 1}} /> */}
      </View>
    );
  }
}