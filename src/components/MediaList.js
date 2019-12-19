import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Icon from 'react-native-vector-icons/Entypo';
import { createStructuredSelector } from 'reselect';
import { fonts, colors } from '../styles';
import constants from '../constants'
import {Loader, Text} from '../components'
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
    const collections = profile? profile.collections : []
    return (
        <ScrollView>      
         {Array.isArray(medias) ? medias.map((media, index) => (
           typeof(media) == 'object' && <View key={index}>
              <TouchableOpacity onPress={() => this.handlePlay(media.path)} style={styles.touch}>
                <ImageBackground
                  source={{ uri: constants.MEDIA_BASE_URL + media.snapshot }}
                  style={{width: '100%', height: '100%', flexDirection: 'column-reverse'}}
                >
                  <LinearGradient colors={['#ffffff00','#989697ff',]} style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text white>{media.title}</Text>
                    <Text white>观看: {media.visits}</Text>
                  </LinearGradient>
                </ImageBackground>
              </TouchableOpacity>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10}} >
                <View style={{flexDirection: 'row'}}>
                  <Text black>{media.title}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  {
                    collections.indexOf(media._id) == -1?
                    <Icon name="heart-outlined" size={20} color={colors.grey} onPress={() => {this.handleCollect(media._id)}}/> :
                    <Icon name="heart" size={20} color={colors.heart} onPress={() => {this.handleCancel(media._id)}}/>
                  }
                  <Icon name="paper-plane" size={20} color={colors.secondary} onPress={() => null}/>
                </View>
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
    alignSelf: "stretch",
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
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