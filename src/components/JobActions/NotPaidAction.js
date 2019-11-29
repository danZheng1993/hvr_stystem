import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import {payUpfront} from '../../redux/modules/payment'
import {updateResult} from '../../redux/modules/job'
import Button from '../Button'
import Confirm from '../Confirm'

const NotPaidAction = props => {
  return (
    <View style={styles.buttonsContainer}>
        <Button
        small
        style={styles.button}
        caption="联系服务商"
        onPress={this.handleClick}
        />
        <Button
        small
        style={styles.button}
        caption="取消订单"
        onPress={this.handleClick}
        />
        <Button
        small
        style={styles.button}
        caption="去支付"
        onPress={() => props.payUpfront({
          body: {id: props.id},
          success: (payload) => {props.updateResult(payload.data)}
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
    marginTop: 20
  },

  button: {
  },
});

const mapStateToProps = createStructuredSelector({

});

const mapDispatchToProps = {
  payUpfront,
  updateResult
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect) (NotPaidAction)