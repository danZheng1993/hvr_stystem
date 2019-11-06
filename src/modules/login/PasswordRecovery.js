import React from 'react';
import { TextInput, HelperText } from 'react-native-paper';
import {
  StyleSheet,
  View,
  Image,
} from 'react-native';

import { Button } from '../../components';
import { fonts, colors } from '../../styles';

import { Text } from '../../components/StyledText';
export default class PasswordRecovery extends React.Component {
    state = {
        phoneNumber: '',
        verificationCode: '',
        password: '',
        passwordConfirm: '',
    };
    handleClick = () => {

    }
    render(){
        return (
        <View style={styles.container}>
          <View style={styles.description}>
            
                <TextInput
                    style={styles.input}
                    outlined
                    label='手机号'
                    placeholder="输入手机号"
                    value={this.state.phoneNumber}
                    onChangeText={phoneNumber => this.setState({ phoneNumber })}
                />
                {/* <HelperText
                  type="error"
                  visible={!this.state.phoneNumber.includes('/[0-9]/')}
                >
                  Phone number is invalid!
                </HelperText> */}
                <View style={styles.verificationCode}>
                    <TextInput
                        style={{width: '50%', marginBottom: 15}}
                        outlined
                        label='输入验证码'
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
                <TextInput
                    style={styles.input}
                    outlined
                    label='设置密码'
                    placeholder="设置密码（6-20位字母数字组合)"
                    value={this.state.password}
                    secureTextEntry
                    onChangeText={password => this.setState({ password })}
                />
                <TextInput
                    style={styles.input}
                    outlined
                    label='确认密码'
                    placeholder="确认密码"
                    secureTextEntry
                    value={this.state.passwordConfirm}
                    onChangeText={passwordConfirm => this.setState({ passwordConfirm })}
                />
          </View>
          <View style={styles.buttonsContainer}>
            <Button
              large
              bgColor={colors.warning}
              style={styles.button}
              caption="确认"
              onPress={() => this.handleClick()}
            />
          </View>
        </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  buttonsContainer: {
    alignSelf: 'stretch',
    margin: 20
  },
  button: {
    marginBottom: 20,
    alignSelf: 'stretch',
  },
  description: {
    padding: 20,
    marginBottom: 20,
    alignSelf: 'stretch'
  },
  input: {
    marginBottom: 15,
  },
  verificationCode: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});
