import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { cancelJob, removeFromMyJobsList, promptJob} from '../../../../../redux/modules/job'
import {Button, Text, toast} from '../../../../../components'
import {colors} from '../../../../../styles'
import {settingsListSelector} from '../../../../../redux/selectors'

const WaitingAction = props => {
  const {settings, job} = props
  return (
    <View>
      <Text size={14}>签订合同: <Text color={colors.primary}>电子合同</Text></Text>
      <View style={styles.textContainer}>
        <Text size={14} color={colors.grey}>定价 : <Text>¥{job.price}</Text></Text>
        <Text size={14} color={colors.secondary}>已支付首付款 : <Text>¥{job.price * settings.upfrontRate / 100}</Text></Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          small
          caption="联系服务商"
          onPress={() => props.navigation.navigate('Chatting', {to: props.job.hired})}
        />
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          {/* <Text size={12} color={colors.primary}
           onPress={() => props.cancelJob({
            id: props.job._id,
            success: () => {props.removeFromMyJobsList({id: props.job._id})}
          })}>取消订单</Text> */}
          <Button
            small
            bgColor={colors.warning}
            caption="催一催"
            onPress={() => props.promptJob({
              id: job._id,
              success: () => toast("催促信息已成功发送")
            })}
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
  },
});

const mapStateToProps = createStructuredSelector({
  settings: settingsListSelector
});

const mapDispatchToProps = {
  cancelJob,
  promptJob,
  removeFromMyJobsList
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect) (WaitingAction)