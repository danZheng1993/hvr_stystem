import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import isEmpty from 'lodash/isEmpty';

import {Text} from './StyledText';
import { getDateStr } from '../utils/helper';
import { extractImageFromContent } from '../utils/images';
import { colors } from '../styles';

export default ({ news, onRefresh, refreshing }) => {
  const navigation = useNavigation();
  const handleWebView = (item) => {
    if (isEmpty(item.path)) {
      Alert.alert('没有网址链接');
    } else {
      navigation.navigate('WebViewer', {url: item.path})
    }
  }
  const renderItem = ({ item }) => {
    const image = extractImageFromContent(item.content);
    return (
      <TouchableOpacity 
        style={styles.itemWrapper}
        onPress={() => handleWebView(item)}
      >
        <View style={styles.itemContent}>
          <Text black bold>{item.title}</Text>
          <Text size={9}>{getDateStr(item.created)}</Text>
        </View>
        <View style={styles.itemImageWrapper}>
          <Image
            resizeMode="cover"
            source={{uri: image}}
            style={styles.itemImage}
          />
        </View>
      </TouchableOpacity>
    )
  }
  const keyExtractor = (item) => `news_${item.id}`;
  return (
    <FlatList
      data={news}
      style={styles.wrapper}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onRefresh={onRefresh}
      refreshing={refreshing}
    />
  )
}

const styles = {
  wrapper: {
    flex: 1,
  },
  itemWrapper: {
    flexDirection: 'row',
    borderRadius: 5,
    height: 128,
    borderBottomWidth: 0.3,
    paddingVertical: 24,
    marginHorizontal: 16,
    borderColor: colors.lightGray,
  },
  itemContent: {
    flex: 2,
    paddingRight: 20
  },
  itemImageWrapper: {
    flex: 1,
    alignItems: 'stretch'
  },
  itemImage: {
    flex: 1,
    borderRadius: 5
  },
};
