import React from 'react';
import {
  StyleSheet,
  View,
  Image,
} from 'react-native';

import { Button } from '../../components';
import { fonts, colors } from '../../styles';

import { Text } from '../../components/StyledText';
export default function SignupView(props) {

  const handleClick = () => {
    props.navigation.navigate({ routeName: 'Gallery' })

  };
  return (
    <View style={styles.container}>
      <View style={styles.description}>
        <Text size={28} black>
        登录角色选择
        </Text>
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
          onPress={() => handleClick()}
        />
        <Button
          large
          bgColor={colors.warning}
          style={styles.button}
          caption="我是服务方"
          onPress={() => handleClick()}
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
    flex: 1,
    justifyContent: 'flex-start'
  },
});
