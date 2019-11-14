import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import { TextInput } from 'react-native-paper'
import { createStructuredSelector } from 'reselect';
import { compose } from 'recompose';
import moment from 'moment'

import { fonts, colors } from '../../../../styles';
import { Button, Loader, toast, JobDetail, Applicants} from '../../../../components';

import { getJob } from '../../../../redux/modules/job'
import { jobDetailSelector, jobsloadingSelector, profileSelector } from '../../../../redux/selectors'

class BiddingJob extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      price: 0
    }
  }
  componentWillMount() {
    const {getJob, navigation} = this.props
    let id = navigation.getParam('id', 'NO-ID')
    if (id != 'NO-ID') {
      getJob({
        id: id,
      })
    }
  }

  handleContact =() => {

  } 
  
  render() {
    
    const {job, jobsloading} = this.props
    console.log(job)

    return (
      <View style={styles.container}>
        <View style={styles.description}>
         { <Loader
          loading={jobsloading} /> }
         {job && <JobDetail job={job} />

         }
         {<Applicants applicants={job.applicants} navigation={this.props.navigation} jobID={job._id}/> }
         </View>
      </View>
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
  job: jobDetailSelector,
  jobsloading: jobsloadingSelector,
  profile: profileSelector
});

const mapDispatchToProps = {
  getJob
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(BiddingJob);
