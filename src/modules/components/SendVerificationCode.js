import React from 'react'

import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';

import { View, StyleSheet } from 'react-native'

import { colors } from '../../styles'
import { Button } from '../../components';
import { Text } from '../../components/StyledText';
import {sendcode} from '../../redux/modules/auth'
import CheckVerificationCode from './CheckVerificationCode';
import { Form, TextValidator } from 'react-native-validator-form';

var timer
class SendVerificationCode extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    phoneNumber: '',
    isCheck: false,
    counter: 10,
  }
  
  handleClick = () => {
    const { phoneNumber } = this.state
    const { onSuccess } = this.props
    if(phoneNumber.length != 11 || !Number.isInteger(+phoneNumber)) return;
    this.props.sendcode({
      body: { phoneNumber: phoneNumber},
      success: () => {    
        timer = setInterval(this.countTime, 1000)
        this.setState({isCheck: true})
      }
    })
  };
  
  countTime = () => {
    var {counter} = this.state
    counter --;
    if (counter == 0) {       
      counter = 60
      clearInterval(timer)
      this.setState({isCheck: false})
    }
    this.setState({counter})
  }

  componentWillUnmount() {
    clearInterval(timer)
  }

  render() {
    const {isCheck, phoneNumber, counter} = this.state
    return (
      <View style={{alignItems: 'center'}}>
        {!isCheck ? <View>
          <View style={styles.description}>
            <Text size={28} black bold>
              需求方登录
            </Text>
            <Text size={14} color={colors.description}>
              登录使用更多服务
            </Text>
          </View>
          <Form
              ref="form"
              onSubmit={this.handleClick}
          >
            <TextValidator
              name="phoneNumber"
              maxLength={11}
              label='手机号'
              validators={['required', 'matchRegexp:^[0-9]{11}$']}
              errorMessages={['必填此项', '电话号码有误']}
              placeholder="输入手机号"
              type="text"
              style={{width: 300}}
              value={this.state.phoneNumber}
              onChangeText={phoneNumber => this.setState({ phoneNumber })}
            />
            <Button
              large
              bgColor={colors.primary}
              style={styles.button}
              caption="确定"
              onPress={() => this.refs.form.submit()}
            />
          </Form> 
        </View> :
        <View>
          <CheckVerificationCode phoneNumber = {phoneNumber} onSuccess = {this.props.onSuccess}/>
          <View style={styles.description}>
            <Text>{counter}后可重新发送</Text>
          </View>
        </View>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 15,
  },
  description: {
    padding: 20,
    marginBottom: 20,
    alignSelf: 'stretch',
    alignItems: 'center'
  },
  buttonsContainer: {
    alignSelf: 'stretch',
    margin: 20
  },
  button: {
    marginBottom: 20,
    alignSelf: 'stretch',
  },
  
});

const mapStateToProps = createStructuredSelector({
});

const mapDispatchToProps = {
  sendcode,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(SendVerificationCode);
