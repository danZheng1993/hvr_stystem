import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import {finalPay} from '../../../../../redux/modules/payment'
import {updateMyJobsList} from '../../../../../redux/modules/job'
import {Button, Confirm} from '../../../../../components'
import {colors} from '../../../../../styles'

const TestingAction = props => {
  return (
    <View style={styles.buttonsContainer}>
      <Button
        small
        style={styles.button}
        caption="联系服务商"
        onPress={() => props.navigation.navigate('Chatting', {to: props.job.hired})}
      />
      <Button
        small
        style={styles.button}
        caption="查看视频"
        onPress={() => props.navigation.navigate('Player')}
      />
      <Button
        small
        bgColor={colors.warning}
        style={styles.button}
        caption="确认验收"
        onPress={() => Confirm('提示', '是否确认验收并支付尾款', () => props.finalPay({
          body: {id: props.job._id},
          success: (payload) => {props.updateMyJobsList(payload.data)}
        }))}
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

const mapStateToProps = createStructuredSelector({

});

const mapDispatchToProps = {
  finalPay,
  updateMyJobsList
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect) (TestingAction)