import React from 'react';
import {
  View,
  Image,
  Text
} from 'react-native';

import { commonStyles} from '../styles';

export default function NoData(props) {

  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.logo}>
        <Image
            style={{width: 100, height: 100 }}
            source={require('../../assets/images/noData.png')}
            resizeMode="contain"
        />
      </View>
      <View style={commonStyles.centerAlign}>
        <Text size={28} black>
            很抱歉，未找到相关内容
        </Text>
      </View>
    </View>
  );
}