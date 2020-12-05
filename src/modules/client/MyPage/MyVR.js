import React from 'react';

import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
  Share
} from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';

import { Loader, NoData, Text } from '../../../components'
import { colors } from '../../../styles';
import constants from '../../../constants'

import { getMyMedias, increaseVisits } from '../../../redux/modules/media'
import { mediaLoadingSelector,  profileSelector, myMediasSelector } from '../../../redux/selectors'

class MyVR extends React.Component {

  componentWillMount() {
    const {getMyMedias} = this.props
    getMyMedias()
  }

  handlePlay(media) {
    this.props.increaseVisits({ id: media._id });
    this.props.navigation.navigate('Player', {url: media.path})
  }

  handleShare = (idx) => {
    const { medias } = this.props;
    Share.share({
      message: `请检查这部影片\n${constants.MEDIA_BASE_URL}/${medias[idx].path}`
    })
  }

  render() {    
    const {medias, loading} = this.props
    return (
      <ScrollView style={styles.container}>     
        <Loader loading={loading} /> 
        {Array.isArray(medias) ? medias.map((media, index) => (
          typeof(media) == 'object' && <View key={index}>
            <TouchableOpacity onPress={() => this.handlePlay(media)} style={styles.touch}>
              <ImageBackground
                source={{ uri: constants.MEDIA_BASE_URL + media.snapshot }}
                imageStyle={{borderTopLeftRadius: 10, borderTopRightRadius: 10}}
                style={{width: '100%', height: '100%', flexDirection: 'column-reverse'}}
              >
                <View style={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <Image
                    source={require('../../../../assets/images/play.png')}
                    style={{width: 50, height: 50}}
                  />
                </View>
              </ImageBackground>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, backgroundColor: colors.white, borderBottomLeftRadius: 10, borderBottomRightRadius: 10}} >
              <View style={{flexDirection: 'row', justifyContent: 'center',alignItems: 'center'}}>
                <Text black size={14}>{media.creator.userName}</Text>
              </View>
              <View style={{flexDirection: 'row', }}>
                <TouchableOpacity style={{marginLeft: 10}} onPress={() => this.handleShare(index)}>
                  <Image
                    source={require('../../../../assets/images/follow.png')}
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
  },
  touch: {
    alignSelf: "stretch",
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    height: 200,
    marginTop: 20,
    borderRadius: 5
  },
});


const mapStateToProps = createStructuredSelector({
  medias: myMediasSelector,
  loading: mediaLoadingSelector,
  profile: profileSelector
});

const mapDispatchToProps = {
  getMyMedias,
  increaseVisits,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(MyVR);
