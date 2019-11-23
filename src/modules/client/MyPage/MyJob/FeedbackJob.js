import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'recompose';

import { fonts, colors } from '../../../../styles';
import { Loader, toast, JobDetail} from '../../../../components';

import { getJob, updateJobStatus } from '../../../../redux/modules/job'
import { jobDetailSelector, jobsloadingSelector, profileSelector } from '../../../../redux/selectors'
import { FeedbackAction } from '../../../../components/JobActions';

class FeedbackJob extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isDialogVisible : false
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
  
  onClickFeedback = () => {
    alert("aaa")
    this.setState({isDialogVisible: true})
  }
  render() {
    
    const {job, jobsloading} = this.props
    if (!job) return (<></>)
    return (
      <View style={styles.container}>
       
        <View style={styles.description}>
         { <Loader
          loading={jobsloading} /> }
         <JobDetail job={job} />
         <View style={styles.componentsSection}>
          <Text size={14}>首付款支付时间 : </Text>
          <Text size={14}>尾款支付时间 : </Text>
          <Text size={14}>订单总金额 : ¥{job.price}</Text>
          <FeedbackAction navigation={this.props.navigation} id={job._id} />
         </View>
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
    alignItems: 'flex-end',
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20
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
  getJob,
  updateJobStatus
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(FeedbackJob);