import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity
} from 'react-native';
import moment from 'moment'
import {Button} from '../components'
import {NotPaidAction, WaitingAction, TestingAction, FinishingAction, FeedbackAction} from '../components/JobActions'
import { fonts, colors } from '../styles';
import { TouchableRipple } from 'react-native-paper';

handleClick = () => {

}



export default class JobsList extends React.Component {
  constructor(props) {
    super(props)
    
  }

  handleNavigate = (status, id) => {
    const {navigation} = this.props
    if (status == '竞标中') navigation.navigate('BiddingJob', {id: id})
    if (status == '待付款') navigation.navigate('NotPaidJob', {id: id})
    if (status == '待拍摄') navigation.navigate('WaitingJob', {id: id})
    if (status == '待验收') navigation.navigate('TestingJob', {id: id})
    if (status == '评价') navigation.navigate('FeedbackJob', {id: id})
    if (status == '已完成') navigation.navigate('FinishingJob', {id: id})
  } 

  render() {   
    const {jobs, navigation} = this.props
    console.log(jobs)
    return (
        <ScrollView>          
         {jobs && jobs.map((job, index) => (
          <TouchableRipple key={index} onPress={() => this.handleNavigate(job.status, job._id)}>
           <View key={index} style={styles.componentsSection}>
             <Text size={14}>订单信息 : <Text>{job.status}</Text></Text>
             <Text size={14}>订单编号 : <Text>{job._id}</Text></Text>
             <Text size={14}>创建时间 : <Text>{moment(job.created).format("YYYY-MM-DD HH:MM:SS")}</Text></Text>
             <Text size={14}>服务项目 : <Text>{job.type}</Text></Text>
             <Text size={14}>拍摄城市 : <Text>{job.location}</Text></Text>
             {job.status == '竞标中' && 
              <View style={styles.textContainer}>
                <Text size={14}>预算价格:<Text>¥{job.budget}</Text></Text>
                <Text size={14} onPress={() => {
                  navigation.navigate('BiddingJob', {
                    id: job._id,
                  });
                }}
                >查看更多</Text>
              </View>}
             {job.status == '待付款' && 
              <View>
                <Text size={14}>签订合同 : <Text onPress={() => {
                  navigation.navigate('BiddingJob', {
                    id: job._id,
                  });}}>电子合同</Text>
                </Text>
                <View stye={styles.textContainer}>
                  <Text size={14}>定价 : <Text>¥{job.price}</Text></Text>
                  <Text size={14}>首付款50% : <Text>¥{job.price}</Text></Text>
                </View>
                <NotPaidAction />
              </View>}
             {job.status == '待拍摄' && 
              <View>
              <View stye={styles.textContainer}>
                <Text size={14}>定价 : <Text>¥{job.price}</Text></Text>
                <Text size={14}>首付款已支付 : <Text>¥{job.price}</Text></Text>
              </View>
              <WaitingAction />
            </View>}
             {job.status == '待验收' && 
              <View>
              <View stye={styles.textContainer}>
                <Text size={14}>定价 : <Text>¥{job.price}</Text></Text>
                <Text size={14}>已支付首付款 : <Text>¥{job.price}</Text></Text>
              </View>
              <TestingAction />
            </View>}
             {job.status == '评价' && 
               <View>
               <View stye={styles.textContainer}>
                 <Text size={14}>订单总金额 : <Text>¥{job.price}</Text></Text>
               </View>
               <FeedbackAction />
             </View>}
             {job.status == '已完成' && 
              <View>
              <View stye={styles.textContainer}>
                <Text size={14}>订单总金额 : <Text>¥{job.price}</Text></Text>
              </View>
              <FinishingAction />
            </View>}
             
            </View>
            </TouchableRipple>
         ))}
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

  buttonsContainer: {
    alignItems: 'flex-end',
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20
  },

  button: {
  },
});
