import React from 'react';

import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';

import { connect } from 'react-redux';
import { withState,compose } from 'recompose';
import { createStructuredSelector } from 'reselect';

import { Button, Loader, RadioGroup, NoData } from '../../../../components'
import { fonts, colors } from '../../../../styles';
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

  componentWillMount() {
    const {getMyJob, profile, navigation} = this.props
    const selected = navigation.getParam('selected', 0)
    this.props.setRadioGroupsState({ ...this.props.radioGroupsState, 0: selected })
    this.setState({selected})
    getMyJob()
  }

  handleClick = (index) => {
    this.props.setRadioGroupsState({ ...this.props.radioGroupsState, 0: index })
    this.setState({selected: index})
  }

  render() {    
    const {jobs, jobsloading, settings} = this.props
    const upfrontRate = settings.upfrontRate || 0 
    const {selected} = this.state
    let jobslist = jobs
    if (selected && jobs.length) {
      jobslist = jobs.filter(job => job.status == status[selected])
    }
    return (
      <>
      <View style={styles.componentsSection}>
        <RadioGroup
          items={['全部', '竞标中', '待付款','待拍摄', '待验收', '评价', '已完成']}
          selectedIndex={this.props.radioGroupsState[0]}
          onChange={index => this.handleClick(index)}
          underline
        />
      </View>
      <Loader loading={jobsloading} />     
      <ScrollView style={styles.container}>  
        <JobsList jobs={jobslist} navigation={this.props.navigation} upfrontRate={upfrontRate} />
      </ScrollView>
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
    backgroundColor: colors.secondary,
    height: 50,
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

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect,    withState('radioGroupsState', 'setRadioGroupsState', [0, 0]))(MyJobList);
