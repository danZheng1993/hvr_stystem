import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import {payUpfront} from '../../../../../redux/modules/payment'
import {updateMyJobsList, cancelJob, removeFromMyJobsList} from '../../../../../redux/modules/job'
import {Button} from '../../../../../components'
import {colors} from '../../../../../styles'
const NotPaidAction = props => {
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
        caption="取消订单"
        onPress={() => props.cancelJob({
          id: props.job._id,
          success: () => {props.removeFromMyJobsList({id: props.job._id})}
        })}
        />
        <Button
        small
        style={styles.button}
        bgColor={colors.warning}
        caption="去支付"
        onPress={() => props.payUpfront({
          body: {id: props.job._id},
          success: (payload) => {props.updateMyJobsList(payload.data)}
        })}
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
  payUpfront,
  cancelJob,
  removeFromMyJobsList,
  updateMyJobsList
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect) (NotPaidAction)