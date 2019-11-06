import React from 'react';
import { TextInput, HelperText } from 'react-native-paper';
import {
  StyleSheet,
  View,
  Image,
} from 'react-native';

import { Button } from '../../components';
import { fonts, colors } from '../../styles';
import { Form, TextValidator } from 'react-native-validator-form';

import { Text } from '../../components/StyledText';
export default class SignupForm extends React.Component {
    state = {
        phoneNumber: '',
        verificationCode: '',
        password: '',
        passwordConfirm: '',
    };
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
    handleClick = () => {

    }
    submit = () => {
        // your submit logic
        alert("ddd")
    }
    handleSubmit = () => {
      this.refs.form.submit();
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
                    // keyboardType="email-address"
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
                        onPress={() => this.handleClick()}
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
