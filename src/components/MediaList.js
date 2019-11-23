import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';

import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';

import { fonts, colors } from '../styles';
import constants from '../constants'
import {Loader} from '../components'
import { addToCollections, removeFromCollections } from '../redux/modules/auth'
import { authloadingSelector, profileSelector } from '../redux/selectors'
import NoData from './NoData';
class MediaList extends React.Component {
  constructor(props) {
    super(props)
    
  }
  handlePlay(path) {
    this.props.navigation.navigate('Player')
  }

  handleCollect(id) {
    this.props.addToCollections({
      body: {collection: id}
    })
  }
  
  handleCancel(id) {
    this.props.removeFromCollections({
      body: {collection: id}
    })
  }

  render() {   
    const {medias, navigation, profile} = this.props
    console.log(medias)
    const collections = profile.collections
    return (
        <ScrollView>      
         {medias.length ? medias.map((media, index) => (
           typeof(media) == 'object' && <View key={index} style={styles.componentsSection}>
              <TouchableOpacity onPress={() => this.handlePlay(media.path)} style={styles.touch}>
                <Image
                  source={{ uri: constants.MEDIA_BASE_URL + media.snapshot }}
                  style={{width: '100%', height: '100%'}}
                />
              {/* <Text size={14}>观看 : {media.visits}</Text> */}
              </TouchableOpacity>
              <View style={{flexDirection: 'row'}} >
                <Text size={14}>{media.title}</Text>
                {
                  collections.indexOf(media._id) == -1?
                  <Text size={14} onPress={() => {this.handleCollect(media._id)}}>收藏</Text> :
                  <Text size={14} onPress={() => {this.handleCancel(media._id)}}>取消收藏</Text>
                }
              </View>
            </View>

         )) : <NoData />}
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

const mapStateToProps = createStructuredSelector({
  loading: authloadingSelector,
  profile: profileSelector
});

const mapDispatchToProps = {
  addToCollections,
  removeFromCollections
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(MediaList);