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
import { createStructuredSelector } from 'reselect';
import { colors } from '../styles';
import constants from '../constants'
import { Text, toast} from '../components'
import { addToCollections, removeFromCollections, addToAttentions } from '../redux/modules/auth'
import { increaseVisits } from '../redux/modules/media'
import { authloadingSelector, profileSelector } from '../redux/selectors'
import NoData from './NoData';
import HeartO from '../../assets/images/heart-o.png';
import Heart from '../../assets/images/heart.png';

class MediaList extends React.Component {
  constructor(props) {
    super(props)
    
  }
  handlePlay(media) {
    this.props.increaseVisits({id: media._id})
    this.props.navigation.navigate('Player', {url: media.path})
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

  handleAttentions = (id) => {
    this.props.addToAttentions({
      body: {attention: id},
      success: () => toast('成功!'),
      fail: ()=> toast('失败')
    })
  }

  render() {   
    const {medias, navigation, profile} = this.props
    console.log(medias)
    const collections = profile? profile.collections : []
    const attentions = profile? profile.attentions : []
    return (
        <ScrollView>      
         {Array.isArray(medias) ? medias.map((media, index) => (
           typeof(media) == 'object' && <View key={index}>
              <TouchableOpacity onPress={() => this.handlePlay(media)} style={styles.touch}>
                <ImageBackground
                  source={{ uri: constants.MEDIA_BASE_URL + media.snapshot }}
                  style={{width: '100%', height: '100%', flexDirection: 'column-reverse'}}
                >
                  <LinearGradient colors={['#ffffff00','#989697ff',]} style={{flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'stretch'}}>
                    <Text white>{media.title}</Text>
                    <Text white>观看: {media.visits}</Text>
                  </LinearGradient>
                  <View style={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Image
                      source={require('../../assets/images/play.png')}
                      style={{width: 50, height: 50}}
                    />
                  </View>
                </ImageBackground>
              </TouchableOpacity>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, backgroundColor: colors.white}} >
                <View style={{flexDirection: 'row', justifyContent: 'center',alignItems: 'center'}}>
                  <Image
                    source={{uri: constants.BASE_URL + (media.creator ? media.creator.photo: 'default.png')}}
                    style={{width: 20, height: 20, borderRadius: 10}}
                  />
                  <Text black>{media.creator.userName}</Text>
                  {
                    attentions.indexOf(media.creator._id) == -1 &&
                    <Text onPress={() => this.handleAttentions(media.creator._id)} color={colors.primary}>+关注</Text>
                  }
                </View>
                <View style={{flexDirection: 'row', }}>
                  <TouchableOpacity onPress={() => { collections.indexOf(media._id) == -1 ? this.handleCollect(media._id) : this.handleCancel(media._id) }}>
                    <Image
                      source={collections.indexOf(media._id) == -1 ? HeartO : Heart}
                      style={{width: 20, height: 20, tintColor: colors.gray}}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={{marginLeft: 10}} onPress={() => null}>
                    <Image
                      source={require('../../assets/images/follow.png')}
                      style={{width: 20, height: 20}}
                    />
                  </TouchableOpacity>
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
  addToAttentions,
  removeFromCollections,
  increaseVisits
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(MediaList);