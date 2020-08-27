import React from 'react';
import { ScrollView, Text } from 'react-native';

export default () => (
  <ScrollView
    style={styles.wrapper}
    contentContainerStyle={styles.contentContainer}
  >
    <Text>需要帮助用户界面</Text>
  </ScrollView>
);

const styles = {
  wrapper: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
}