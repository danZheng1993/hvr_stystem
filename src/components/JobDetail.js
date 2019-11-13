import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

import moment from 'moment'

import { fonts, colors } from '../styles';

export default class JobDetail extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {  
    const {job} = this.props
    return (
      <>
         {job && <>
           <View style={styles.componentsSection}>
             <Text size={14}>订单信息 : <Text>{job.status}</Text></Text>
             <Text size={14}>订单编号 : <Text>{job._id}</Text></Text>
             <Text size={14}>创建时间 : <Text>{moment(job.created).format("YYYY-MM-DD HH:MM:SS")}</Text></Text>
             <Text size={14}>拍摄城市 : <Text>{job.location}</Text></Text>
             <Text size={14}>服务项目 : <Text>{job.count}个以内场景</Text></Text>
             <Text size={14}>场景数量 : <Text>{job.type}</Text></Text>
             <Text size={14}>拍摄场景 : <Text>{job.scene}</Text></Text>
             <Text size={14}>行业类别 : <Text>{job.subcategory}</Text></Text>
             <Text size={14}>其他要求 : <Text>{job.service}</Text></Text>
             <Text size={14}>需求描述 : <Text>{job.description}</Text></Text>
            </View>
            </>
         }
      </>
    );
    }
}

const styles = StyleSheet.create({
  componentsSection: {
    backgroundColor: colors.white,
    padding: 15,
    marginBottom: 20,
    borderRadius: 5,
  },
});