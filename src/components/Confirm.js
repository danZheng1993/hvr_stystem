import React, { Component } from 'react';
import {
  StyleSheet,
  Alert
} from 'react-native';

export default Confirm = (title='', message='', onOK) => {
    Alert.alert(
      title,
      message,
      [
        {
          text: '取消',
          onPress: () => console.log(""),
          style: 'cancel',
        },
        {text: '确认', onPress: () => onOK()},
      ],
      {cancelable: false},
    )
}