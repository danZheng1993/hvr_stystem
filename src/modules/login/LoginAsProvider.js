import React from 'react'
import { View, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper';

import ImagePicker from 'react-native-image-picker'
import { colors } from '../../styles'
import { Button } from '../../components';
import { Text } from '../../components/StyledText';

export default class LoginAsProvider extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    photo: null,
    phoneNumber: ''
  }
  handleClick = () => {
    this.props.navigation.navigate({ routeName: 'LoginWithSMS' })
  };
  handleChoosePhoto = () => {
    const options = {
      noData: true,
    }
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({ photo: response })
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.description}>
          <Text size={28} black>
            服务者登录
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
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            large
            bgColor={colors.warning}
            style={styles.button}
            caption="发送验证码"
            onPress={() => this.handleClick()}
          />
          <View styles={styles.anchor}>
              <Text style={{alignSelf: 'flex-start'}} size={14} black onPress={() => this.props.navigation.navigate({ routeName: 'LoginWithPassword' })}>
              密码登录
            </Text>
            <Text style={{width: '50%', alignSelf: 'flex-end'}} size={14} black onPress={() => this.props.navigation.navigate({ routeName: 'LoginAsClient' })}>
              我是需求者，我要发布需求dsaf
              </Text>
          </View>
        </View>
      </View>    
    )
  }
}

const styles = StyleSheet.create({
  container: {

  },
  description: {

  },
  headline: {
    alignSelf: 'flex-start',
    justifyContent: 'space-around'
  },
  anchor: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start'
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
