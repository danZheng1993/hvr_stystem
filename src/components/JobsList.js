import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
} from 'react-native';
import moment from 'moment'
import {Button} from '../components'
import { fonts, colors } from '../styles';

handleClick = () => {

}

export default class JobsList extends React.Component {
  constructor(props) {
    super(props)
    
  }
  render() {   
    const {jobs, navigation} = this.props
    console.log(jobs)
    return (
        <ScrollView>          
         {jobs && jobs.map((job, index) => (
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
                <View style={styles.buttonsContainer}>
                  <Button
                    small
                    style={styles.button}
                    caption="联系服务商"
                    onPress={this.handleClick}
                  />
                  <Button
                    small
                    style={styles.button}
                    caption="取消订单"
                    onPress={this.handleClick}
                  />
                  <Button
                    small
                    style={styles.button}
                    caption="去支付"
                    onPress={this.handleClick}
                  />
                </View>
              </View>}
             {job.status == '待拍摄' && 
              <View>
              <View stye={styles.textContainer}>
                <Text size={14}>定价 : <Text>¥{job.price}</Text></Text>
                <Text size={14}>首付款已支付 : <Text>¥{job.price}</Text></Text>
              </View>
              <View style={styles.buttonsContainer}>
                <Button
                  small
                  style={styles.button}
                  caption="联系服务商"
                  onPress={this.handleClick}
                />
                <Button
                  small
                  style={styles.button}
                  caption="取消订单"
                  onPress={this.handleClick}
                />
                <Button
                  small
                  style={styles.button}
                  caption="催一催"
                  onPress={this.handleClick}
                />
              </View>
            </View>}
             {job.status == '待验收' && 
              <View>
              <View stye={styles.textContainer}>
                <Text size={14}>定价 : <Text>¥{job.price}</Text></Text>
                <Text size={14}>已支付首付款 : <Text>¥{job.price}</Text></Text>
              </View>
              <View style={styles.buttonsContainer}>
                <Button
                  small
                  style={styles.button}
                  caption="联系服务商"
                  onPress={this.handleClick}
                />
                <Button
                  small
                  style={styles.button}
                  caption="查看视频"
                  onPress={this.handleClick}
                />
                <Button
                  small
                  style={styles.button}
                  caption="确认验收"
                  onPress={this.handleClick}
                />
              </View>
            </View>}
             {job.status == '评价' && 
               <View>
               <View stye={styles.textContainer}>
                 <Text size={14}>订单总金额 : <Text>¥{job.price}</Text></Text>
               </View>
               <View style={styles.buttonsContainer}>
                 <Button
                   small
                   style={styles.button}
                   caption="联系服务商"
                   onPress={this.handleClick}
                 />
                 <Button
                   small
                   style={styles.button}
                   caption="查看视频"
                   onPress={this.handleClick}
                 />
                 <Button
                   small
                   style={styles.button}
                   caption="评价"
                   onPress={this.handleClick}
                 />
               </View>
             </View>}
             {job.status == '已完成' && 
              <View>
              <View stye={styles.textContainer}>
                <Text size={14}>订单总金额 : <Text>¥{job.price}</Text></Text>
              </View>
              <View style={styles.buttonsContainer}>
                <Button
                  small
                  style={styles.button}
                  caption="联系服务商"
                  onPress={this.handleClick}
                />
                <Button
                  small
                  style={styles.button}
                  caption="查看视频"
                  onPress={this.handleClick}
                />
              </View>
            </View>}
             
            </View>

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
