import React from 'react';

import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import {WebView} from 'react-native-webview';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import get from 'lodash/get';

import { Loader, NoData } from '../../../components'
import { colors } from '../../../styles';
import { getDateTimeStr } from '../../../utils/helper';

import { getContracts } from '../../../redux/modules/contracts'
import { contractsResultSelector, contractsLoadingSelelctor } from '../../../redux/selectors'
import reactotron from 'reactotron-react-native';


class MyContractDetail extends React.Component {

  componentDidMount() {
    this.props.getContracts();

    reactotron.log(this.props.route);
  }

  render() {    
    const {contracts, loading, route: { params }} = this.props
    const contractDetails = get(params, 'contract');
    return (
      <View style={styles.container}>
        <Loader loading={loading} />
        {contractDetails &&
            <View style={styles.paperWrapper}>
                <Text size={14}>订单编号: {contractDetails._id}</Text>
                <Text size={14}>创建时间: {getDateTimeStr(contractDetails.created)}</Text>
                <Text size={14}>拍摄城市: {contractDetails.location}</Text>
                <Text size={14}>场景数量: {contractDetails.count}个以内场景</Text>
                <Text size={14}>服务项目: {contractDetails.type}</Text>
                <Text size={14}>拍摄场景: {contractDetails.scene}</Text>
                <Text size={14}>行业类别: {contractDetails.subcategory}</Text>
                <Text size={14}>其他要求: {contractDetails.services}</Text>
                <Text size={14}>需求描述: {contractDetails.description}</Text>
                {contracts?.length > 0 ? 
                    <>
                        <WebView
                            source={{html: contracts[1].first}}
                            containerStyle={{ width: '100%', paddingHorizontal: 16, height: 120, marginVertical: 20}}
                            mixedContentMode="always"
                            overScrollMode="content"
                            contentMode="mobile"
                            contentInsetAdjustmentBehavior="automatic"
                        />
                    </>
                    : <NoData />
                }
            </View>
        }
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
  paperWrapper: {
    backgroundColor: colors.white,
    padding: 15,
    marginBottom: 20,
    borderRadius: 5,
    flex: 1,
  },
  fieldWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderBottomColor: colors.greybackground,
      marginBottom: 5,
  }
});


const mapStateToProps = createStructuredSelector({
  contracts: contractsResultSelector,
  loading: contractsLoadingSelelctor,
});

const mapDispatchToProps = {
    getContracts,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(MyContractDetail);
