import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import { colors } from '../styles';
import constants from '../constants'
import Nyt360Video from 'react-native-nyt-360-video';
// import JWPlayer from 'react-native-jwplayer';

export default class Player extends React.Component {
  constructor(props) {
    super(props)
    this.state= {
      path: 'default.mp4'
    }
  }
  componentWillMount() {
    const path = this.props.navigation.getParam('url', 'default.mp4')
    this.setState({path})
  }

  render() {   
    return (
      <Nyt360Video
        ref={ref => this.player = ref}
        style={{flex: 1, backgroundColor:'#000000'}}
        source={{ uri:constants.MEDIA_BASE_URL + this.state.path,
          type: 'mono'}}
        displayMode={'embedded'}
        volume={1.0}
        paused={false}
        onLoad={(e) => console.log(e)}
        onError={(e) => console.log(e)}
        onEnd={(e) => console.log(e)}
        onProgress={(e) => console.log(e)}
        onPress={(e) => console.log(e)}
        enableFullscreenButton={false}
        enableCardboardButton={false}
        enableTouchTracking={false}
        hidesTransitionView={false}
        enableInfoButton={false} />
//     <View style={styles.container}>
//   <JWPlayer
//     style={styles.player}
//     autostart={false}
//     file={'https://content.jwplatform.com/manifests/vM7nH0Kl.m3u8'}
//     onBeforePlay={() => this.onBeforePlay()}
//     onPlay={() => this.onPlay()}
//     onPlayerError={e => this.onPlayerError(e)}
//     onBuffer={() => this.onBuffer()}
//     onTime={time => this.onTime(time)}
//   />
// </View>
    );
  }
}