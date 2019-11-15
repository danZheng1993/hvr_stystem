import React from 'react';

import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';

import { connect } from 'react-redux';
import { withState,compose } from 'recompose';
import { createStructuredSelector } from 'reselect';

import { Button, Loader, ProviderJobsList, RadioGroup } from '../../../../components'
import { fonts, colors } from '../../../../styles';

import { searchJob } from '../../../../redux/modules/job'
import { jobsListSelector, jobsloadingSelector, profileSelector } from '../../../../redux/selectors'

const status = ['全部', '竞标中', '待付款','待拍摄', '待验收', '评价', '已完成']

class MyJobList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected : 0
    }
  }

  componentWillMount() {
    const {searchJob, profile} = this.props
    searchJob({
      body: {hired: profile._id}
    })
  }

  handleClick = (index) => {
    this.props.setRadioGroupsState({ ...this.props.radioGroupsState, 0: index })
    this.setState({selected: index})
  }

  render() {    
    const {jobs, jobsloading} = this.props
    const {selected} = this.state
    let jobslist = jobs
    if (selected && jobs.length) {
      jobslist = jobs.filter(job => job.status == status[selected])
    }
    return (
      <ScrollView style={styles.container}>
        <Loader loading={jobsloading} />
        { <Loader
          loading={jobsloading} /> }
        <View style={styles.componentsSection}>
          <RadioGroup
            style={styles.demoItem}
            items={['全部', '竞标中', '待付款','待拍摄', '待验收', '评价', '已完成']}
            selectedIndex={this.props.radioGroupsState[0]}
            onChange={index => this.handleClick(index)}
          />
        </View>
        <ProviderJobsList jobs={jobslist} navigation={this.props.navigation}/>
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
  jobs: jobsListSelector,
  jobsloading: jobsloadingSelector,
  profile: profileSelector
});

const mapDispatchToProps = {
  searchJob
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect,    withState('radioGroupsState', 'setRadioGroupsState', [0, 0]))(MyJobList);
