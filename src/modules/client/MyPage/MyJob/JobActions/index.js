import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import {Button, Confirm} from '../../../../../components'
import NotPaidAction from './NotPaidAction'
import TestingAction from './TestingAction'
import WaitingAction from './WaitingAction'
import {colors} from '../../../../../styles'

const FeedbackAction = ({navigation,job}) => {
  return (
    <View style={styles.buttonsContainer}>
      <Button
        small
        style={styles.button}
        caption="联系服务商"
        onPress={() => navigation.navigate('Chatting', {to: job.hired})}
      />
      <Button
        small
        style={styles.button}
        caption="查看视频"
        onPress={() => navigation.navigate('Player')}
      />
      <Button
        small
        bgColor={colors.warning}
        style={styles.button}
        caption="评价"
        onPress={() => navigation.navigate('GiveFeedback', {id: job._id})}
      />
    </View>
  )
}

const FinishingAction = ({navigation, job}) => {
  return (
    <View style={styles.buttonsContainer}>
      <Button
        small
        style={styles.button}
        caption="联系服务商"
        onPress={() => navigation.navigate('Chatting', {to: job.hired})}
      />
      <Button
        small
        bgColor={colors.warning}
        style={styles.button}
        caption="查看视频"
        onPress={() => navigation.navigate('Player')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  buttonsContainer: {
    alignItems: 'flex-end',
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopColor: colors.greybackground,
    borderTopWidth: 1,
    paddingTop: 10
  },

  button: {
  },
});

export {
  NotPaidAction,
  WaitingAction,
  TestingAction,
  FeedbackAction,
  FinishingAction
}