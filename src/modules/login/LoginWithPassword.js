import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import {TextInput} from 'react-native-paper'
import { Button } from '../../components';
import { fonts, colors } from '../../styles';

import { Text } from '../../components/StyledText';
export default class LoginWithPassword extends React.Component {
  state = {
    phoneNumber: '',
    password: '',
  }
  handleClick = () => {
    this.props.navigation.navigate({ routeName: 'Client' })

  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.description}>
          <Text size={18} black>
            登录HVR
          </Text>
          <Text size={14} black>
            登录使用更多服务
          </Text>
        <TextInput
            style={styles.input}
            outlined
            label='输入手机号'
            placeholder="输入手机号"
            value={this.state.phoneNumber}
            onChangeText={phoneNumber => this.setState({ phoneNumber })}
        />
        <TextInput
            style={styles.input}
            outlined
            label='密码'
            placeholder="密码"
            secureTextEntry
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
        />
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            large
            bgColor={colors.warning}
            style={styles.button}
            caption="登录"
            onPress={() => this.handleClick()}
          />
        </View>
        <View style={styles.anchor}>
          <View style={styles.inputWrap}>
              <Text size={14} black onPress={() => this.props.navigation.navigate({ routeName: 'LoginAsClient' })}>
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
