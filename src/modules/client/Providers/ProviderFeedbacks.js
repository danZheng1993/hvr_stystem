import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
} from 'react-native';

import { fonts, colors } from '../../../styles';
import { ListItem } from 'react-native-elements'
import constants from '../../../constants'

class ProviderFeedbacks extends React.Component {
  render() {
    const {feedbacks} = this.props
    return (
      <ScrollView style={styles.container}>
          {feedbacks.length ? feedbacks.map((feedback, index) => (
            <ListItem
              key={index}
              leftAvatar={{ source: { uri: constants.BASE_URL + feedback.creator.photo } }}
              avatarStyle={{ width: 100, height: 100, backgroundColor: 'white'}}
              title={feedback.creator.userName}
              subtitle={feedback.feedback}
            />
          )) : <Text>暂时无用户评价</Text>}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
});

export default ProviderFeedbacks
