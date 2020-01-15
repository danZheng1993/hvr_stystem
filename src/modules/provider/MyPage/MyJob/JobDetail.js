import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView
} from 'react-native';

import { colors } from '../../../../styles';
import { JobDetail, Button, Text } from '../../../../components';
import { getDateTimeStr } from '../../../../utils/helper';
import {settingsListSelector} from '../../../../redux/selectors'

import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
class ProviderJobDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      price: 0,
      job : null,
    }
  }

  componentWillMount() {
    const { navigation} = this.props
    let job = navigation.getParam('job', '')
    if (job) {
      this.setState({job})
    }
  }
  
  renderPrice = (job) => {
    if (!job) return
    return (
      <View>
        <Text size={14}>平台预估参考价: ¥{job.systembudget}</Text>
        <Text size={14}>需求方预算价格: ¥{job.budget}</Text>
        <Text size={14}>报价: ¥{job.price}</Text>
        <Text size={14}>定价: 暂无</Text>
      </View>
    )
  }

  renderPayment = (job) => {
    if (!job) return
    const {settings} = this.props
    return (
      <View>
        <Text size={14}>首付款 ({settings.upfrontRate}) : ¥{job.price * settings.upfrontRate / 100}</Text>
        <Text size={14}>尾款 ({100 - settings.upfrontRate}) : ¥{job.price * (100 - settings.upfrontRate) / 100}</Text>
        <Text size={14}>首付款支付时间: {getDateTimeStr(job.created)}</Text>
        <Text size={14}>尾款支付时间：{getDateTimeStr(job.created)}</Text>
      </View>
    )
  }
  
  render() {
    const { job } = this.state
    if (!job) {
      return (
        <View></View>
      )
    }    
    return (
      <ScrollView style={{backgroundColor: colors.bluish}}>
      <View style={styles.container}>
          <View style={{backgroundColor: colors.white, borderRadius: 5}}>
            <JobDetail job={job} />
            {job.status == '竞标中' && 
              <View style={styles.componentsSection}>
                {this.renderPrice(job)}
                <View style={styles.buttonsContainer}>
                  <Button
                    small
                    caption="联系需求方"
                    onPress={() => this.props.navigation.navigate('Chatting', {to: job.creator})}
                  />
                </View>
              </View>
            }
            {job.status == '已选用' && 
              <View style={styles.componentsSection}>
                <Text size={14}>定价 : ¥{job.price}</Text>
                <Text size={14}>订单总金额 : ¥{job.price}</Text>
                <View style={styles.buttonsContainer}>
                  <Button
                  small
                  caption="联系需求方"
                  onPress={() => this.props.navigation.navigate('Chatting', {to: job.creator})}
                  />
                </View>
              </View>
            }
            {job.status == '待付款' && 
              <View style={styles.componentsSection}>
                {this.renderPrice(job)}
                {/* {this.renderPayment(job)} */}
                <View style={styles.buttonsContainer}>
                  <Button
                  small
                  caption="联系需求方"
                  onPress={() => this.props.navigation.navigate('Chatting', {to: job.creator})}
                  />
                </View>
              </View>
            }
            {job.status == '待拍摄' && 
              <View style={styles.componentsSection}>
                {this.renderPrice(job)}
                <View style={styles.buttonsContainer}>
                  <Button
                    small
                    caption="联系需求方"
                    onPress={() => this.props.navigation.navigate('Chatting', {to: job.creator})}
                  />
                  <Button
                    small
                    bgColor={colors.warning}
                    caption="上传视频链接"
                    onPress={() => this.props.navigation.navigate('UploadMedia', {id: job._id})}
                  />
                </View>
              </View>
            }
            {job.status == '待验收' && 
              <View style={styles.componentsSection}>
                {this.renderPrice(job)}
                <View style={styles.buttonsContainer}>
                  <Button
                    small
                    caption="联系需求方"
                    onPress={() => this.props.navigation.navigate('Chatting', {to: job.creator})}
                  />
                  <Button
                    small
                    bgColor={colors.warning}
                    caption="上传视频链接"
                    onPress={() => this.props.navigation.navigate('UploadMedia', {id: job._id})}
                  />
                </View>
              </View>
            }
          </View>
      </View>
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
    justifyContent: "space-around"
  },
  
  description: {
    alignSelf: 'stretch'
  },
  
  buttonsContainer: {
    alignItems: 'flex-end',
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  componentsSection: {
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderRadius: 5,
  },
});

const mapStateToProps = createStructuredSelector({
  settings: settingsListSelector,
});

const mapDispatchToProps = {
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ProviderJobDetail);