import React from 'react';
import {
  StyleSheet,
  ScrollView,
  Text
} from 'react-native';

import { colors } from '../../../styles';
import { MediaList } from '../../../components' 
class ProviderWorks extends React.Component {
  render() {
    const {medias}  = this.props
    return (
      <ScrollView style={styles.container}>
          {medias.length ? 
            <MediaList medias={medias} navigation={this.props.navigation}/> : 
            <Text>尽情期待</Text>}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bluish,
  }
});

export default ProviderWorks
