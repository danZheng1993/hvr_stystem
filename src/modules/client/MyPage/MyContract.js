import React from 'react';

import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {WebView} from 'react-native-webview';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';

import { Loader, NoData, Text } from '../../../components'
import { colors } from '../../../styles';

import { getMyJob } from '../../../redux/modules/job'
import { myJobsSelector, jobsloadingSelector } from '../../../redux/selectors'
import reactotron from 'reactotron-react-native';

const agreedStatus = ['待付款', '待拍摄', '待验收', '评价'];

class MyContracts extends React.Component {

  componentDidMount() {
    this.props.getMyJob();
  }

  handleNavigate = (contract) => {
    this.props.navigation.navigate('MyContractDetail', { contract });
  }

  keyExtractor = (contract) => `contract_job_${contract._id}`;

  renderItem = ({ item: contract }) => (
    <View style={styles.contractWrapper}>
      <View style={styles.textWrapper}>
        <Text>{contract.type}</Text>
        <Text size={18} color={colors.secondary}>合同金额 : ¥{contract.price}</Text>
      </View>
      <TouchableOpacity 
        style={styles.buttonWrapper} 
        onPress={() => this.handleNavigate(contract)}
      >
        <Text size={18} white>查看详情</Text>
      </TouchableOpacity>
    </View>
  )

  render() {    
    const {jobs, loading} = this.props
    const contractedJobs = jobs.filter(job => agreedStatus.find(status => job.status === status));
    return (
      <View style={styles.container}>
        <Loader loading={loading} />
        {jobs?.length > 0 ? 
        <FlatList
          data={contractedJobs}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
        : <NoData />}
      </View>
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
  contractWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    marginBottom: 20,
    borderRadius: 5,
  },
  textWrapper: {
    padding: 15,
    flex: 1,
  },
  buttonWrapper: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: colors.secondary,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    padding: 15
  }
});


const mapStateToProps = createStructuredSelector({
  jobs: myJobsSelector,
  loading: jobsloadingSelector,
});

const mapDispatchToProps = {
  getMyJob
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(MyContracts);
