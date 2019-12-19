import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';

import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { Button, Loader, toast } from '../../components';
import { fonts, colors } from '../../styles';
import { Form, TextValidator } from 'react-native-validator-form';
import Icon from 'react-native-vector-icons/FontAwesome'
import { Text } from '../../components/StyledText';
import {login} from '../../redux/modules/auth'
import { profileSelector, authloadingSelector } from '../../redux/selectors'
import XMPP from 'react-native-xmpp'
import { loadItem } from '../../redux/api/storage';
import SyncStorage from 'sync-storage';
import {NavigationActions} from 'react-navigation'
class LoginWithPassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      phoneNumber: '22222222222',
      password: '222222',
    }
  }
  handleClick = () => {
    const { phoneNumber, password} = this.state  
    this.props.login({
      body: {phoneNumber, password},
      success: () =>     this.redirect(),
      fail: () => toast("电话号码或密码有误!")
    })
  };
  
  redirect() {
    loadItem('hvr_auth').then((val) => {
      const {profile} = this.props
      if (!profile) return
      const token = SyncStorage.get('token') || ''
      toast("login success!")
      XMPP.connect(`${profile._id}@192.168.31.207/spark`, token.slice(0,8),'RNXMPP.PLAIN','192.168.31.207',5222)
      if (profile.role == 'provider') {
        this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Provider' })], 0)
      } else if (profile.role =='client'){
        this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Client' })], 0)
      }
    })
  }

  render() {
    const {loading, profile} = this.props

    return (
        <View style={styles.container}>
          {/* { <Loader
            loading={loading} /> } */}
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
            <View style={styles.anchor}>
            <View style={[styles.inputWrap, {alignItems: 'flex-start'}]}>
              <Text size={14} color={colors.primary} onPress={() => this.props.navigation.navigate({ routeName: 'LoginWithSMS' })}>
              手机验证码登录
              </Text>
            </View>           
            <View style={[styles.inputWrap, {alignItems: 'flex-end'}]}>
              <Text size={14} color={colors.primary} onPress={() => this.props.navigation.navigate({ routeName: 'PasswordRecovery' })}>
              忘记密码?
              </Text>
            </View>
          </View>
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
              <TouchableOpacity style={{flex: 1, alignItems: 'center'}} onPress={this.handleQQ}>
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
              </TouchableOpacity>
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
    paddingHorizontal: 70,
    paddingVertical: 30
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
  photo: {
    borderRadius: 25,
    width: 50,
    height: 50
  },
  input: {
    marginBottom: 15,
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
  loading: authloadingSelector
});

const mapDispatchToProps = {
  login,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(LoginWithPassword);
