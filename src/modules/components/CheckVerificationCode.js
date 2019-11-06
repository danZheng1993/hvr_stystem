import React from 'react'
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-paper';
import  CodePin  from 'react-native-pin-code'

import ImagePicker from 'react-native-image-picker'
import { colors } from '../../styles'
import { Button } from '../../components';
import { Text } from '../../components/StyledText';

export default class CheckVerificationCode extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    photo: null,
    code: ''
  }
  
  render() {
    const { code } = this.state
    return (

      <View style={styles.container}>
        <View style={styles.description}>
          <Text size={28} black>
            输入短信验证码
          </Text>
          <Text size={14} black>
            验证码已发送至  13581644633
          </Text>
          <CodePin
            code="2018" // code.length is used if you not pass number prop
            success={() => this.props.navigation.navigate({ routeName: 'CreateProfile' })} // If user fill '2018', success is called
            text="" // My title
            error="请输入正确的验证码，再试一次" // If user fail (fill '2017' for instance)
            autoFocusFirst={false} // disabling auto-focus
          />
          <Text size={14} black>
            59s后可重新发送
          </Text>
        </View>
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
