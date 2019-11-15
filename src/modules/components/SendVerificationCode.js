import React from 'react'

import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';

import { View, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper';

import { colors } from '../../styles'
import { Button } from '../../components';
import { Text } from '../../components/StyledText';
import {sendcode} from '../../redux/modules/auth'
import CheckVerificationCode from './CheckVerificationCode';

class SendVerificationCode extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    phoneNumber: '',
  }
  
  handleClick = () => {
    const { phoneNumber } = this.state
    if(phoneNumber.length != 11 || !Number.isInteger(+phoneNumber)) return;

    this.props.sendcode({
      body: { phoneNumber: phoneNumber},
      success: () => {    
        this.props.navigation.navigate('CheckVerificationCode',{phoneNumber: phoneNumber})
      }
    })
  };
  
  render() {
    return (
      <>
        <View style={styles.description}>
          <Text size={28} black>
            绑定手机号
          </Text>
          <Text size={14} black>
            为了您的帐号更安全，首次登录还需要绑定您的手机号
          </Text>
          <TextInput
            style={styles.input}
            outlined
            label='输入手机号'
            placeholder="输入手机号"
            value={this.state.phoneNumber}
            onChangeText={phoneNumber => this.setState({ phoneNumber })}
        />
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            large
            bgColor={colors.warning}
            style={styles.button}
            caption="发送验证码"
            onPress={() => this.handleClick()}
          />
        </View>
      </>

    )
  }
}

const styles = StyleSheet.create({
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
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(SendVerificationCode);
