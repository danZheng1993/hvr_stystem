import React, { useState, useEffect } from 'react';
import { View, Alert, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SliderBox } from 'react-native-image-slider-box';
import isEmpty from 'lodash/isEmpty';

import constants from '../constants';
import { Text } from './StyledText';
import { colors } from '../styles';

import BannerBG from '../../assets/images/slider_banner_bg.png';

export default ({ banners }) => {
  const [validBannerList, setValidBannerList] = useState([]);
  const [currentItem, setCurrentItem] = useState(0);
  const navigation = useNavigation();
  useEffect(() => {
    if (banners.length > 0) {
      setValidBannerList(banners.filter(banner => typeof(banner) === 'object'))
    }
  }, [banners]);

  const handleItemPress = (index) => {
    const url = validBannerList[index].url;
    if (!isEmpty(url)) {
      navigation.navigate('WebViewer', { url })
    }
  }

  const handleItemChange = (index) => {
    setCurrentItem(index);
  }

  const imgList = validBannerList.map(banner => constants.BANNER_BASE_URL + banner.image);

  return (
    <View style={styles.wrappper}>
      {validBannerList.length > 0 && (
        <SliderBox
          images={imgList}
          circleLoop
          onCurrentImagePressed={handleItemPress}
          currentImageEmitter={handleItemChange}
        />
      )}
      {validBannerList.length > 0 && (
        <ImageBackground source={BannerBG} style={styles.captionWrapper}>
          <Text size={14} style={styles.caption}>{validBannerList[currentItem].title}</Text>
        </ImageBackground>
      )}
    </View>
  )
};

const styles = {
  wrapper: { width: '100%', height: 230 },
  captionWrapper: {
    height: 30,
    backgroundColor: colors.primary,
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  caption: {
    textAlign: 'center',
    color: colors.white,
    opacity: 0.8,
  }
}
