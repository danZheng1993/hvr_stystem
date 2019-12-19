import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Picker,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import moment from 'moment'
import Icon from 'react-native-vector-icons/Entypo';

import { Button, Loader, NoData, Profile, Text} from '../../../components';
import { fonts, colors } from '../../../styles';

import { searchJob } from '../../../redux/modules/job'
import {  jobsListSelector, jobsloadingSelector, profileSelector, jobsSearchResultSelector } from '../../../redux/selectors'
import { getSettings } from '../../../redux/modules/setting';
import { getDateTimeStr } from '../../../utils/helper';
import Bell from '../../../components/Bell';

class JobsList extends React.Component {
  constructor(props) {
    super(props)   
    this.state = {
      location: '北京'
    }
  }
  componentWillMount() {
    const {searchJob, profile} = this.props
    this.setState({location: profile.location})
    searchJob({
      body: {location: Profile.location}
    })
  }

  chooseLocation = (location) => {
    const {searchJob, getSettings} = this.props
    this.setState({location})
    getSettings()
    searchJob({
      body: {location}
    })
  }

  render() {
    const {jobs, jobsloading} = this.props
    const {location} = this.state
    return (
      <>
        <View style={{ height: 50, flexDirection: "row", backgroundColor: colors.secondary, justifyContent: 'space-between', paddingVertical: 5}}>
          <TouchableOpacity 
            style={{ justifyContent:"center", alignItems:"center", marginHorizontal: 10}}
            onPress={() => this.props.navigation.navigate('Location',{chooseLocation: this.chooseLocation})}
            >
            <Icon name="location" size={30} color="white" />
            <Text  style={{color: colors.white}}>{location}</Text>
          </TouchableOpacity>   
          <View>
            <Text size={20} style={{color: colors.white}}>
              接单列表
            </Text> 
          </View>
          <Bell navigation={this.props.navigation}/>
        </View>
      <ScrollView style={styles.container}>
         { jobsloading ? <Loader
          loading={jobsloading} /> :
         jobs.length ? jobs.map((job, index) => (
           <View key={index} style={styles.componentsSection}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: colors.grey, marginBottom: 5}}>
                <Text size={18} black>订单信息</Text>
                <Text size={18} color={colors.secondary}>{job.status}</Text>
              </View>
              <Text size={14}>订单编号: {job._id}</Text>
              <Text size={14}>创建时间: {getDateTimeStr(job.created)}</Text>
              <Text size={14}>服务项目: {job.type}</Text>
              <Text size={14}>拍摄城市: {job.location}</Text>
              <Text size={14}>平台预估参考价: ¥{job.budget}</Text>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text size={14}>需求方预算价格: ¥{job.budget}</Text>
                <Text size={14} color={colors.primary} onPress={() => {
                  this.props.navigation.navigate('ApplyJob', {
                    job
                });}}>查看更多</Text>
              </View>
            </View>

         )) : <NoData />}
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
  jobs: jobsSearchResultSelector,
  jobsloading: jobsloadingSelector,
  profile: profileSelector
});

const mapDispatchToProps = {
  searchJob,
  getSettings
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(JobsList);
