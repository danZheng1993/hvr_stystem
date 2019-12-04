import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity
} from 'react-native';
import moment from 'moment'
import { fonts, colors } from '../../../../styles';
import { TouchableRipple } from 'react-native-paper';
import {NoData, Button} from '../../../../components'

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
          <TouchableRipple key={index} onPress={() => navigation.navigate('ProviderJobDetail', {job: job})}>
           <View key={index} style={styles.componentsSection}>
             <Text size={14}>订单信息 : <Text>{job.status}</Text></Text>
             <Text size={14}>订单编号 : <Text>{job._id}</Text></Text>
             <Text size={14}>创建时间 : <Text>{moment(job.created).format("YYYY-MM-DD HH:MM:SS")}</Text></Text>
             <Text size={14}>服务项目 : <Text>{job.type}</Text></Text>
             <Text size={14}>拍摄城市 : <Text>{job.location}</Text></Text>
             {job.status == '竞标中' && 
              <View style={styles.buttonsContainer}>
                <Button
                small
                style={styles.button}
                caption="联系需求方"
                onPress={() => this.handleContact(job.creator)}
                />
              </View>}
             {job.status == '已选用' && 
              <View style={styles.buttonsContainer}>
              <Button
              small
              style={styles.button}
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
                  style={styles.button}
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
                  style={styles.button}
                  caption="联系需求方"
                  onPress={() => this.handleContact(job.creator)}
                  />
                  <Button
                  small
                  style={styles.button}
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
                    style={styles.button}
                    caption="联系需求方"
                    onPress={() => this.handleContact(job.creator)}
                    />
                    <Button
                    small
                    style={styles.button}
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
    alignItems: 'flex-end',
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20
  },

  button: {
  },
});
