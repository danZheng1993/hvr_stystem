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

import { getJob } from '../../../../redux/modules/job'
import { jobDetailSelector, jobsloadingSelector, profileSelector } from '../../../../redux/selectors'
import { WaitingAction } from '../../../../components/JobActions';

class WaitingJob extends React.Component {
  constructor(props) {
    super(props)
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
         <JobDetail job={job} />
         <View style={styles.componentsSection}>
          <Text size={14}>项目定价 : ¥{job.price}</Text>
          <Text size={14}>项目首付款(20%) : ¥{job.price / 5}</Text>
          <Text size={14}>项目尾款(80%) : ¥{job.price * 0.8}</Text>
          <Text size={14}>首付款支付时间 : </Text>
          <Text size={14}>尾款支付时间 : </Text>
          <Text size={14}>定价 : ¥{job.price}</Text>
          <Text size={14}>已支付首付款 : ¥{job.price / 5}</Text>
          <WaitingAction />
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
  getJob
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(WaitingJob);
