import React from 'react';

import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';

import { connect } from 'react-redux';
import { withState,compose } from 'recompose';
import { createStructuredSelector } from 'reselect';

import { Loader, RadioGroup, NoData } from '../../../../components'
import { colors } from '../../../../styles';
import JobsList from './JobsList'
import { getMyJob } from '../../../../redux/modules/job'
import { jobsloadingSelector, profileSelector, settingsListSelector, myJobsSelector } from '../../../../redux/selectors'

const status = ['全部', '竞标中', '待付款','待拍摄', '待验收', '评价', '已完成']

class MyJobList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected : 0
    }
  }

  componentDidMount() {
    const {getMyJob, profile, route} = this.props
    const {selected = 0} = route.params || {}
    this.setState({ selected })
    getMyJob()
  }

  handleClick = (index) => {
    this.setState({ selected: index })
  }

  render() {    
    const {jobs, jobsloading, settings} = this.props
    const upfrontRate = settings.upfrontRate || 0 
    const {selected} = this.state
    let jobslist = jobs
    if (selected > 0 && jobs.length) {
      jobslist = jobs.filter(job => job.status == status[selected])
    }
    return (
      <>
        <View style={styles.componentsSection}>
          <RadioGroup
            items={['全部', '竞标中', '待付款','待拍摄', '待验收', '评价', '已完成']}
            selectedIndex={selected}
            onChange={index => this.handleClick(index)}
            small
            underline
          />
        </View>
        <Loader loading={jobsloading} />
        <JobsList jobs={jobslist} navigation={this.props.navigation} upfrontRate={upfrontRate} />
      </>
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
  componentsSection: {
    padding: 0,
    backgroundColor: colors.secondary,
    height: 30,
  },
});

const mapStateToProps = createStructuredSelector({
  jobs: myJobsSelector,
  jobsloading: jobsloadingSelector,
  profile: profileSelector,
  settings: settingsListSelector
});

const mapDispatchToProps = {
  getMyJob
};

export default connect(mapStateToProps, mapDispatchToProps)(MyJobList);
