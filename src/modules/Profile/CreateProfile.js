import React from 'react';
import {
  StyleSheet,
  View,
  Image,
} from 'react-native';

import { Button } from '../../components';
import { fonts, colors } from '../../styles';

import BasicProfile from './BasicProfile'
export default function CreateProfile(props) {

  const handleClick = () => {
    props.navigation.navigate({ routeName: 'CreateProfile' })

  };
  return (
    <View style={styles.container}>
      <BasicProfile />
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
