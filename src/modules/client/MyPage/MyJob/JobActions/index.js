import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import {Button, Text} from '../../../../../components'
import NotPaidAction from './NotPaidAction'
import TestingAction from './TestingAction'
import WaitingAction from './WaitingAction'
import {colors} from '../../../../../styles'
import { getDateTimeStr } from '../../../../../utils/helper';

const FeedbackAction = ({navigation,job}) => {
  return (
    <View>
      <Text size={14}>首付款支付时间 : <Text>¥{getDateTimeStr(job.created)}</Text></Text>
      <Text size={14}>尾款支付时间 : <Text>¥{getDateTimeStr(job.created)}</Text></Text>
      <Text bold size={14} color={colors.primary} style={{alignSelf: 'flex-end'}}>订单总金额 : ¥{job.price}</Text>
      <View style={styles.buttonsContainer}>
        <Button
          small
          caption="联系服务商"
          onPress={() => navigation.navigate('Chatting', {to: job.hired})}
        />
        <View style={{flexDirection: 'row'}}>
          <Button
            small
            bordered
            primary
            caption="查看视频"
            style={{marginRight: 5}}
            onPress={() => navigation.navigate('Player')}
          />
          <Button
            small
            bgColor={colors.warning}
            caption="评价"
            onPress={() => navigation.navigate('GiveFeedback', {id: job._id})}
          />
        </View>
      </View>
    </View>
  )
}

const FinishingAction = ({navigation, job}) => {
  return (
    <View>
      <Text size={14}>首付款支付时间 : <Text>¥{getDateTimeStr(job.created)}</Text></Text>
      <Text size={14}>尾款支付时间 : <Text>¥{getDateTimeStr(job.created)}</Text></Text>
      <Text bold size={14} color={colors.primary} style={{alignSelf: 'flex-end'}}>订单总金额 : ¥{job.price}</Text>
      <View style={styles.buttonsContainer}>
        <Button
          small
          caption="联系服务商"
          onPress={() => navigation.navigate('Chatting', {to: job.hired})}
        />
        <Button
          small
          bordered
          primary
          caption="查看视频"
          onPress={() => navigation.navigate('Player')}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonsContainer: {
    alignItems: 'flex-end',
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopColor: colors.greybackground,
    borderTopWidth: 1,
    paddingTop: 10
  },
});

export {
  NotPaidAction,
  WaitingAction,
  TestingAction,
  FeedbackAction,
  FinishingAction
}