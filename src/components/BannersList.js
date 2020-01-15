import React from 'react';
import {
  View,
} from 'react-native';
import constants from '../constants'
import { SliderBox } from 'react-native-image-slider-box';

export default class BannersList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bannerImages: []
    }
  }
  componentWillMount() {
    const {banners} = this.props
    let bannerImages = []
    if (banners.length) {
      banners.map((banner, index) => {
        typeof(banner) == 'object' && bannerImages.push(constants.BANNER_BASE_URL + banner.image)
      })
    }
    this.setState({bannerImages})
  }
  render() {   
    const {banners} = this.props
    const {bannerImages} = this.state
    return (
      <View style={{width: '100%', height: 200}}>
        {banners && <SliderBox
          images={bannerImages}
          onCurrentImagePressed={index =>
            this.props.navigation.navigate('WebViewer', {url: banners[index].url})
          }
        />
        }
      </View>
    );
    }
}