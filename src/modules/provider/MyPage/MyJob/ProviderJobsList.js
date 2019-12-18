import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import moment from 'moment'
import { fonts, colors } from '../../../../styles';
import { TouchableRipple } from 'react-native-paper';
import {NoData, Button, Text} from '../../../../components'

export default class ProviderJobsList extends React.Component {
  constructor(props) {
    super(props)
    
  }

  handleContact = (id) => {
    this.props.navigation.navigate('Chatting', {to: id})
  } 


  render() {   
    const {jobs, navigation} = this.props
    console.log(jobs)
    return (
        <ScrollView>          
         {jobs.length ? jobs.map((job, index) => (
          <TouchableRipple key={index} onPress={() => navigation.navigate('ProviderJobDetail', {id: job._id})}>
           <View key={index} style={styles.componentsSection}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: colors.greybackground, marginBottom: 5}}>
              <Text size={16} color={colors.secondary}>订单信息</Text>
              <Text size={16} color={colors.primary}>{job.status}</Text>
            </View>
             <Text size={14}>订单编号: {job._id}</Text>
             <Text size={14}>创建时间: {moment(job.created).format("YYYY-MM-DD hh:mm:ss")}</Text>
             <Text size={14}>服务项目: {job.type}</Text>
             <Text size={14}>拍摄城市: {job.location}</Text>
             {job.status == '竞标中' && 
              <View style={styles.buttonsContainer}>
                <Button
                small
                caption="联系需求方"
                onPress={() => this.handleContact(job.creator)}
                />
              </View>}
             {job.status == '已选用' && 
              <View style={styles.buttonsContainer}>
              <Button
              small
              caption="联系需求方"
              onPress={() => this.handleContact(job.creator)}
              />
            </View>}
             {job.status == '待付款' && 
              <View>
              <View stye={styles.textContainer}>
                <Text size={14}>定价 : <Text>¥{job.price}</Text></Text>
                <Text size={14}>首付款(20%) : <Text>¥{job.price}</Text></Text>
                <Text size={14}>尾款(80%) : <Text>¥{job.price}</Text></Text>
                <View style={styles.buttonsContainer}>
                  <Button
                  small
                  caption="联系需求方"
                  onPress={() => this.handleContact(job.creator)}
                  />
                </View>
              </View>
            </View>}
             {job.status == '待拍摄' && 
              <View>
              <View stye={styles.textContainer}>
                <View style={styles.buttonsContainer}>
                  <Button
                  small
                  caption="联系需求方"
                  onPress={() => this.handleContact(job.creator)}
                  />
                  <Button
                  small
                  caption="上传视频链接"
                  onPress={() => this.props.navigation.navigate('UploadMedia', {id: job._id})}
                  />
                </View>
              </View>
            </View>}
             {job.status == '待验收' && 
               <View>
               <View stye={styles.textContainer}>
                <View style={styles.buttonsContainer}>
                  <Button
                  small
                  caption="联系需求方"
                  onPress={() => this.handleContact(job.creator)}
                  />
                  <Button
                  small
                  caption="上传视频链接"
                  onPress={() => this.props.navigation.navigate('UploadMedia', {id: job._id})}
                  />
                </View>
               </View>
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
    borderTopWidth: 1, 
    borderTopColor: colors.greybackground,
    alignItems: 'flex-end',
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10
  },
});
