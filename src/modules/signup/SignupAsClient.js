import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

import { Button } from '../../components';
import { fonts, colors } from '../../styles';

import { Text } from '../../components/StyledText';
import SignupForm from './SignupForm'
import constants from '../../constants'
import SendVerificationCode from '../components/SendVerificationCode';
export default class SignupAsClient extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      signupMethod: constants.NORMAL_SIGNUP
    }
  }
  handleClick = () => {
    props.navigation.navigate({ routeName: 'BasicProfile' })
  };
  handleWeChat = () => {
    this.setState({signupMethod: constants.SMS_VERIFICATION})
  }
  handleQQ = () => {
    this.setState({signupMethod: constants.SMS_VERIFICATION})
  }
  handleWeibo = () => {
    this.setState({signupMethod: constants.SMS_VERIFICATION})
  }
  render () {
    const { signupMethod } = this.state
    return (
      <View style={styles.container}>
        {(signupMethod == constants.NORMAL_SIGNUP) && <>
          <View style={styles.description}>
            <SignupForm />
          </View>
          <View style={styles.buttonsContainer}>
            <Button
              large
              bgColor={colors.warning}
              style={styles.button}
              caption="确定"
              onPress={() => this.handleClick}
            />
          </View>
          <View style={styles.touch}>
            <TouchableOpacity onPress={this.handleWeChat}>
                <Image
                  source={require('../../../assets/images/wechat.png')}
                  style={styles.photo}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.handleQQ}>
                <Image
                  source={require('../../../assets/images/qq.png')}
                  style={styles.photo}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.handleWeibo}>
                <Image
                  source={require('../../../assets/images/weibo.png')}
                  style={styles.photo}
                />
            </TouchableOpacity>
          </View></>
        }
        {(signupMethod == constants.SMS_VERIFICATION) && <>
          <SendVerificationCode />
        </>}
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
  photo: {
    borderRadius: 25,
    width: 50,
    height: 50
  },
  touch: {
    flexDirection: 'row',
    justifyContent: 'space-between'
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
});
