import React from 'react'

import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';

import { View, StyleSheet } from 'react-native'
import  CodePin  from 'react-native-pin-code'

import { colors } from '../../styles'
import { Text } from '../../components/StyledText';
import {checkcode} from '../../redux/modules/auth'

class CheckVerificationCode extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  handleCheck = (code, callback) => {
    const {phoneNumber, checkcode} = this.props
    let res = false
    checkcode({
      body:{ phoneNumber, code: code},
      success: () => callback(true),
      fail: () => callback(false)
    })
  }
  handleSuccess = () => {
    const {onSuccess} = this.props
    onSuccess()
  }

  render() {
    const {phoneNumber} = this.props
    return (
      <View style={{alignItems: 'center'}}>
          <Text size={28} black bold>
            输入短信验证码
          </Text>
          <Text size={14} black>
            验证码已发送至  {phoneNumber}
          </Text>
          <CodePin
            number={4} // You must pass number prop, it will be used to display 4 (here) inputs
            checkPinCode={(code, callback) => (this.handleCheck(code, callback))}
            success={() => this.handleSuccess()} // If user fill '2018', success is called
            text="" // My title
            error="请输入正确的验证码，再试一次" // If user fail (fill '2017' for instance)
            autoFocusFirst={false} // disabling auto-focus
          />
      </View>    
    )
  }
}

const styles = StyleSheet.create({
 
});

const mapStateToProps = createStructuredSelector({
});

const mapDispatchToProps = {
  checkcode,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(CheckVerificationCode);
