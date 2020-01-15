import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';

import { Button, Loader, toast, JobDetail} from '../../../components';
import { colors } from '../../../styles';
import { getJob, applyJob } from '../../../redux/modules/job'
import { jobDetailSelector, jobsloadingSelector, profileSelector } from '../../../redux/selectors'

class ApplyJob extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      price: '',
      job: null
    }
  }

  componentWillMount() {
    const {navigation} = this.props
    let job = navigation.getParam('job', null)
    if (job) {
      this.setState({job})
    }
  }

  handleClick = () => {
    let {price, job} = this.state
    let {applyJob, navigation} = this.props
    //  if (+price == 0) {
    //    price = this.props.job.budget
    //  }
    if (!job) {
      alert("error")
      return
    }
    applyJob({
      id: job._id,
      body: {price},
      success: () => navigation.goBack(),
      fail: () => toast('失败')
    })  
  };

  handleContact = (id) => {
    this.props.navigation.navigate('Chatting', {to: id})
  } 
  
  render() {  
    const {jobsloading} = this.props
    const {job} = this.state
    if (!job) return (<></>)
    return (
      <ScrollView style={styles.container}>
         <Loader
          loading={jobsloading} />
         {job && <>
            <JobDetail job={job} />
            <View style={{...styles.componentsSection, flexDirection: 'row', justifyContent: 'space-between'}}>
              <Button
                small
                bgColor={colors.secondary}
                caption="联系服务商"
                onPress={() => this.handleContact(job.creator)}
              />
              <View style={{flexDirection: 'row'}}>
                <TextInput
                  style={styles.input}
                  keyboardType = 'numeric'             
                  placeholder="输入报价"
                  value={this.state.price}
                  onChangeText={price => this.setState({ price })}
                />
                <Button
                  small
                  bgColor={colors.warning}
                  caption="投标"
                  onPress={this.handleClick}
                />
              </View>
            </View>
            </>
         }
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
  input: {
    height: 30,
    marginRight: 10,
    borderColor: colors.grey,
    borderWidth: 1,
    borderRadius: 2,
    paddingVertical: 2,
    paddingHorizontal: 10
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
  applyJob
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ApplyJob);
