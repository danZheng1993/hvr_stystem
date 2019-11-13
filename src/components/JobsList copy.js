import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text
} from 'react-native';
import moment from 'moment'
import { fonts, colors } from '../styles';

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
             <Text size={14}>订单信息:<Text>{job.status}</Text></Text>
             <Text size={14}>订单编号:<Text>{job._id}</Text></Text>
             <Text size={14}>创建时间:<Text>{moment(job.created).format("YYYY-MM-DD HH:MM:SS")}</Text></Text>
             <Text size={14}>服务项目：:<Text>{job.type}</Text></Text>
             <Text size={14}>拍摄城市:<Text>{job.location}</Text></Text>
             <Text size={14}>平台预估参考价:<Text>¥{job.budget}</Text></Text>
             <Text size={14}>需求方预算价格:<Text>¥{job.budget}</Text></Text>
             <Text size={14} onPress={() => {
              navigation.navigate('JobDetails', {
                id: job._id,
              });
            }}
            >查看更多</Text>
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
});
