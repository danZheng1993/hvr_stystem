import React from 'react';
import { View, Animated, Image, TouchableOpacity } from 'react-native';
import WebView from 'react-native-webview';
import Ionicons from 'react-native-vector-icons/Ionicons';
import isEmpty from 'lodash/isEmpty';

import { colors } from '../styles';
import { isIphoneX } from '../helpers';
import {Text} from '../components/StyledText';
import { getDateStr } from '../utils/helper';
import DefaultImage from '../../assets/images/logo.png';
import constants from '../constants';

export default class NewsDetail extends React.Component {
  aniVal = new Animated.Value(1);
  handleClose = () => {
    this.props.navigation.goBack();
  }
  handleScroll = ({ nativeEvent }) => {
    const { contentOffset } = nativeEvent;
    if (contentOffset.y < 100 && this.aniVal._value === 0) {
      Animated.timing(
        this.aniVal,
        {
          duration: 300,
          toValue: 1
        }
      ).start();
    }
    if (contentOffset.y >= 100 && this.aniVal._value === 1) {
      Animated.timing(
        this.aniVal,
        {
          duration: 300,
          toValue: 0,
        }
      ).start();
    }
  }
  render() {
    const { route } = this.props;
    const { item } = route.params;
    return item && (
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.button} onPress={this.handleClose}>
            <Ionicons name="chevron-back" size={24} color={colors.primary} />
          </TouchableOpacity>
					<View style={{ flex: 1 }}>
          	<Text size={18} bold hCenter>{item.title}</Text>
					</View>
          <View style={styles.button} />
        </View>
        <View style={styles.content}>
          <Text size={16}>{item.source}</Text>
          <Text size={14}>{getDateStr(item.created)}</Text>
          {!isEmpty(item.image) && (
            <Animated.View
              style={{
                width: '100%',
                height: this.aniVal.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 250],
                }),
                overflow: 'hidden'
              }}
            >
              <Image style={{ width: '100%', height: '100%' }} source={{ uri: constants.NEWS_BASE_URL + item.image }} />
            </Animated.View>
          )}
          <WebView
            source={{html: item.content}}
            containerStyle={{ flex: 1 }}
            style={styles.webview}
            mixedContentMode="always"
            overScrollMode="content"
            contentMode="mobile"
            contentInsetAdjustmentBehavior="automatic"
            onScroll={this.handleScroll}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  webview: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 10,
    paddingTop: Platform.OS === 'ios' ? isIphoneX() ? 48 : 25 : 15,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  content: {
    flex: 1,
    padding: 16,
  },
  image: {
    width: '100%',
    height: 250,
    backgroundColor: colors.primary,
    marginVertical: 12,
  },
  button: {
    padding: 8,
    width: 40,
  }
}