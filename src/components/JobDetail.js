import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'recompose';
import {Text} from '../components'
import { settingsListSelector } from '../redux/selectors'
import { fonts, colors } from '../styles';
import { getDateTimeStr } from '../utils/helper';

class JobDetail extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {  
    const {job, settings} = this.props
    const upfrontRate = settings.upfrontRate || 0
    return (
      job ?
        <View style={styles.componentsSection}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: colors.grey, marginBottom: 5}}>
            <Text size={18} black>订单信息</Text>
            <Text size={18} color={colors.secondary}>{job.status}</Text>
          </View>
          <Text size={14}>订单编号: {job._id}</Text>
          <Text size={14}>创建时间: {getDateTimeStr(job.created)}</Text>
          <Text size={14}>拍摄城市: {job.location}</Text>
          <Text size={14}>场景数量: {job.count}个以内场景</Text>
          <Text size={14}>服务项目: {job.type}</Text>
          <Text size={14}>拍摄场景: {job.scene}</Text>
          <Text size={14}>行业类别: {job.subcategory}</Text>
          <Text size={14}>其他要求: {job.services}</Text>
          <Text size={14}>需求描述: {job.description}</Text>
          {job.status != '竞标中' && <>
          <Text size={14}>项目定价 : ¥{job.price}</Text>
          <Text size={14}>项目首付款({upfrontRate}%) : ¥{job.price * upfrontRate / 100}</Text>
          <Text size={14}>项目尾款({100-upfrontRate}%) : ¥{job.price *(100 - upfrontRate) / 100}</Text>
          <Text size={14}>首付款支付时间 : </Text>
          <Text size={14}>尾款支付时间 : </Text>
          </> }
        </View>: 
        <Text>Error</Text>
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