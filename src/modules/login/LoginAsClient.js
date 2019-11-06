import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image, Menu } from 'react-native'
import { TextInput } from 'react-native-paper';

import ImagePicker from 'react-native-image-picker'
import { colors } from '../../styles'
import { Button } from '../../components';
import SendVerificationCode from '../components/SendVerificationCode';

export default class LoginAsClient extends React.Component {
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
        <SendVerificationCode />
        <View style={styles.anchor}>
          <View style={styles.inputWrap}>
              <Text size={14} black onPress={() => this.props.navigation.navigate({ routeName: 'LoginWithPassword' })}>
                密码登录
              </Text>
            </View>           
            <View style={styles.inputWrap}>
              <Text size={14} black onPress={() => this.props.navigation.navigate({ routeName: 'LoginAsProvider' })}>
                我是服务方，我要提供服务
              </Text>
            </View>
        </View>    
        <View style={styles.touch}>
          <Menu
              visible={this.state.visible}
              onDismiss={this._closeMenu}
              anchor={
                <Button onPress={this._openMenu}>Show menu</Button>
              }
            >
              <Menu.Item onPress={() => {}} title="Item 1" />
              <Menu.Item onPress={() => {}} title="Item 2" />
              <Divider />
              <Menu.Item onPress={() => {}} title="Item 3" />
            </Menu>
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
          </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
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
  photo: {
    borderRadius: 25,
    width: 50,
    height: 50
  },
  touch: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
});
