import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import { Viro360Video } from 'react-viro';

import { colors } from '../styles';
import constants from '../constants'
// import Nyt360Video from 'react-native-nyt-360-video';
// import JWPlayer from 'react-native-jwplayer';

export default class Player extends React.Component {
  constructor(props) {
    super(props)
    this.state= {
      path: 'default.mp4'
    }
  }
  componentWillMount() {
    const { url: path = 'default.mp4' } = this.props.route.params;
    this.setState({path})
  }

  render() {   
    return (
      <Viro360Video
        source={{ uri:constants.MEDIA_BASE_URL + this.state.path }}
        onFinish={this._onFinish}
        onUpdateTime={this._onUpdateTime}
        onError={this._videoError}
        loop={true}
        paused={false}
        volume={1.0} />
    );
  }
}