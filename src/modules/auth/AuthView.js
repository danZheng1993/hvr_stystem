import React from 'react';
import {
  StyleSheet,
  View,
  Image,
} from 'react-native';

import { Button } from '../../components';
import { fonts, colors } from '../../styles';

import { Text } from '../../components/StyledText';
export default function AuthScreen(props) {

  const handleLogin = () => {
    props.navigation.navigate({ routeName: 'LoginWithPassword' })
  };
  const handleSignup = () => {
    props.navigation.navigate({ routeName: 'Signup' })
  };
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image
            style={{width: 100, height: 100 }}
            source={require('../../../assets/images/icon.png')}
            resizeMode="contain"
        />
      </View>
      <View style={styles.welcome}>
        <Text size={28} black>
          欢迎使用HVR
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          large
          bgColor={colors.info}
          style={styles.button}
          caption="登录"
          onPress={() => handleLogin()}
        />
        <Button
          large
          bgColor={colors.warning}
          style={styles.button}
          caption="注册"
          onPress={() => handleSignup()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  buttonsContainer: {
    flex: 2,
    alignItems: 'center',
    alignSelf: 'stretch',
    margin: 20
  },
  logo: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  button: {
    marginBottom: 20,
    alignSelf: 'stretch',
  },
  welcome: {
    flex: 1,
    justifyContent: 'center'
  },
});
