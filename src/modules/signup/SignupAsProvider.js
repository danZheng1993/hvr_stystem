import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';

import { Button } from '../../components';
import { fonts, colors } from '../../styles';
import { Form, TextValidator } from 'react-native-validator-form';
import { signup, sendcode, checkcode } from '../../redux/modules/auth'
import { Text } from '../../components/StyledText';

var timer
class SignupAsProvider extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      phoneNumber: '',
      verificationCode: '',
      password: '',
      passwordConfirm: '',
      counter: 60,
    };
  }

  componentWillMount() {
    // custom rule will have name 'isPasswordMatch'
    Form.addValidationRule('isPasswordMatch', (value) => {
      if (value !== this.state.password) {
          return false;
      }
      return true;
    });
  }

  componentWillUnmount() {
    Form.removeValidationRule('isPasswordMatch');
  }
  sendCode = () => {
    const { phoneNumber } = this.state
    if(phoneNumber.length != 11 || !Number.isInteger(+phoneNumber)) return;

    this.props.sendcode({
      body: { phoneNumber: phoneNumber},
      success: () => {
        timer = setInterval(this.countTime, 1000)
      }
    })
  }

  countTime = () => {
    var {counter} = this.state
    counter --;
    if (counter == 0) {       
      counter = 60
      clearInterval(timer)
    }
    this.setState({counter})
  }

  submit = () => {
    alert("submit")
    const { phoneNumber, verificationCode, password, passwordConfirm, counter} = this.state

    if (!phoneNumber || !verificationCode || !password || !passwordConfirm || password!=passwordConfirm) return;
    if (counter == 60) {
      alert("try again")
      return;
    }
    clearInterval(timer)
    this.props.checkcode({
      body:{ phoneNumber, code: verificationCode, password, role: 'provider'},
      success: () => this.props.navigation.navigate({ routeName: 'BasicProfile' }),
      fail:() => alert("invalid code")
    })
  }

  handleSubmit = () => {
      this.refs.form.submit();
  }

  render(){
    const { counter } = this.state
    return (
      <View style={styles.container}>
        <Text size={14}>
          {counter}
        </Text>
        <Form
            ref="form"
            onSubmit={this.submit}
        >
          <TextValidator
            name="phoneNumber"
            label='手机号'
            validators={['required', 'matchRegexp:^[0-9]{11}$']}
            errorMessages={['This field is required', 'invalid phone number']}
            placeholder="输入手机号"
            type="text"
            keyboardType="numeric"
            value={this.state.phoneNumber}
            onChangeText={phoneNumber => this.setState({ phoneNumber })}
          />
          <View style={styles.verificationCode}>
            <View style={{ marginBottom: 15, flex: 3}}>
              <TextValidator
                name="verificationCode"
                validators={['required', 'matchRegexp:^[0-9]{4}$']}                 
                errorMessages={['This field is required', 'invalid code']}
                outlined
                label='输入验证码'
                type="text"
                placeholder="输入验证码"
                value={this.state.verificationCode}
                onChangeText={verificationCode => this.setState({ verificationCode })}
              />
            </View>
            <Button
              bgColor={colors.info}
              style={{ marginBottom: 20, flex: 2,}}
              caption="获取验证码"
              onPress={() => this.sendCode()}
            />
          </View>
          <TextValidator
            style={styles.input}
            outlined
            validators={['required', 'minStringLength:6', 'maxStringLength:20']}                 
            errorMessages={['This field is required', 'password must be at least 6 characters', 'password is length must be less than 20']}
            label='设置密码'
            placeholder="设置密码（6-20位字母数字组合)"
            value={this.state.password}
            secureTextEntry
            maxLength={20}
            onChangeText={password => this.setState({ password })}
          />
          <TextValidator
            style={styles.input}
            outlined
            validators={['required', 'isPasswordMatch']}                 
            errorMessages={['This field is required', 'password mismatch']}
            label='确认密码'
            placeholder="确认密码"
            secureTextEntry
            value={this.state.passwordConfirm}
            onChangeText={passwordConfirm => this.setState({ passwordConfirm })}
            />
            <View style={styles.buttonsContainer}>
              <Button
                large
                bgColor={colors.warning}
                style={styles.button}
                caption="确定"
                onPress={this.handleSubmit}
            />
          </View>
        </Form>   
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  description: {
    marginBottom: 20,
    padding: 20,
    alignSelf: 'stretch'
  },
  buttonsContainer: {
    flex: 2,
    alignItems: 'center',
    alignSelf: 'stretch',
    margin: 20
  },
  button: {
    marginBottom: 20,
  },
  description: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  input: {
    marginBottom: 15,
  },
  verificationCode: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});


const mapStateToProps = createStructuredSelector({
});

const mapDispatchToProps = {
  signup,
  sendcode,
  checkcode
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(SignupAsProvider);
