import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  // Text,
} from 'react-native';

import { Button } from '../../components';
import { fonts, colors } from '../../styles';
import { Text } from '../../components/StyledText';

export default function SignupView(props) {

  const handleProvider = () => {
    props.navigation.navigate('SignupAsProvider')
  };

  const handleClient = () => {
    props.navigation.navigate('SignupAsClient')
  };

  const handleLogin = () => {
    props.navigation.navigate('LoginWithPassword')
  }

  return (
    <View style={styles.container}>
      <View style={styles.description}>
        <Text size={28} black bold>
        注册，欢迎使用HVR
        </Text>
        <Text size={14} color={colors.description}>
        选择您要登录的账号角色
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          large
          bgColor={colors.secondary}
          style={styles.stretchButton}
          caption="我是需求方"
          onPress={() => handleClient()}
        />
        <Button
          large
          bgColor={colors.primary}
          style={styles.stretchButton}
          caption="我是服务方"
          onPress={() => handleProvider()}
        />
        <View style={styles.termsWrapper}>
          <Text size= {10} style={{color: colors.description}}>
            已经有账户了
          </Text>
          <TouchableOpacity onPress={handleLogin}>
            <Text size={10} style={{color: colors.primary}}>在此处登录</Text>
          </TouchableOpacity>
        </View>
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
    alignSelf: 'stretch',
    fontSize: 16,
  },
  description: {
    alignItems: "center",
    marginBottom: 100
  },
  termsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});
