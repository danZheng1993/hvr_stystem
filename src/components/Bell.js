import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Badge } from 'react-native-elements'
import { sum, values} from 'lodash'

import { unreadMessagesSelector } from '../redux/selectors'

export default () => {
  const navigation = useNavigation();
  const unread = useSelector(unreadMessagesSelector);
  const unreadCount = sum(values(unread)) || 0
  return (
    <TouchableOpacity style={{flexDirection: 'row', alignItems: 'flex-start'}} onPress={() => navigation.navigate('Notification')}>
      {!!unreadCount && <Badge value={unreadCount} status="error"/>}
      <Image
          source={require('../../assets/images/bell.png')}
          style={{width: 20, height: 20}}
      />
    </TouchableOpacity>
  );
}
