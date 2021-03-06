import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { Form, TextValidator } from 'react-native-validator-form';
import SyncStorage from 'sync-storage';
import { CommonActions } from '@react-navigation/native';
import Pushy from 'pushy-react-native';
import * as WeChat from 'react-native-wechat-lib';

import { Button, toast, Loader } from '../../components';
import { colors } from '../../styles';
import { Text } from '../../components/StyledText';
import { login, registerPushyToken } from '../../redux/modules/auth'
import { profileSelector, authloadingSelector, tokenSelector } from '../../redux/selectors'
import { loadItem } from '../../redux/api/storage';
import constants from '../../constants';

class LoginWithPassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      phoneNumber: '',
      password: '',
      authLoading: false,
    }
  }

  handleWeChat = async () => {
    try {
      const isInstalled = await WeChat.isWXAppInstalled();
      if (isInstalled) {
        const result = await WeChat.sendAuthRequest('snsapi_userinfo', 'wechat_hvr_integration');
        this.setState({ authLoading: true });
        this.props.login({
          body: { code: result.code, type: 'wechat' },
          success: this.redirect,
          fail: () => {
            this.setState({ authLoading: false });
            toast("帐户尚未关联!");
          }
        })
      } else {
        toast("未安装微信应用");
      }
    } catch (err) {
      console.log('wechat auth fail', err);
    }
  }

  handleClick = () => {
    const { phoneNumber, password} = this.state  
    this.setState({ authLoading: true });
    this.props.login({
      body: {phoneNumber, password},
      success: this.redirect,
      fail: () => {
        this.setState({ authLoading: false });
        toast("电话号码或密码有误!");
      }
    })
  };
  
  redirect = (res) => {
    const { navigation, registerPushyToken, deviceToken } = this.props;
    this.setState({ authLoading: false });
    console.log({ deviceToken });
    registerPushyToken({ deviceToken });
    const profile = res.data;
    toast("登录成功")
    Pushy.subscribe('all');
    setTimeout(() => {
      if (profile.info.role == 'provider') {
        Pushy.subscribe('provider');
        navigation.reset({
          routes: [{ name: 'Provider' }],
          index: 0
        });
      } else if (profile.info.role =='client'){
        Pushy.subscribe('client');
        navigation.reset({
          routes: [{ name: 'Client' }],
          index: 0
        });
      }
    }, 300);
  }

  render() {
    const {loading, profile} = this.props
    const { authLoading } = this.state;
    return (
      <View style={styles.container}>
        { <Loader
            loading={loading && authLoading} /> }
        <View style={styles.description}>
          <Text size={28} black bold>
              登录HVR
          </Text>
          <Text size={14} color={colors.description}>
              登录使用更多服务
          </Text>
        </View>
        <View style={{alignSelf: 'stretch'}}>
          <Form
            ref="form"
            onSubmit={this.handleClick}
          >
            <TextValidator
              style={styles.input}
              name="phoneNumber"
              maxLength={11}
              label='手机号'
              validators={['required', 'matchRegexp:^[0-9]{11}$']}
              errorMessages={['需要输入此项', '无效电话号码']}
              placeholder="输入手机号"
              type="text"
              value={this.state.phoneNumber}
              onChangeText={phoneNumber => this.setState({ phoneNumber })}
            />
            <TextValidator
              style={styles.input}
              outlined
              validators={['required', 'minStringLength:6', 'maxStringLength:20']}                 
              errorMessages={['需要输入此项', '密码至少6字以上', '密码最多20字以下']}
              label='设置密码'
              placeholder="设置密码（6-20位字母数字组合)"
              value={this.state.password}
              secureTextEntry
              maxLength={20}
              onChangeText={password => this.setState({ password })}
            />
            <Button
              large
              bgColor={colors.primary}
              style={styles.button}
              caption="确定"
              onPress={() => this.refs.form.submit()}
            />
          </Form>   
          {/* <View style={styles.anchor}>
            <View style={[styles.inputWrap, {alignItems: 'flex-start'}]}>
              <Text size={14} color={colors.primary} onPress={() => this.props.navigation.navigate('LoginWithSMS')}>
              手机验证码登录
              </Text>
            </View>           
            <View style={[styles.inputWrap, {alignItems: 'flex-end'}]}>
              <Text size={14} color={colors.primary} onPress={() => this.props.navigation.navigate('PasswordRecovery')}>
              忘记密码?
              </Text>
            </View>
          </View> */}
        </View>
          
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
      </View>
    );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 60,
    paddingVertical: 30,
    backgroundColor: 'white',
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
    fontSize: 16,
  },
  photo: {
    borderRadius: 25,
    width: 50,
    height: 50
  },
  input: {
    marginBottom: 15,
    fontSize: 16,
  },
  touch: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  anchor: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  inputWrap: {
    flex: 1,
    justifyContent: 'flex-start',
  },
});


const mapStateToProps = createStructuredSelector({
  profile: profileSelector,
  loading: authloadingSelector,
  deviceToken: tokenSelector,
});

const mapDispatchToProps = {
  login,
  registerPushyToken,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(LoginWithPassword);
