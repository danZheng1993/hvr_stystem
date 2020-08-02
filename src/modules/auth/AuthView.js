import React from 'react';
import {
  StyleSheet,
  View,
  Image,
} from 'react-native';

import { Button } from '../../components';
import { colors} from '../../styles';
import { Text } from '../../components/StyledText';

export default function AuthScreen(props) {

  const handleLogin = () => {
    props.navigation.navigate('LoginWithPassword')
  };
  const handleSignup = () => {
    props.navigation.navigate('Signup')
  };
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image
            style={{width: 200, height: 200 }}
            source={require('../../../assets/images/icon.png')}
            resizeMode="contain"
        />
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          large
          bgColor={colors.secondary}
          style={styles.stretchButton}
          caption="登录"
          onPress={() => handleLogin()}
        />
        <Button
          large
          bgColor={colors.primary}
          style={styles.stretchButton}
          caption="注册"
          onPress={() => handleSignup()}
        />
        <Text size= {10} style={{color: colors.description}}>
          我已阅读并同意 
          <Text size={10} style={{color: colors.primary}}> 服务条款和隐私政策 </Text>
        </Text>
      </View>
      <View style={{justifyContent: "center", alignItems: 'center'}}>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: 70
  },
  buttonsContainer: {
    flex: 2,
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  stretchButton: {
    marginBottom: 20,
    alignSelf: 'stretch'
  },
  logo: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 100
  },
});
