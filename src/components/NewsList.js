import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  FlatList
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Text} from './StyledText';
import { getDateStr } from '../utils/helper';
import { extractImageFromContent } from '../utils/images';

export default ({ news }) => {
  const navigation = useNavigation();
  const renderItem = ({ item }) => {
    const image = extractImageFromContent(item.content);
    return (
      <TouchableOpacity 
        style={styles.itemWrapper}
        onPress={() => navigation.navigate('WebViewer', {url: item.path})}
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
    />
  )
}

const styles = {
  wrapper: {
    flex: 1,
  },
  itemWrapper: {
    flexDirection: 'row',
    margin: 15,
    borderRadius: 5,
    height: 80,
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
