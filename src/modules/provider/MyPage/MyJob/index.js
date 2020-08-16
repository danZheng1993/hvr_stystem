import React from 'react';

import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';

import { connect } from 'react-redux';
import { withState,compose } from 'recompose';
import { createStructuredSelector } from 'reselect';

import { Loader, RadioGroup } from '../../../../components'
import { colors } from '../../../../styles';
import ProviderJobsList from './ProviderJobsList'
import { getMyJob } from '../../../../redux/modules/job'
import { jobsloadingSelector, profileSelector, myJobsSelector } from '../../../../redux/selectors'

const status = ['全部', '竞标中', '已选用','待付款','待拍摄', '待验收']

class MyJobList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected : 0
    }
  }

  componentWillMount() {
    const {getMyJob} = this.props
    const { selected = 0 } = route.params
    this.props.setRadioGroupsState({ ...this.props.radioGroupsState, 0: selected })
    this.setState({selected})
    getMyJob()
  }

  handleClick = (index) => {
    this.props.setRadioGroupsState({ ...this.props.radioGroupsState, 0: index })
    this.setState({selected: index})
  }

  render() {    
    const {jobs, jobsloading} = this.props
    const {selected} = this.state
    let jobslist = jobs
    if (selected && !!jobs.length) {
      jobslist = jobs.filter(job => job.status == status[selected])
    }
    return (
      <>
        <View style={styles.componentsSection}>
          <RadioGroup
            items={['全部', '竞标中', '已选用','待支付', '待拍摄', '待验收']}
            selectedIndex={this.props.radioGroupsState[0]}
            onChange={index => this.handleClick(index)}
            underline
          />
        </View>
        <ScrollView style={styles.container}>
          <Loader loading={jobsloading} />
          <ProviderJobsList jobs={jobslist} navigation={this.props.navigation}/>
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
    height: 30
  },
});


const mapStateToProps = createStructuredSelector({
  jobs: myJobsSelector,
  jobsloading: jobsloadingSelector,
  profile: profileSelector
});

const mapDispatchToProps = {
  getMyJob
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, withState('radioGroupsState', 'setRadioGroupsState', [0, 0]))(MyJobList);
