import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import SyncStorage from 'sync-storage';
import Pushy from 'pushy-react-native';

import {loadItem} from '../../redux/api/storage'
import { profileSelector, tokenSelector } from '../../redux/selectors'
import SendVerificationcode from '../components/SendVerificationCode'
import colors from '../../styles/colors'
import {Text} from '../../components'
import constants from '../../constants';
import { registerPushyToken } from '../../redux/modules/auth';

class LoginWithSMS extends React.Component {

    onSuccess = () => {
      const { deviceToken, registerPushyToken } = this.props;
      registerPushyToken({ deviceToken });
      loadItem('hvr_auth').then((val) => {
        const profile = JSON.parse(val);
        if (!profile) return
        const token = SyncStorage.get('token') || ''
        toast("登录成功!")
        Pushy.subscribe('all');
        if (profile.role == 'provider') {
          Pushy.subscribe('provider');
          this.props.navigation.reset({
            routes: [{ name: 'Provider' }],
            index: 0
          });
        } else if (profile.role =='client'){
          Pushy.subscribe('client');
          this.props.navigation.reset({
            routes: [{ name: 'Client' }],
            index: 0
          });
        }
      })
    }

    render(){
      return (
        <View style={styles.container}>
          <View>
            <SendVerificationcode navigation={this.props.navigation} onSuccess={this.onSuccess} />
            <View style={styles.anchor}>
              <View style={[styles.inputWrap, {alignItems: 'flex-start'}]}>
                <Text size={14} color={colors.primary} onPress={() => this.props.navigation.navigate('LoginWithPassword')}>
              密码登录
                </Text>
              </View>           
              <View style={[styles.inputWrap, {alignItems: 'flex-end'}]}>
                <Text size={14} color={colors.primary} onPress={() => this.props.navigation.navigate('PasswordRecovery')}>
              忘记密码?
                </Text>
              </View>
            </View>
          </View>
          {/* <View style={{alignItems: 'center', alignSelf: 'flex-end', borderTopWidth: 1, borderTopColor: colors.greybackground}}>
            <Text color={colors.description}>使用第三方登录</Text>
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
          </View> */}
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
  photo: {
    borderRadius: 25,
    width: 50,
    height: 50
  },
  touch: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  anchor: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  inputWrap: {
    flex: 1,
    justifyContent: 'flex-start',
  }
});


const mapStateToProps = createStructuredSelector({
  profile: profileSelector,
  deviceToken: tokenSelector,
});

const mapDispatchToProps = {
  registerPushyToken
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(LoginWithSMS);
