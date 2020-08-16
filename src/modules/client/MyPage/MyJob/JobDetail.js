import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';

import { colors } from '../../../../styles';
import { JobDetail, Applicants} from '../../../../components';
import { myJobsSelector } from '../../../../redux/selectors'
import {NotPaidAction, WaitingAction, TestingAction, FeedbackAction, FinishingAction} from './JobActions'
import {findIndex} from 'lodash'

class ClientJobDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      price: 0,
      id : '',
    }
  }
  
  componentWillMount() {
    let { id } = this.props.route.params
    if (id) {
      this.setState({id})
    }
  }
  
  render() {
    const { jobs } = this.props
    const { id } = this.state
    const index = findIndex(jobs, {_id : id})
    var job = {}
    if (index !== -1) {
      job = jobs[index]
    } else {
      return (
        <View></View>
      )
    }
    return (
      <ScrollView style={{backgroundColor: colors.bluish}}>
        <View style={styles.container}>
          <View style={styles.description}>
            <JobDetail job={job} />
            {job.status == '竞标中' && <Applicants applicants={job.applicants} navigation={this.props.navigation} jobID={job._id}/>}
            {job.status == '待付款' && 
              <View style={styles.componentsSection}>
                <Text size={14}>定价 : ¥{job.price}</Text>
                <Text size={14}>首付款 : ¥{job.price - job.upfront}</Text>
                <NotPaidAction navigation={this.props.navigation} job={job} />
              </View>
            }
            {job.status == '待拍摄' && 
              <View style={styles.componentsSection}>
                <Text size={14}>定价 : ¥{job.price}</Text>
                <Text size={14}>已支付首付款 : ¥{job.price - job.upfront}</Text>
                <WaitingAction job={job} navigation={this.props.navigation}/>
              </View>
            }
            {job.status == '待验收' && 
                <View style={styles.componentsSection}>
                <Text size={14}>定价 : ¥{job.price}</Text>
                <Text size={14}>已支付首付款 : ¥{job.price - job.upfront}</Text>
                <TestingAction job={job} navigation={this.props.navigation}/>
              </View>
            }
            {job.status == '评价' && 
              <View style={styles.componentsSection}>
                <Text size={14}>定价 : ¥{job.price}</Text>
                <Text size={14}>订单总金额 : ¥{job.price - job.upfront}</Text>
                <FeedbackAction navigation={this.props.navigation} job={job} />
              </View>
            }
            {job.status == '已完成' && 
              <View style={styles.componentsSection}>
                <Text size={14}>定价 : ¥{job.price}</Text>
                <Text size={14}>订单总金额 : ¥{job.price - job.upfront}</Text>
                <FinishingAction job={job} navigation={this.props.navigation}/>
              </View>
            }
          </View>
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
    justifyContent: "space-around"
  },
  
  description: {
    alignSelf: 'stretch'
  },

  componentsSection: {
    backgroundColor: colors.white,
    padding: 15,
    marginBottom: 20,
    borderRadius: 5,
  },
});

const mapStateToProps = createStructuredSelector({
  jobs: myJobsSelector,
});

const mapDispatchToProps = {
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ClientJobDetail);
