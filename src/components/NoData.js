import React from 'react';
import {
  View,
  Image,
  Text,
} from 'react-native';

const styles = {
  container: {
    height: 400,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
}

export default function NoData(props) {

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image
            style={{width: 100, height: 100, marginBottom: 16 }}
            source={require('../../assets/images/noData.png')}
            resizeMode="contain"
        />
        <Text size={28} black>
          很抱歉，未找到相关内容
        </Text>
      </View>
    </View>
  );
}