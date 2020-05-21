import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import {NotPaidAction, WaitingAction, TestingAction, FinishingAction, FeedbackAction} from './JobActions'
import { fonts, colors } from '../../../../styles';
import { TouchableRipple } from 'react-native-paper';
import {NoData, Text, Button} from '../../../../components'
import { getDateTimeStr } from '../../../../utils/helper';

export default class JobsList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {   
    const {jobs, navigation, upfrontRate} = this.props
    return (
      <View style={{paddingBottom: 20}}>          
        {jobs.length ? jobs.map((job, index) => (
          <TouchableRipple key={index} onPress={() => navigation.navigate('ClientJobDetail', {id: job._id})}>
            <View key={index} style={styles.componentsSection}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: colors.greybackground, marginBottom: 5}}>
                <Text color={colors.secondary}>订单信息</Text>
                <Text color={colors.primary}>{job.status}</Text>
              </View>
              <Text size={14}>订单编号: {job._id}</Text>
              <Text size={14}>创建时间: {getDateTimeStr(job.created)}</Text>
              <Text size={14}>服务项目: {job.type}</Text>
              {/* <Text size={14}>拍摄城市: {job.location}</Text> */}

              {job.status == '竞标中' && 
                <View>
                  <Text size={10}>原预算价格: <Text color={colors.redAlert} size={14}>¥{job.budget}</Text></Text>
                  <View style={{alignItems: 'flex-end', borderTopWidth: 1, borderTopColor: colors.greybackground, paddingTop: 5}}>
                    <Button
                      small
                      bgColor={colors.warning}
                      onPress={() => {navigation.navigate('ClientJobDetail', {id: job._id})}}
                      caption='查看更多'
                    />
                  </View>
                </View>
              }

              {job.status == '待付款' && 
                <NotPaidAction job={job} navigation={this.props.navigation} />
              }

              {job.status == '待拍摄' && 
                <WaitingAction job={job} navigation={this.props.navigation}/>
              }

              {job.status == '待验收' && 
                <TestingAction job={job} navigation={this.props.navigation} />
              }

              {job.status == '评价' && 
                <FeedbackAction navigation={navigation} job={job}/>
              }

              {job.status == '已完成' && 
                <FinishingAction job={job} navigation={this.props.navigation}/>
              }
            </View>
          </TouchableRipple>
        )) : <NoData />}
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

  description: {
    padding: 20,
    marginBottom: 20,
    alignSelf: 'stretch'
  },

  componentsSection: {
    backgroundColor: colors.white,
    padding: 15,
    marginBottom: 20,
    borderRadius: 5,
  },

  textContainer: {
    alignSelf: 'stretch',
    marginTop: 20,
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
});
