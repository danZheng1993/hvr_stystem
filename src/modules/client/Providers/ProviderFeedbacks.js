import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image
} from 'react-native';
import {Text} from '../../../components'
import { fonts, colors } from '../../../styles';
import { ListItem } from 'react-native-elements'
import constants from '../../../constants'
import { getDateStr } from '../../../utils/helper';

class ProviderFeedbacks extends React.Component {
  render() {
    const {feedbacks} = this.props
    return (
      <ScrollView style={styles.container}>
          {feedbacks.length ? feedbacks.map((feedback, index) => (
            <View style={{flexDirection: 'row', alignItems: 'center'}} key={index}>
              <Image
                source={{uri: constants.BASE_URL + (feedback.creator.photo ?feedback.creator.photo : 'default.png')}}
                style={styles.photo}
              />
              <View>
                <Text black size={18}>{feedback.creator.userName} <Text size={10} color={colors.lightGray}>{getDateStr(feedback.created)}</Text></Text>
                <Text black size={16}>{feedback.feedback}</Text>
              </View>
            </View>
            // <ListItem
            //   key={index}
            //   leftAvatar={{ source: { uri: constants.BASE_URL + feedback.creator.photo } }}
            //   avatarStyle={{ width: 100, height: 100, backgroundColor: 'white'}}
            //   title={feedback.creator.userName + getDateStr(feedback.created)}
            //   subtitle={feedback.feedback}
            // />
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

  photo: {
    borderRadius: 50,
    marginRight: 10,
    borderColor: colors.gray,
    backgroundColor: colors.info,
    width: 50,
    height: 50
  },
});

export default ProviderFeedbacks
