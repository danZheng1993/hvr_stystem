import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import {Button, Text} from '../../../../../components'
import NotPaidAction from './NotPaidAction'
import TestingAction from './TestingAction'
import WaitingAction from './WaitingAction'
import {colors} from '../../../../../styles'
import { getDateTimeStr } from '../../../../../utils/helper';
import { getApi } from '../../../../../redux/api/apiCall';
import { increaseVisits } from '../../../../../redux/modules/media';

const FeedbackAction = ({navigation,job}) => {
  const [media, setMedia] = useState(null);
  useEffect(() => {
    getMedia();
  })
  const dispatch = useDispatch();

  const getMedia = async () => {
    try {
      const result = await getApi(`/jobs/media?jobID=${job._id}`);
      setMedia(result.data);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <View>
      <Text size={14}>首付款支付时间 : <Text>¥{getDateTimeStr(job.upfrontDate)}</Text></Text>
      <Text size={14}>尾款支付时间 : <Text>¥{getDateTimeStr(job.finalPayDate)}</Text></Text>
      <Text bold size={14} color={colors.primary} style={{alignSelf: 'flex-end'}}>订单总金额 : ¥{job.price}</Text>
      <View style={styles.buttonsContainer}>
        <Button
          small
          caption="联系服务商"
          onPress={() => navigation.navigate('Chatting', {to: job.hired})}
        />
        <View style={{flexDirection: 'row'}}>
          {media && (
            <Button
              small
              bordered
              primary
              caption="查看视频"
              style={{marginRight: 5}}
              onPress={() => {
                dispatch(increaseVisits({ id: media._id }));
                navigation.navigate('Player', { url: media.path })
              }}
            />
          )}
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
  const [media, setMedia] = useState(null);
  useEffect(() => {
    getMedia();
  })
  const dispatch = useDispatch();

  const getMedia = async () => {
    try {
      const result = await getApi(`/jobs/media?jobID=${job._id}`);
      setMedia(result.data);
    } catch (err) {
      console.log(err);
    }
  }
  
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
        {media && (
          <Button
            small
            bordered
            primary
            caption="查看视频"
            style={{marginRight: 5}}
            onPress={() => {
              dispatch(increaseVisits({ id: media._id }));
              navigation.navigate('Player', { url: media.path });
            }}
          />
        )}
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