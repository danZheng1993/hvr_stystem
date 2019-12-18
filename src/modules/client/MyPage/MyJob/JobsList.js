import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import moment from 'moment'
import {NotPaidAction, WaitingAction, TestingAction, FinishingAction, FeedbackAction} from './JobActions'
import { fonts, colors } from '../../../../styles';
import { TouchableRipple } from 'react-native-paper';
import {NoData, Text} from '../../../../components'

handleClick = () => {

}



export default class JobsList extends React.Component {
  constructor(props) {
    super(props)
    
  }

  render() {   
    const {jobs, navigation, upfrontRate} = this.props
    return (
        <ScrollView>          
         {jobs.length ? jobs.map((job, index) => (
          <TouchableRipple key={index} onPress={() => navigation.navigate('ClientJobDetail', {id: job._id})}>
           <View key={index} style={styles.componentsSection}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: colors.greybackground, marginBottom: 5}}>
              <Text color={colors.secondary}>订单信息</Text>
              <Text color={colors.primary}>{job.status}</Text>
            </View>
             <Text size={14}>订单编号: {job._id}</Text>
             <Text size={14}>创建时间: {moment(job.created).format("YYYY-MM-DD hh:mm:ss")}</Text>
             <Text size={14}>服务项目: {job.type}</Text>
             <Text size={14}>拍摄城市: {job.location}</Text>

             {job.status == '竞标中' && 
              <View style={styles.textContainer}>
                <Text size={14}>预算价格: <Text color={colors.redAlert}>¥{job.budget}</Text></Text>
                <Text size={14} color={colors.secondary} onPress={() => {
                  navigation.navigate('ClientJobDetail', {
                    id: job._id,
                  });
                }}
                >查看更多</Text>
              </View>}

             {job.status == '待付款' && 
              <View>
                <Text size={14}>签订合同 : <Text onPress={() => null}>电子合同</Text>
                </Text>
                <View stye={styles.textContainer}>
                  <Text size={14}>定价 : <Text>¥{job.price}</Text></Text>
                  <Text size={14}>首付款 {upfrontRate}% : <Text>¥{job.price * upfrontRate / 100}</Text></Text>
                </View>
                <NotPaidAction job={job} navigation={this.props.navigation} />
              </View>}

             {job.status == '待拍摄' && 
              <View>
              <View stye={styles.textContainer}>
                <Text size={14}>定价 : <Text>¥{job.price}</Text></Text>
                <Text size={14}>首付款已支付 : <Text>¥{job.price}</Text></Text>
              </View>
              <WaitingAction job={job} navigation={this.props.navigation}/>
            </View>}

             {job.status == '待验收' && 
              <View>
              <View stye={styles.textContainer}>
                <Text size={14}>定价 : <Text>¥{job.price}</Text></Text>
                <Text size={14}>已支付首付款 : <Text>¥{job.price}</Text></Text>
              </View>
              <TestingAction job={job} navigation={this.props.navigation} />
            </View>}

             {job.status == '评价' && 
               <View>
               <View stye={styles.textContainer}>
                 <Text size={14}>订单总金额 : <Text>¥{job.price}</Text></Text>
               </View>
               <FeedbackAction navigation={navigation} job={job}/>
             </View>}

             {job.status == '已完成' && 
              <View>
              <View stye={styles.textContainer}>
                <Text size={14}>订单总金额 : <Text>¥{job.price}</Text></Text>
              </View>
              <FinishingAction job={job} navigation={this.props.navigation}/>
            </View>}
            
            </View>
            </TouchableRipple>
         )) : <NoData />}
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
