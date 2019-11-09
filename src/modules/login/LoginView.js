import React from 'react';
import {
  StyleSheet,
  View,
  Image,
} from 'react-native';

import { Button } from '../../components';
import { fonts, colors } from '../../styles';

import { Text } from '../../components/StyledText';
export default function LoginView(props) {

  const handleProvider = () => {
    props.navigation.navigate({ routeName: 'LoginAsProvider' })
  };
  const handleClient = () => {
    props.navigation.navigate({ routeName: 'LoginAsClient' })
  };
  return (
    <View style={styles.container}>
      <View style={styles.description}>
        <Text size={28} black>
        登录角色选择
        </Text>
      </View>
      <View style={styles.description}>
        <Text size={14} black>
        选择您要登录的账号角色
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          large
          bgColor={colors.info}
          style={styles.button}
          caption="我是需求者"
          onPress={() => handleClient()}
        />
        <Button
          large
          bgColor={colors.warning}
          style={styles.button}
          caption="我是服务方"
          onPress={() => handleProvider()}
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