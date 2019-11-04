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
export default function SignupAsClient(props) {

  const handleClick = () => {
    props.navigation.navigate({ routeName: 'BasicProfile' })
  };
  handleWeChat = () => {
    props.navigation.navigate({ routeName: 'SendVerificationCode' })
  }
  handleQQ = () => {
    props.navigation.navigate({ routeName: 'SendVerificationCode' })
  }
  handleWeibo = () => {
    props.navigation.navigate({ routeName: 'SendVerificationCode' })
  }
  return (
    <View style={styles.container}>
      <View style={styles.description}>
        <SignupForm />
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          large
          bgColor={colors.warning}
          style={styles.button}
          caption="确定"
          onPress={() => handleClick()}
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
      </View>
    </View>
  );
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
