import React, { useState, useEffect } from 'react';
import {
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SliderBox } from 'react-native-image-slider-box';

import constants from '../constants'

export default ({ banners }) => {
  const [validBannerList, setValidBannerList] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    setValidBannerList(banners.filter(banner => typeof(banner) === 'object'))
  }, [banners]);
  const imgList = validBannerList.map(banner => constants.BANNER_BASE_URL + banner.image);
  return (
    <View style={{width: '100%', height: 200}}>
      {validBannerList.length > 0 && (
        <SliderBox
          images={imgList}
          circleLoop
          onCurrentImagePressed={index =>
            navigation.navigate('WebViewer', { url: validBannerList[index].url })
          }
        />
      )}
    </View>
  )
};
