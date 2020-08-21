import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { colors } from '../../../styles';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { getNewss } from '../../../redux/modules/news'
import { getBanners } from '../../../redux/modules/banner'
import { getMedias } from '../../../redux/modules/media'
import { createStructuredSelector } from 'reselect';
import { bannersListSelector, newssListSelector, mediasListSelector, newssloadingSelector, bannersloadingSelector, mediasloadingSelector} from '../../../redux/selectors'
import { RadioGroup, MediaList, Loader, Text, Bell, NewsList, BannersList } from '../../../components';
import { getSettings } from '../../../redux/modules/setting';
import { isIphoneX } from '../../../helpers';
const iconSearch = require('../../../../assets/images/search.png');
const iconBar = require('../../../../assets/images/bar.png');

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
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: "row", backgroundColor: colors.secondary, padding: 10, paddingTop: Platform.OS === 'ios' ? isIphoneX() ? 48 : 25 : 15, }}>
          <TouchableOpacity 
            style={{ justifyContent:"center", alignItems:"center", marginHorizontal: 10}}
            onPress={() => this.props.navigation.navigate('SearchBar')}
          >
            <Image
              resizeMode="contain"
              source={iconSearch}
              style={{width:20, height: 20}}
            />
          </TouchableOpacity>
          <RadioGroup
            size={16}
            selectedIndex={this.props.tabIndex}
            items={this.props.tabs}
            onChange={this.props.setTabIndex}
            underline
          />
          <View style={{ justifyContent:"center", alignItems:"center", marginHorizontal: 10}}>
            <Bell navigation={this.props.navigation}/>
          </View>
        </View>
        <Loader loading={loading} />

        {tabIndex == 0 &&
          <>
            <BannersList banners={banners} navigation={this.props.navigation}/>
            <View style={{paddingTop: 15, paddingLeft: 15}}>
              <Text bold black size={18} style={{borderLeftColor: colors.secondary, borderLeftWidth: 3, paddingLeft: 10}}>热门资讯</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text>OVERSEAS ZONE</Text>
                <Image
                  resizeMode="cover"
                  source={iconBar}
                  style={{tintColor: colors.lightGray}}
                />
              </View>
            </View>
            <View style={{flexBasis: 1, flexGrow: 1}}>
              <NewsList news={news} navigation={this.props.navigation} />
            </View>
          </>
        }
        {tabIndex == 1 &&
          medias && <MediaList medias={medias} navigation={this.props.navigation} />
        }
        {tabIndex == 2 &&
          <>
            <BannersList banners={banners} navigation={this.props.navigation}/>
          </>
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
