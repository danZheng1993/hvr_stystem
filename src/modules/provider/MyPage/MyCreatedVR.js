import React from 'react';

import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';

import { connect } from 'react-redux';
import { withState,compose } from 'recompose';
import { createStructuredSelector } from 'reselect';

import LinearGradient from 'react-native-linear-gradient';
import { Button, Loader, MediaList, RadioGroup, NoData, Text } from '../../../components'
import { fonts, colors } from '../../../styles';
import constants from '../../../constants'
import { getMyMedias } from '../../../redux/modules/media'
import { mediasSearchResultSelector , mediasloadingSelector,  profileSelector, myMediasSelector } from '../../../redux/selectors'
import { getDateStr } from '../../../utils/helper';


class MyMedia extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentWillMount() {
    const {getMyMedias, profile, navigation} = this.props
    getMyMedias()
  }

  handlePlay(path) {
    this.props.navigation.navigate('Player', {url: path})
  }
  
  render() {    
    const {medias, loading} = this.props
    return (
      <ScrollView style={styles.container}>
        <Loader loading={loading} />
         {Array.isArray(medias) ? medias.map((media, index) => (
           typeof(media) == 'object' && <View key={index}>
              <TouchableOpacity onPress={() => this.handlePlay(media.path)} style={styles.touch}>
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
                      source={require('../../../../assets/images/play.png')}
                      style={{width: 50, height: 50}}
                    />
                  </View>
                </ImageBackground>
              </TouchableOpacity>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, backgroundColor: colors.white}} >
                <View style={{flexDirection: 'row', justifyContent: 'center',alignItems: 'center'}}>
                  <Text size={14} black>发布时间： {getDateStr(media.created)}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity onPress={() => null}>
                    <Image
                      source={require('../../../../assets/images/follow.png')}
                      style={{width: 20, height: 20}}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={{marginLeft: 10}} onPress={() => null}>
                    <Image
                      source={require('../../../../assets/images/trash.png')}
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
  medias: myMediasSelector,
  loading: mediasloadingSelector,
  profile: profileSelector
});

const mapDispatchToProps = {
  getMyMedias
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(MyMedia);
