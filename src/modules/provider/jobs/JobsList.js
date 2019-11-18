import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Picker,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import moment from 'moment'

import { Button, Loader, NoData} from '../../../components';
import { fonts, colors } from '../../../styles';

import { getJobs } from '../../../redux/modules/job'
import {  jobsListSelector, jobsloadingSelector } from '../../../redux/selectors'

class JobsList extends React.Component {
  constructor(props) {
    super(props)   
    this.state = {
      
    }
  }
  componentWillMount() {
    const {getJobs} = this.props
    getJobs()
  }

  render() {
    const {jobs, jobsloading} = this.props
    return (
      <ScrollView style={styles.container}>
        <View style={styles.description}>
         { <Loader
          loading={jobsloading} /> }
         {jobs.length ? jobs.map((job, index) => (
           <View key={index} style={styles.componentsSection}>
             <Text size={14}>订单信息:<Text>{job.status}</Text></Text>
             <Text size={14}>订单编号:<Text>{job._id}</Text></Text>
             <Text size={14}>创建时间:<Text>{moment(job.created).format("YYYY-MM-DD HH:MM:SS")}</Text></Text>
             <Text size={14}>服务项目：:<Text>{job.type}</Text></Text>
             <Text size={14}>拍摄城市:<Text>{job.location}</Text></Text>
             <Text size={14}>平台预估参考价:<Text>¥{job.budget}</Text></Text>
             <Text size={14}>需求方预算价格:<Text>¥{job.budget}</Text></Text>
             <Text size={14} onPress={() => {
              this.props.navigation.navigate('ApplyJob', {
                id: job._id,
              });
            }}
            >查看更多</Text>
            </View>

         )) : <NoData />}
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
  jobs: jobsListSelector,
  jobsloading: jobsloadingSelector,
});

const mapDispatchToProps = {
  getJobs
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(JobsList);
