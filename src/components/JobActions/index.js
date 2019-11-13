import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
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
        onPress={() => alert("Payment")}
        />
    </View>
  )
}

const WaitingAction = props => {
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
        caption="催一催"
        onPress={() => alert("PLEASE!!!")}
      />
    </View>
  )
}

const TestingAction = props => {
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
        caption="查看视频"
        onPress={this.handleClick}
      />
      <Button
        small
        style={styles.button}
        caption="确认验收"
        onPress={() => Confirm('提示', '是否确认验收并支付尾款', () => alert("success"))}
      />
    </View>
  )
}

const FeedbackAction = ({navigation,id}) => {
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
        caption="查看视频"
        onPress={this.handleClick}
      />
      <Button
        small
        style={styles.button}
        caption="评价"
        onPress={() => navigation.navigate('GiveFeedback', {id: id})}
      />
    </View>
  )
}

const FinishingAction = props => {
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
        caption="查看视频"
        onPress={this.handleClick}
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

export {
  NotPaidAction,
  WaitingAction,
  TestingAction,
  FeedbackAction,
  FinishingAction
}