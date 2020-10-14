import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image
} from 'react-native';

import DefaultAvatar from '../../../../assets/images/default-avatar.png';
import {Text} from '../../../components'
import { colors } from '../../../styles';
import constants from '../../../constants'
import { getDateStr } from '../../../utils/helper';

const FeedbackItem = ({ feedback }) => {
  const [avatarImage, setAvatarImage] = useState(feedback.creator.photo ? { uri: constants.BASE_URL + feedback.creator.photo } : DefaultAvatar);
  const [loading, setLoading] = useState();
  const handleAvatarLoadStart = () => {
    setLoading(true);
  }

  const handleAvatarLoadEnd = () => {
    setLoading(false);
  }

  const handleAvatarLoadError = (err) => {
    setLoading(false);
    setAvatarImage(DefaultAvatar);
  }
  return (
    <View style={styles.feedbackItemWrapper}>
      <Image
        source={avatarImage}
        style={styles.photo}
        onLoadStart={handleAvatarLoadStart}
        onLoad={handleAvatarLoadEnd}
        onError={handleAvatarLoadError}
      />
      <View>
        <Text black size={16}>{feedback.creator.userName} <Text size={10} color={colors.lightGray}>{getDateStr(feedback.created)}</Text></Text>
        <Text size={14}>{feedback.feedback === '' ? '用户暂未评论' : feedback.feedback}</Text>
      </View>
    </View>
  )
}

class ProviderFeedbacks extends React.Component {
  render() {
    const {feedbacks} = this.props
    return (
      <ScrollView style={styles.container}>
          {feedbacks.length ? feedbacks.map((feedback, index) => <FeedbackItem feedback={feedback} key={`feedback_${index}`} />) : <Text>暂时无用户评价</Text>}
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

  photo: {
    borderRadius: 24,
    marginRight: 10,
    backgroundColor: 'white',
    width: 48,
    height: 48,
  },
  feedbackItemWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingBottom: 32,
  }
});

export default ProviderFeedbacks
