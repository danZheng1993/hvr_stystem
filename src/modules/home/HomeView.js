import React from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
} from 'react-native';

import { Button } from '../../components';

export default function HomeScreen(props) {

  const handleClick = () => {
    props.navigation.navigate({ routeName: 'Auth' })

  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/background.png')}
        style={styles.bgImage}
        resizeMode="cover"
      >
        
      <View style={styles.buttonsContainer}>
        <Button
          large
          secondary
          rounded
          style={styles.button}
          caption="Start"
          onPress={() => handleClick()}
        />
      </View>
      </ImageBackground>
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
    alignItems: 'flex-end',
  },
  button: {
    marginBottom: 20,
  },
  bgImage: {
    flex: 1,
    marginHorizontal: -20,
    width: '100%',
    height: '100%'
  }
});
