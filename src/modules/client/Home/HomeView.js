import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { colors, fonts } from '../../../styles';
import Icon from 'react-native-vector-icons/Entypo';
import { SliderBox } from 'react-native-image-slider-box';
import constants from '../../../constants'
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { getNewss } from '../../../redux/modules/news'
import { getBanners } from '../../../redux/modules/banner'
import { getMedias } from '../../../redux/modules/media'
import { createStructuredSelector } from 'reselect';
import { bannersListSelector, newssListSelector, mediasListSelector, newssloadingSelector, bannersloadingSelector, mediasloadingSelector} from '../../../redux/selectors'
import { RadioGroup, GridRow, Button, MediaList, Loader, Text } from '../../../components';

 class HomeView extends React.Component {

   componentWillMount() {
      const {getBanners, getNewss, getMedias} = this.props
      getBanners()
      getNewss()
      getMedias()
   }

  render() {
    const {tabIndex, banners, news, medias, loading} = this.props
    console.log(banners, news, medias)
    let bannerImages = []
    if (banners.length) {
      banners.map((banner, index) => {
        typeof(banner) == 'object' && bannerImages.push(constants.BANNER_BASE_URL + banner.image)
      })
    }
    return (
      <View style={styles.container}>
        <View style={{ height: 50, flexDirection: "row", backgroundColor: colors.secondary }}>
          <TouchableOpacity 
            style={{ justifyContent:"center", alignItems:"center", marginHorizontal: 10}}
            onPress={() => this.props.navigation.navigate('SearchBar')}
            >
            <Icon name="magnifying-glass" size={30} color={colors.white} />
          </TouchableOpacity>
          <RadioGroup
            selectedIndex={this.props.tabIndex}
            items={this.props.tabs}
            onChange={this.props.setTabIndex}
            underline
          />
        </View>
        <Loader loading={loading} />

        {tabIndex == 0 &&
          <>
            {banners && <SliderBox
              images={bannerImages}
              currentImageEmitter={index => console.warn(`current pos is: ${index}`)}
              onCurrentImagePressed={index =>
                  console.warn(`image ${index} pressed`)
              }
            />
            }
            {news && news.map((l, i) => (
              typeof(l) == "object" &&
              <View style={{flexDirection: 'row', margin: 15, borderRadius: 5}} key={i}>
                <View style={{flex: 1}}>
                  <Text black bold>{l.title}</Text>
                </View>
                <View style={{flex: 1, alignItems: 'stretch'}}>
                  <Image
                    resizeMode="contain"
                    source={{uri: constants.NEWS_BASE_URL + l.image}}
                    style={{width: '100%', height: 100, borderRadius: 20}}
                  />
                </View>
              </View>
          ))}
          </>
        }
        {tabIndex == 1 &&
          medias && <MediaList medias={medias} navigation={this.props.navigation} />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

const mapStateToProps = createStructuredSelector({
  news: newssListSelector,
  banners : bannersListSelector,
  medias: mediasListSelector,
  loading: newssloadingSelector || bannersloadingSelector || mediasloadingSelector
});

const mapDispatchToProps = {
  getNewss,
  getBanners,
  getMedias,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(HomeView);
