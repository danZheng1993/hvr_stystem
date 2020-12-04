import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import SearchIcon from '../../../../assets/images/search.png';
import BarIcon from '../../../../assets/images/bar.png';

import { colors } from '../../../styles';
import { getNewsList } from '../../../redux/modules/news'
import { getBanners } from '../../../redux/modules/banner'
import { getMediaList } from '../../../redux/modules/media'
import {
  bannersListSelector,
  newsListSelector,
  mediaListSelector,
  newsLoadingSelector,
  bannerLoadingSelector,
  mediaLoadingSelector
} from '../../../redux/selectors'
import { RadioGroup, MediaList, Loader, Text, Bell, NewsList, BannersList } from '../../../components';
import { getSettings } from '../../../redux/modules/setting';
import { isIphoneX } from '../../../helpers';

const tabs = ['融媒体资讯', '精选', 'VR直播'];

export default () => {
  const dispatch = useDispatch();
  const [tabIndex, setTabIndex] = useState(0);
  const [newsRefreshing, setNewsRefreshing] = useState(false);
  const news = useSelector(newsListSelector);
  const banners = useSelector(bannersListSelector);
  const medias = useSelector(mediaListSelector);
  const newsLoading = useSelector(newsLoadingSelector);
  const bannerLoading = useSelector(bannerLoadingSelector);
  const mediaLoading = useSelector(mediaLoadingSelector);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const loading = (newsLoading || bannerLoading || mediaLoading) && !newsRefreshing;
  useEffect(() => {
    dispatch(getSettings());
    dispatch(getBanners());
    dispatch(getNewsList());
    dispatch(getMediaList());
  }, []);

  // useEffect(() => {
  //   if (isFocused) {
  //   }
  // }, [isFocused]);

  useEffect(() => {
    if (!newsLoading) {
      setNewsRefreshing(newsLoading);
    }
  }, [newsLoading]);

  handleNewsRefresh = () => {
    setNewsRefreshing(true);
    dispatch(getNewsList());
  }
  
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", backgroundColor: colors.secondary, padding: 10, paddingTop: Platform.OS === 'ios' ? isIphoneX() ? 48 : 25 : 15, }}>
        <TouchableOpacity 
          style={{ justifyContent:"center", alignItems:"center", marginHorizontal: 10}}
          onPress={() => navigation.navigate('SearchBar')}
        >
          <Image
            resizeMode="contain"
            source={SearchIcon}
            style={{width:20, height: 20}}
          />
        </TouchableOpacity>
        <RadioGroup
          size={16}
          selectedIndex={tabIndex}
          items={tabs}
          onChange={setTabIndex}
          underline
          inline
        />
        <View style={{ justifyContent:"center", alignItems:"center", marginHorizontal: 10}}>
          <Bell/>
        </View>
      </View>
      <Loader loading={loading && isFocused} />

      <View style={{ flex: 1, display: tabIndex == 0 || tabIndex === 2 ? undefined : 'none' }}>
        <BannersList banners={banners}/>
        <View style={{ flex: 1, display: tabIndex === 2 ? 'none' : undefined }}>
          <View style={{paddingTop: 15, paddingLeft: 15}}>
            <Text bold black size={18} style={{borderLeftColor: colors.secondary, borderLeftWidth: 3, paddingLeft: 10}}>热门资讯</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text>OVERSEAS ZONE</Text>
              <Image
                resizeMode="cover"
                source={BarIcon}
                style={{tintColor: colors.lightGray}}
              />
            </View>
          </View>
          <View style={{flexBasis: 1, flexGrow: 1}}>
            <NewsList news={news} refreshing={newsLoading} onRefresh={handleNewsRefresh} />
          </View>
        </View>
      </View>
      <View style={{ flex: 1, display: tabIndex == 1 ? undefined : 'none' }}>
        <MediaList medias={medias} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
