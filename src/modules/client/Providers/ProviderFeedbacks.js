import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
} from 'react-native';

import { connect } from 'react-redux';
import { compose, withState } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { Button, Loader,} from '../../../components';
import { fonts, colors } from '../../../styles';
import { ListItem } from 'react-native-elements'
import constants from '../../../constants'
import { getFeedback } from '../../../redux/modules/job'
import { jobsloadingSelector, jobsFeedbackSelector } from '../../../redux/selectors'

class ProviderFeedbacks extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      select: 0
    }
  }

  handleClick =() => {

  }

  componentWillMount() {
    const {getFeedback, id} = this.props
    getFeedback({
      body: {hired: id}
    })
  }


  render() {
    const {feedbacks, loading} = this.props
    return (
      <ScrollView style={styles.container}>
          <Loader loading={loading} />
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
  
  picker: {
    flexDirection: "row",
    justifyContent: 'space-between'
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
  input: {
    marginBottom: 15,
  },
  anchor: {
    flex: 1,
    flexDirection: "row",
  },
  inputWrap: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  componentsSection: {
    backgroundColor: colors.white,
    padding: 15,
    marginBottom: 20,
    borderRadius: 5,
  },
});


const mapStateToProps = createStructuredSelector({
  feedbacks: jobsFeedbackSelector,
  loading: jobsloadingSelector,
});

const mapDispatchToProps = {
  getFeedback
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ProviderFeedbacks);
