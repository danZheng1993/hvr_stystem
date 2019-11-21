import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import moment from 'moment'
import { fonts, colors } from '../styles';
import constants from '../constants'
import Nyt360Video from 'react-native-nyt-360-video';

export default class Player extends React.Component {
  constructor(props) {
    super(props)
    
  }
  render() {   
    return (
      <Nyt360Video
      ref={ref => this.player = ref}
      style={{flex: 1, backgroundColor:'#000000'}}
      source={{ uri:constants.MEDIA_BASE_URL + 'media1.mp4',
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
    );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bluish,
    paddingHorizontal: 15,
    paddingTop: 20,
  },

  description: {
    padding: 20,
    marginBottom: 20,
    alignSelf: 'stretch'
  },

  componentsSection: {
    backgroundColor: colors.white,
    padding: 15,
    marginBottom: 20,
    borderRadius: 5,
  },
  touch: {
    borderColor: colors.gray,
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    alignSelf: "stretch",
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    height: 200
  },
});
