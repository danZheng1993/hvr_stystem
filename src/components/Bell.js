import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { unreadMessagesSelector } from '../redux/selectors'

export default () => {
  const navigation = useNavigation();
  const unread = useSelector(unreadMessagesSelector);
  const unreadCount = unread.length || 0
  console.log({ unread });
  return (
    <TouchableOpacity style={{flexDirection: 'row', alignItems: 'flex-start'}} onPress={() => navigation.navigate('Notification')}>
      <Image
          source={require('../../assets/images/bell.png')}
          style={{width: 20, height: 20}}
      />
      {unreadCount > 0 && (
        <View
          style={{
            position: 'absolute',
            top: -4,
            right: 0,
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: 'red',
            borderWidth: 1,
            borderColor: 'white',
            borderStyle: 'solid',
          }}
        />
      )}
    </TouchableOpacity>
  );
}
