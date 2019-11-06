import React from 'react'
import { View, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper';

import ImagePicker from 'react-native-image-picker'
import { colors } from '../../styles'
import { Button } from '../../components';
import { Text } from '../../components/StyledText';
import constants from '../../constants'
import CheckVerificationCode from './CheckVerificationCode';

export default class SendVerificationCode extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    phoneNumber: '',
  }
  handleClick = () => {
    alert("Check-Verification")
  };
  
  render() {
    const { sendORCheck } = this.state
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
