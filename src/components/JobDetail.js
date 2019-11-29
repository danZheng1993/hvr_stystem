import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

import moment from 'moment'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'recompose';

import { settingsListSelector } from '../redux/selectors'
import { fonts, colors } from '../styles';

class JobDetail extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {  
    const {job, settings} = this.props
    const upfrontRate = settings.upfrontRate || 0
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
             {job.status != '竞标中' && <>
              <Text size={14}>项目定价 : ¥{job.price}</Text>
              <Text size={14}>项目首付款({upfrontRate}%) : ¥{job.price * upfrontRate / 100}</Text>
              <Text size={14}>项目尾款({100-upfrontRate}%) : ¥{job.price *(100 - upfrontRate) / 100}</Text>
              <Text size={14}>首付款支付时间 : </Text>
              <Text size={14}>尾款支付时间 : </Text>
              </> }
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

const mapStateToProps = createStructuredSelector({
  settings: settingsListSelector
});

const mapDispatchToProps = {
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(JobDetail);