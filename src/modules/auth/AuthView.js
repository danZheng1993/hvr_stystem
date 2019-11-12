import React from 'react';
import {
  StyleSheet,
  View,
  Image,
} from 'react-native';

import { Button } from '../../components';
import { fonts, colors, commonStyles} from '../../styles';

import { Text } from '../../components/StyledText';

export default function AuthScreen(props) {

  const handleLogin = () => {
    props.navigation.navigate({ routeName: 'LoginWithPassword' })
  };
  const handleSignup = () => {
    props.navigation.navigate({ routeName: 'Signup' })
  };
  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.logo}>
        <Image
            style={{width: 100, height: 100 }}
            source={require('../../../assets/images/icon.png')}
            resizeMode="contain"
        />
      </View>
      <View style={commonStyles.centerAlign}>
        <Text size={28} black>
          欢迎使用HVR
        </Text>
      </View>
      <View style={commonStyles.buttonsContainer}>
        <Button
          large
          bgColor={colors.info}
          style={commonStyles.stretchButton}
          caption="登录"
          onPress={() => handleLogin()}
        />
        <Button
          large
          bgColor={colors.warning}
          style={commonStyles.stretchButton}
          caption="注册"
          onPress={() => handleSignup()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

});
