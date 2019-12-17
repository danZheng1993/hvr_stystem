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
import { fonts, colors } from '../../../styles';
import { getJob, applyJob } from '../../../redux/modules/job'
import { jobDetailSelector, jobsloadingSelector, profileSelector } from '../../../redux/selectors'

class ApplyJob extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      price: ''
    }
  }

  componentWillMount() {
    const {getJob, navigation} = this.props
    let id = navigation.getParam('id', 'NO-ID')
    if (id != 'NO-ID') {
      getJob({
        id: id
      })
    }
  }

  handleClick = () => {
    let {price} = this.state
    let {applyJob, profile, navigation} = this.props
    //  if (+price == 0) {
    //    price = this.props.job.budget
    //  }
    let id = navigation.getParam('id', 'NO-ID')
    if (id == 'NO-ID') {
      alert("error")
      return
    }
    applyJob({
      id: id,
      body: {price},
    })  
  };

  handleContact = (id) => {
    this.props.navigation.navigate('Chatting', {to: id})
  } 
  
  render() {  
    const {job, jobsloading} = this.props
    if (!job) return (<></>)
    return (
      <ScrollView style={styles.container}>
         <Loader
          loading={jobsloading} />
         {job && <>
            <JobDetail job={job} />
            <View style={{...styles.componentsSection, flexDirection: 'row', justifyContent: 'space-around'}}>
              <Button
                small
                bgColor={colors.secondary}
                style={styles.button}
                caption="联系需求方"
                onPress={() => this.handleContact(job.creator)}
              />             
              <TextInput
                style={styles.input}
                keyboardType = 'numeric'             
                placeholder="输入预算金额"
                value={this.state.price}
                onChangeText={price => this.setState({ price })}
              />
              <Button
                small
                bgColor={colors.warning}
                style={styles.button}
                caption="投标"
                onPress={this.handleClick}
              />
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
  button: {
    alignSelf: 'stretch',
  },
  input: {
    height: 30,
    borderColor: colors.grey,
    borderWidth: 1,
    borderRadius: 2,
    padding: 2
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
