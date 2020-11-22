import React from 'react';
import {
	Alert,
  StyleSheet,
  View,
} from 'react-native';
import * as WeChat from 'react-native-wechat-lib';
import md5 from 'md5';

import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { makePayment } from '../../../../../redux/modules/payment'
import {updateMyJobsList, cancelJob, removeFromMyJobsList} from '../../../../../redux/modules/job'
import {settingsListSelector} from '../../../../../redux/selectors'
import {Button, Text} from '../../../../../components'
import {colors} from '../../../../../styles'

const signPayload = (partnerId, prepayId, nonceStr, timestamp, pckg) => {
	const strA = `partnerid=${partnerId}&prepayid=${prepayId}&noncestr=${nonceStr}&timestamp=${timestamp}&package=${pckg}`;
	const strSignTemp = `${strA}&key=uJZcu0UOUTv2q54xxcUa7Z6o3OM8RNmc`;
	return md5(strSignTemp);
}

const handlePayment = async (callback) => {
	const nonceStr = Math.random().toString().slice(2, 32);
	const timeStamp = Date.now();
	try {
		await WeChat.pay({
			partnerId: '1603740497',
			prepayId: '1563539641',
			nonceStr,
			timeStamp,
			package: 'Sign=WXPay',
			sign: signPayload('1603740497', '1563539641', nonceStr, timeStamp, 'Sign=WXPay')
		});
		callback();
	} catch {
		Alert.alert('付款失败');
	}
}

const NotPaidAction = props => {
  const {settings, job} = props
  return (
    <View>
      <Text size={14}>签订合同: <Text color={colors.primary}>电子合同</Text></Text>
      <View style={styles.textContainer}>
        <Text size={14} color={colors.grey}>定价 : <Text>¥{job.price}</Text></Text>
        <Text size={14} color={colors.secondary}>需支付首付款 : <Text>¥{job.price * settings.upfrontRate / 100}</Text></Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          small
          caption="联系服务商"
          onPress={() => props.navigation.navigate('Chatting', {to: props.job.hired})}
        />
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <Text size={12} color={colors.primary}
           onPress={() => props.cancelJob({
            id: props.job._id,
            success: () => {props.removeFromMyJobsList({id: props.job._id})}
          })}>取消订单</Text>
          <Button
            small
            bgColor={colors.warning}
            caption="去支付"
            onPress={() => Confirm('提示', '是否确认支付首款？', handlePayment(() => props.makePayment({
              body: {id: props.job._id},
              success: (payload) => {props.updateMyJobsList(payload.data)}
            })))}
          />
        </View>
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
  textContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row'
  }
});

const mapStateToProps = createStructuredSelector({
  settings: settingsListSelector
});

const mapDispatchToProps = {
  makePayment,
  cancelJob,
  removeFromMyJobsList,
  updateMyJobsList
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect) (NotPaidAction)