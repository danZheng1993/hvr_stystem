import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TextInput } from 'react-native-paper';

import ImagePicker from 'react-native-image-picker'
import { colors } from '../../styles'
import { Button } from '../../components';
import SendVerificationCode from '../components/SendVerificationCode';

export default class LoginView extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    photo: null,
    phoneNumber: ''
  }
  handleClick = () => {
    this.props.navigation.navigate({ routeName: 'LoginWithPassword' })
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
});
