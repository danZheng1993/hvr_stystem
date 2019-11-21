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
export default class MediaList extends React.Component {
  constructor(props) {
    super(props)
    
  }
  handlePlay(path) {
    this.props.navigation.navigate('Player')
  }
  render() {   
    const {medias, navigation} = this.props
    console.log(medias)
    return (
        <ScrollView>      
         {medias.length && medias.map((media, index) => (
           typeof(media) == 'object' && <View key={index} style={styles.componentsSection}>
              <TouchableOpacity onPress={() => this.handlePlay(media.path)} style={styles.touch}>
                <Image
                  source={{ uri: constants.MEDIA_BASE_URL + media.snapshot }}
                  style={{width: '100%', height: '100%'}}
                />
              {/* <Text size={14}>观看 : {media.visits}</Text> */}
              </TouchableOpacity>
              <Text size={14}>{media.title}</Text>
            </View>

         ))}
         </ScrollView>
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
