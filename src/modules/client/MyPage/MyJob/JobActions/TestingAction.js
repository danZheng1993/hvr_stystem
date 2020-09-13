import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import {finalPay} from '../../../../../redux/modules/payment'
import {updateMyJobsList} from '../../../../../redux/modules/job'
import {Button, Confirm, Text} from '../../../../../components'
import {settingsListSelector} from '../../../../../redux/selectors'
import {colors} from '../../../../../styles'

const TestingAction = props => {
  const {job, settings} = props
  const [media, setMedia] = useState(null);
  useEffect(() => {
    getMedia();
  })

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
        <View style={{flexDirection: 'row'}}>
          {media && (
            <Button
              small
              bordered
              primary
              caption="查看视频"
              style={{marginRight: 5}}
              onPress={() => navigation.navigate('Player', { url: media.path })}
            />
          )}
          <Button
            small
            bgColor={colors.warning}
            caption="确认验收"
            onPress={() => Confirm('提示', '确认验收并支付尾款吗？', () => props.finalPay({
              body: {id: props.job._id},
              success: (payload) => {props.updateMyJobsList(payload.data)}
            }))}
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
  finalPay,
  updateMyJobsList
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect) (TestingAction)