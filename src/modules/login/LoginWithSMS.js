import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import {NavigationActions} from 'react-navigation'
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import {loadItem} from '../../redux/api/storage'
import { profileSelector } from '../../redux/selectors'
import SendVerificationcode from '../components/SendVerificationCode'
import SyncStorage from 'sync-storage'
import colors from '../../styles/colors'
import {Text} from '../../components'
import XMPP from 'react-native-xmpp'
import constants from '../../constants';

class LoginWithSMS extends React.Component {

    onSuccess = () => {
      console.warn('success')
      loadItem('hvr_auth').then((val) => {
        const {profile} = this.props
        if (!profile) return
        const token = SyncStorage.get('token') || ''
        toast("登录成功!")
        XMPP.connect(profile._id + constants.JID, token.slice(0,8),'RNXMPP.PLAIN',constants.IP,5222)
        if (profile.role == 'provider') {
          this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Provider' })], 0)
        } else if (profile.role =='client'){
          this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Client' })], 0)
        }
      })
    }

    render(){
      return (
        <View style={styles.container}>
          <View>
          <SendVerificationcode navigation={this.props.navigation} onSuccess={this.onSuccess}/>
          <View style={styles.anchor}>
            <View style={[styles.inputWrap, {alignItems: 'flex-start'}]}>
              <Text size={14} color={colors.primary} onPress={() => this.props.navigation.navigate({ routeName: 'LoginWithPassword' })}>
              密码登录
              </Text>
            </View>           
            <View style={[styles.inputWrap, {alignItems: 'flex-end'}]}>
              <Text size={14} color={colors.primary} onPress={() => this.props.navigation.navigate({ routeName: 'PasswordRecovery' })}>
              忘记密码?
              </Text>
            </View>
          </View>
          </View>
          <View style={{alignItems: 'center', alignSelf: 'flex-end', borderTopWidth: 1, borderTopColor: colors.greybackground}}>
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
  profile: profileSelector
});

const mapDispatchToProps = {
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(LoginWithSMS);
