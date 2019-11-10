import React from 'react'
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-paper';
import  CodePin  from 'react-native-pin-code'

import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';

import { fonts, colors } from '../../styles';
import { Form, TextValidator } from 'react-native-validator-form';
import { sendcode, checkcode } from '../../redux/modules/auth'

import ImagePicker from 'react-native-image-picker'
import { Button } from '../../components';
import { Text } from '../../components/StyledText';
import LoginWithPassword from './LoginWithPassword';

class LoginWithSMS extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    phoneNumber: null,
    code: '',
    check: false
  }
  handleClick = () => {
    const { phoneNumber} = this.state
    if(phoneNumber.length != 11 || !Number.isInteger(+phoneNumber)) return;
    this.props.sendcode({
      body: {phoneNumber},
      success: this.setState({check: true})
    })
  }
  handleCheck = (code) => {
    const { phoneNumber } = this.state
    const {checkcode} = this.props
    let res = false
    checkcode({
      body:{ phoneNumber, code: code},
      success: () => this.props.navigation.navigate({ routeName: 'BasicProfile' })
    })
  }
  render() {
    const { code, check } = this.state
    return (

      <View style={styles.container}>
        {!check &&
        <View style={styles.description}>
            <Text size={28} black>
              绑定手机号
            </Text>
            <Text size={14} black>
              为了您的帐号更安全，首次登录还需要绑定您的手机号
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
        }
        {check &&
        <View style={styles.description}>
          <Text size={28} black>
            输入短信验证码
          </Text>
          <Text size={14} black>
            验证码已发送至  13581644633
          </Text>
          <CodePin
            number={4} // You must pass number prop, it will be used to display 4 (here) inputs
            checkPinCode={(code, callback) => callback(this.handleCheck(code))}
            success={() => alert("success")} // If user fill '2018', success is called
            text="" // My title
            error="请输入正确的验证码，再试一次" // If user fail (fill '2017' for instance)
            autoFocusFirst={false} // disabling auto-focus
          />
          <Text size={14} black>
            59s后可重新发送
          </Text>
        </View>
        }
      </View>    
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'space-between'
  },
  headline: {
    alignSelf: 'flex-start',
    justifyContent: 'space-around'
  },
  photo: {
    borderRadius: 100,
    borderColor: colors.gray,
    backgroundColor: colors.info,
    width: 100,
    height: 100,
  },
  touch: {
    borderColor: colors.gray,
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    alignSelf: "stretch",
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    height: 200
  },
  input: {
    marginBottom: 15,
  },
  description: {
    padding: 20,
    marginBottom: 20,
    alignSelf: 'stretch'
  },
  buttonsContainer: {
    alignSelf: 'stretch',
    margin: 20
  },
  button: {
    marginBottom: 20,
    alignSelf: 'stretch',
  },
});

const mapStateToProps = createStructuredSelector({
});

const mapDispatchToProps = {
  sendcode,
  checkcode
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(LoginWithSMS);
