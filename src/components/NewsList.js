import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';
import constants from '../constants'
import {Text} from './StyledText';
import { getDateStr } from '../utils/helper';

export default class NewsList extends React.Component {
  render() {   
    const {news, navigation} = this.props
    console.log(news)
    return (
      <ScrollView style={{flex: 1}}>
        {news && news.map((l, i) => (
          typeof(l) == "object" &&
            <TouchableOpacity 
              style={{flexDirection: 'row', margin: 15, borderRadius: 5, height: 80}} 
              key={i} 
              onPress={() => this.props.navigation.navigate('WebViewer', {url: constants.NEWS_BASE_URL + l.source})}
            >
            <View style={{flex: 2, paddingRight: 20}}>
              <Text black bold>{l.title}</Text>
              <Text size={9}>{getDateStr(l.created)}</Text>
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
    );
    }
}