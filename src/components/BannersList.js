import React, { useState, useEffect } from 'react';
import { View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SliderBox } from 'react-native-image-slider-box';
import isEmpty from 'lodash/isEmpty';

import constants from '../constants'

export default ({ banners }) => {
  const [validBannerList, setValidBannerList] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    if (banners.length > 0) {
      setValidBannerList(banners.filter(banner => typeof(banner) === 'object'))
    }
  }, [banners]);

  const handleItemPress = (index) => {
    const url = validBannerList[index].url;
    if (isEmpty(url)) {
      Alert.alert('没有网址链接');
    } else {
      navigation.navigate('WebViewer', { url })
    }
  }

  const imgList = validBannerList.map(banner => constants.BANNER_BASE_URL + banner.image);

  return (
    <View style={{width: '100%', height: 200}}>
      {validBannerList.length > 0 && (
        <SliderBox
          images={imgList}
          circleLoop
          onCurrentImagePressed={handleItemPress}
        />
      )}
    </View>
  )
};
