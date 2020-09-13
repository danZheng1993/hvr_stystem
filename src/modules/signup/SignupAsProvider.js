import React from 'react';
import {
  StyleSheet,
  View,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';

import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { CommonActions } from '@react-navigation/native';
import Pushy from 'pushy-react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import * as WeChat from 'react-native-wechat-lib';

import { Button } from '../../components';
import { colors } from '../../styles';
import { Form, TextValidator } from 'react-native-validator-form';
import { signup, sendcode, checkcode, registerPushyToken } from '../../redux/modules/auth'
import { Text } from '../../components/StyledText';
import { tokenSelector } from '../../redux/selectors';

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

  handleWeChat = async () => {
    // Linking.openURL(`${constants.BASE_URL}/auth/wechat`);
    try {
      const result = await WeChat.sendAuthRequest('snsapi_userinfo', 'wechat_hvr_integration');
      this.props.signup({
        body: { code: result.code, role: 'client', type: 'client' },
        success: () => {
          setTimeout(() => {
            Pushy.subscribe('all');
            Pushy.subscribe('client');
            const { deviceToken, registerPushyToken } = this.props;
            registerPushyToken({ deviceToken });
            this.props.navigation.reset({
              routes: [{ name: 'BasicProfile' }],
              index: 0
            });
          }, 300);
        },
        fail:() => Alert.alert("无法注册")
      })
    } catch (err) {
      console.log('wechat auth fail', err);
    }
  }

  submit = () => {
    const { phoneNumber, verificationCode, password, passwordConfirm, counter} = this.state

    if (!phoneNumber || !verificationCode || !password || !passwordConfirm || password!=passwordConfirm) return;
    if (counter == 60) {
      Alert.alert("try again")
      return;
    }
    clearInterval(timer)
    this.props.checkcode ({
      body:{ phoneNumber, code: verificationCode, password, role: 'provider'},
      success: () => {
        setTimeout(() => {
          console.log('provider signup');
          const { deviceToken, registerPushyToken } = this.props;
          registerPushyToken({ deviceToken });
          Pushy.subscribe('all');
          Pushy.subscribe('provider');
          this.props.navigation.reset({
            routes: [{ name: 'BasicProfile' }],
            index: 0
          });
        }, 300);
      },
      fail:() => Alert.alert("验证码出错")
    })
  }

  handleSubmit = () => {
      this.refs.form.submit();
  }

  render(){
    const { counter } = this.state

    return (
      <KeyboardAwareScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Text size={28} bold black>服务方注册</Text>
        <Form
            ref="form"
            onSubmit={this.submit}
            style={{alignSelf: 'stretch'}}
        >
          <TextValidator
            name="phoneNumber"
            maxLength={11}
            label='手机号'
            validators={['required', 'matchRegexp:^[0-9]{11}$']}
            errorMessages={['必填此项', '电话号码有误']}
            placeholder="输入手机号"
            type="text"
            keyboardType="numeric"
            value={this.state.phoneNumber}
            onChangeText={phoneNumber => this.setState({ phoneNumber })}
          />
          <View style={styles.verificationCode}>
            <View style={{ marginBottom: 15, flex: 4}}>
              <TextValidator
                name="verificationCode"
                validators={['required', 'matchRegexp:^[0-9]{4}$']}                 
                errorMessages={['必填此项', '验证码出错']}
                outlined
                label='输入验证码'
                type="text"
                placeholder="输入验证码"
                value={this.state.verificationCode}
                onChangeText={verificationCode => this.setState({ verificationCode })}
              />
            </View>
            <View style={{alignSelf: 'center'}}>
              {counter == 60 ? (
                <TouchableOpacity style={{ paddingHorizontal: 16, paddingVertical: 8 }} onPress={() => this.sendCode()}>
                  <Text style={{color: colors.primary}}>获得验证码 </Text>  
                </TouchableOpacity>
              ) : (
                <Text style={{color: colors.description}}>{counter}s 重新获取 </Text>
              )}
            </View>
          </View>
          <TextValidator
            style={styles.input}
            outlined
            validators={['required', 'minStringLength:6', 'maxStringLength:20']}                 
            errorMessages={['必填此项', '密码需要输入6字以上', '密码输入限制20字以下']}
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
            errorMessages={['必填此项', '密码出错']}
            label='确认密码'
            placeholder="确认密码"
            secureTextEntry
            value={this.state.passwordConfirm}
            onChangeText={passwordConfirm => this.setState({ passwordConfirm })}
          />
          <Button
            large
            style={styles.button}
            bgColor={colors.primary}
            caption="确定"
            onPress={this.handleSubmit}
          />
        </Form>   
        <View style={{alignItems: 'center', borderTopWidth: 1, borderTopColor: colors.greybackground}}>
          <Text size={12} color={colors.description}>使用第三方登录</Text>
          <View style={styles.touch}>
            <TouchableOpacity style={{flex: 1, alignItems: 'center'}} onPress={this.handleWeChat}>
              <Image
                source={require('../../../assets/images/wechat.png')}
                style={styles.photo}
              />
            </TouchableOpacity>
            {/* <TouchableOpacity style={{flex: 1, alignItems: 'center'}} onPress={this.handleQQ}>
              <Image
                source={require('../../../assets/images/qq.png')}
                style={styles.photo}
              />
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1, alignItems: 'center'}} onPress={this.handleWeibo}>
              <Image
                source={require('../../../assets/images/weibo.png')}
                style={styles.photo}
              />
            </TouchableOpacity> */}
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 70,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  buttonsContainer: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  description: {
    alignItems: "center",
  },
  button: {
    alignSelf: 'stretch',
  },
  input: {
    marginBottom: 15,
  },
  verificationCode: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  touch: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  photo: {
    borderRadius: 25,
    width: 50,
    height: 50
  },
});


const mapStateToProps = createStructuredSelector({
  deviceToken: tokenSelector
});

const mapDispatchToProps = {
  signup,
  sendcode,
  checkcode,
  registerPushyToken,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(SignupAsProvider);
