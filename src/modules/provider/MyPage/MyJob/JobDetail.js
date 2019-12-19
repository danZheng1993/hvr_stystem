import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView
} from 'react-native';

import { fonts, colors } from '../../../../styles';
import { JobDetail, Button, Text } from '../../../../components';

import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { myJobsSelector } from '../../../../redux/selectors'
import { findIndex } from 'lodash'

class ProviderJobDetail extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      price: 0,
      id : '',
    }
  }
  componentWillMount() {
    const { navigation} = this.props
    let id = navigation.getParam('id', '')
    if (id) {
      this.setState({id})
    }
  }
  
  render() {
    const { jobs } = this.props
    const { id } = this.state
    const index = findIndex(jobs, {_id : id})
    var job = {}
    if (index !== -1) {
      job = jobs[index]
    } else {
      return (
        <View></View>
      )
    }    
    return (
      <ScrollView style={{backgroundColor: colors.bluish}}>
      <View style={styles.container}>
          <View style={styles.description}>
            <JobDetail job={job} />
            {job.status == '竞标中' && 
              <View style={styles.buttonsContainer}>
                <Button
                small
                style={styles.button}
                caption="联系需求方"
                onPress={() => this.props.navigation.navigate('Chatting', {to: job.creator})}
                />
              </View>
            }
            {job.status == '已选用' && 
              <View style={styles.componentsSection}>
                <Text size={14}>定价 : ¥{job.price}</Text>
                <Text size={14}>订单总金额 : ¥{job.price}</Text>
                <View style={styles.buttonsContainer}>
                  <Button
                  small
                  style={styles.button}
                  caption="联系需求方"
                  onPress={() => this.props.navigation.navigate('Chatting', {to: job.creator})}
                  />
                </View>
              </View>
            }
            {job.status == '待付款' && 
              <View style={styles.componentsSection}>
                <Text size={14}>定价 : ¥{job.price}</Text>
                <Text size={14}>首付款 : ¥{job.price / 5}</Text>
                <View style={styles.buttonsContainer}>
                  <Button
                  small
                  style={styles.button}
                  caption="联系需求方"
                  onPress={() => this.props.navigation.navigate('Chatting', {to: job.creator})}
                  />
                </View>
              </View>
            }
            {job.status == '待拍摄' && 
              <View style={styles.componentsSection}>
                <Text size={14}>定价 : ¥{job.price}</Text>
                <Text size={14}>已支付首付款 : ¥{job.price / 5}</Text>
                  <View style={styles.buttonsContainer}>
                    <Button
                    small
                    style={styles.button}
                    caption="联系需求方"
                    onPress={() => this.props.navigation.navigate('Chatting', {to: job.creator})}
                    />
                    <Button
                    small
                    style={styles.button}
                    caption="上传视频链接"
                    onPress={() => this.props.navigation.navigate('UploadMedia', {id: job._id})}
                    />
                  </View>
              </View>
            }
            {job.status == '待验收' && 
              <View style={styles.componentsSection}>
                <Text size={14}>定价 : ¥{job.price}</Text>
                <Text size={14}>已支付首付款 : ¥{job.price / 5}</Text>
                <View style={styles.buttonsContainer}>
                  <Button
                  small
                  style={styles.button}
                  caption="联系需求方"
                  onPress={() => this.props.navigation.navigate('Chatting', {to: job.creator})}
                  />
                   <Button
                    small
                    style={styles.button}
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
    justifyContent: 'space-around',
    marginTop: 20
  },
  button: {
    marginBottom: 20,
    alignSelf: 'stretch',
  },
  componentsSection: {
    backgroundColor: colors.white,
    padding: 15,
    marginBottom: 20,
    borderRadius: 5,
  },
});

const mapStateToProps = createStructuredSelector({
  jobs: myJobsSelector,
});

const mapDispatchToProps = {
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ProviderJobDetail);