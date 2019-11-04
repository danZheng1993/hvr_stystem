import React from 'react';
import {
  StyleSheet,
  View,
  Image,
} from 'react-native';

import { Button } from '../../components';
import { fonts, colors } from '../../styles';

import { Text } from '../../components/StyledText';
import SignupForm from './SignupForm'
export default function SignupAsProvider(props) {

  const handleClick = () => {
    props.navigation.navigate({ routeName: 'BasicProfile' })

  };
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
          caption="下一步"
          onPress={() => handleClick()}
        />
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
