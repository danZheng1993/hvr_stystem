import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView
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
import { getSettings } from '../../../redux/modules/setting';
import { getDateStr } from '../../../utils/helper';

 class HomeView extends React.Component {

   componentWillMount() {
      const {getBanners, getNewss, getMedias, getSettings} = this.props
      getBanners()
      getNewss()
      getMedias()
      getSettings()
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
              onCurrentImagePressed={index =>
                this.props.navigation.navigate('WebViewer', {url: banners[index].url})
              }
            />
            }
            <View style={{paddingTop: 15, paddingLeft: 15}}>
              <Text bold black size={18} style={{borderLeftColor: colors.secondary, borderLeftWidth: 3, paddingLeft: 10}}>热门资讯</Text>
              <Text>OVERSEAS ZONE</Text>
            </View>
            <View style={{flexBasis: 1, flexGrow: 1}}>
              <ScrollView style={{flex: 1}}>
                {news && news.map((l, i) => (
                  typeof(l) == "object" &&
                  <TouchableOpacity style={{flexDirection: 'row', margin: 15, borderRadius: 5, height: 80}} key={i} onPress={() => this.props.navigation.navigate('WebViewer', {url: l.source})
                }>
                    <View style={{flex: 2, paddingRight: 20}}>
                      <Text black bold>{l.title}</Text>
                      <Text>{getDateStr(l.created)}</Text>
                    </View>
                    <View style={{flex: 1, alignItems: 'stretch'}}>
                      <Image
                        resizeMode="cover"
                        source={{uri: constants.NEWS_BASE_URL + l.image}}
                        style={{flex: 1, borderRadius: 5}}
                      />
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
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
  getSettings
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(HomeView);
