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

import { searchJob } from '../../../redux/modules/job'
import { jobsloadingSelector, jobsSearchResultSelector } from '../../../redux/selectors'

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
    const {searchJob, id} = this.props
    searchJob({
      body: {hired: id, status: '已完成'}
    })
  }


  render() {
    const {jobs, loading} = this.props
    return (
      <ScrollView style={styles.container}>
        <View style={styles.description}>
         <Loader
          loading={loading} />
          {jobs.length ? jobs.map((job, index) => (
            <View key={index}>
              <Text>{job.feedback}</Text>
            </View>
          )) : <Text>No Feedback</Text>}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bluish,
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
  jobs: jobsSearchResultSelector,
  loading: jobsloadingSelector,
});

const mapDispatchToProps = {
  searchJob
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ProviderFeedbacks);
