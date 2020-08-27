import React from 'react';
import { ScrollView, Text } from 'react-native';

export default () => (
  <ScrollView
    style={styles.wrapper}
    contentContainerStyle={styles.contentContainer}
  >
    <Text>关于我们需要文本</Text>
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