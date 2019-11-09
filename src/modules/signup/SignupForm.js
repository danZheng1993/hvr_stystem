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

class SignupForm extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        phoneNumber: '',
        verificationCode: '',
        password: '',
        passwordConfirm: '',
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
        // success: () 
      })
    }
    checkCode = () => {
      alert("aaaa")
      console.log(this.refs)
      // alert("aaa")
      // const {phoneNumber, verificationCode} = this.state
      // if(phoneNumber.length != 11 || !Number.isInteger(+phoneNumber) || verificationCode.length!=4) return;
      // this.props.checkcode({
      //   body: {phoneNumber: phoneNumber, code: +verificationCode}
      // })
    }

    handleSubmit = () => {
      const { phoneNumber, verificationCode, password, passwordConfirm} = this.state

      if (!phoneNumber || !verificationCode || !password || !passwordConfirm || password!=passwordConfirm) return;
      this.props.checkcode({
        body:{ phoneNumber, code: verificationCode},
        success: () => this.props.signup({
          body: {phoneNumber, password},
          success: () => this.props.navigation.navigate({ routeName: 'BasicProfile' })
        }),
        fail:() => alert("invalid code")
      })
    }
    render(){
        return (
           <>
            <Form
                ref="form"
                onSubmit={this.handleSubmit}
            >
                <TextValidator
                    name="phoneNumber"
                    label='手机号'
                    validators={['required', 'matchRegexp:^[0-9]{11}$']}
                    errorMessages={['This field is required', 'invalid phone number']}
                    placeholder="输入手机号"
                    type="text"
                    keyboardType="email-address"
                    value={this.state.phoneNumber}
                    onChangeText={phoneNumber => this.setState({ phoneNumber })}
                />
                <View style={styles.verificationCode}>
                    <TextValidator
                        name="verificationCode"
                        style={{ marginBottom: 15}}
                        validators={['required', 'matchRegexp:^[0-9]{4}$']}                 
                        errorMessages={['This field is required', 'invalid code']}
                        outlined
                        label='输入验证码'
                        type="text"
                        placeholder="输入验证码"
                        value={this.state.verificationCode}
                        onChangeText={verificationCode => this.setState({ verificationCode })}
                    />
                    <Button
                        large
                        bgColor={colors.info}
                        style={styles.button}
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
            </>
        );
    }
}

const styles = StyleSheet.create({
  container: {
      
  },
  buttonsContainer: {
    flex: 2,
    alignItems: 'center',
    alignSelf: 'stretch',
    margin: 20
  },
  button: {
    marginBottom: 20,
    alignSelf: 'flex-end',
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

export default compose(withConnect)(SignupForm);
