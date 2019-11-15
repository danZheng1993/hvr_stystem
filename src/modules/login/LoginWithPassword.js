import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';

import {TextInput} from 'react-native-paper'
import { Button, Loader, toast } from '../../components';
import { fonts, colors } from '../../styles';
import { Form, TextValidator } from 'react-native-validator-form';

import { Text } from '../../components/StyledText';
import toaster from 'toasted-notes';

import {login, getProfile} from '../../redux/modules/auth'
import { profileSelector, authloadingSelector } from '../../redux/selectors'

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
      // success: () => getprofile(),
      // fail: () => toast("Phone number or password is wrong!")
    })
  };
  
  redirect() {
    const {profile} = this.props
    if (!profile) return
    toast("login success!")
    console.log(">>>>>>>>>Profile",profile)
    if (profile.role == 'provider') {
      this.props.navigation.navigate({ routeName: 'Provider' })
    } else if (profile.role =='client'){
      this.props.navigation.navigate({ routeName: 'Client' })
    }
  }
  componentDidUpdate() {
    this.redirect()
  }

  render() {
    const {loading, profile} = this.props

    return (
      <View style={styles.container}>
        {/* { <Loader
          loading={loading} /> } */}
        <View style={styles.description}>
          <Text size={18} black>
            登录HVR
          </Text>
          <Text size={14} black>
            登录使用更多服务
          </Text>
          <Form
                ref="form"
                onSubmit={this.handleClick}
            >
                <TextValidator
                    name="phoneNumber"
                    label='手机号'
                    validators={['required', 'matchRegexp:^[0-9]{11}$']}
                    errorMessages={['This field is required', 'invalid phone number']}
                    placeholder="输入手机号"
                    type="text"
                    value={this.state.phoneNumber}
                    onChangeText={phoneNumber => this.setState({ phoneNumber })}
                />
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
                <View style={styles.buttonsContainer}>
                  <Button
                    large
                    bgColor={colors.warning}
                    style={styles.button}
                    caption="确定"
                    onPress={this.handleClick}
                  />
                </View>
            </Form>   
           
        
        </View>
        <View style={styles.anchor}>
          <View style={styles.inputWrap}>
              <Text size={14} black onPress={() => this.props.navigation.navigate({ routeName: 'LoginWithSMS' })}>
              手机验证码登录
              </Text>
            </View>           
            <View style={styles.inputWrap}>
              <Text size={14} black onPress={() => this.props.navigation.navigate({ routeName: 'PasswordRecovery' })}>
              忘记密码？
              </Text>
            </View>
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
  anchor: {
    flex: 1,
    flexDirection: "row",
  },
  inputWrap: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
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
