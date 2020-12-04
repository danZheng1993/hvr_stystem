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

import { Loader, NoData } from '../../../components'
import { colors } from '../../../styles';

import { getContracts } from '../../../redux/modules/contracts'
import { contractsResultSelector, contractsLoadingSelelctor } from '../../../redux/selectors'


class MyContracts extends React.Component {

  componentDidMount() {
    this.props.getContracts();
  }

  render() {    
    const {contracts, loading} = this.props
    return (
      <View style={styles.container}>
        <Loader loading={loading} />
        {contracts?.length > 0 ? 
        <>
            <WebView
                source={{html: contracts[1].first}}
                containerStyle={{ width: '100%', paddingHorizontal: 16, height: 120, borderColor: 'black', borderBottomWidth: 1}}
                mixedContentMode="always"
                overScrollMode="content"
                contentMode="mobile"
                contentInsetAdjustmentBehavior="automatic"
            />
            <WebView
                source={{html: contracts[1].second}}
                containerStyle={{ width: '100%', paddingHorizontal: 16, height: 120}}
                mixedContentMode="always"
                overScrollMode="content"
                contentMode="mobile"
                contentInsetAdjustmentBehavior="automatic"
            />
        </>
        : <NoData />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
});


const mapStateToProps = createStructuredSelector({
  contracts: contractsResultSelector,
  loading: contractsLoadingSelelctor,
});

const mapDispatchToProps = {
    getContracts,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(MyContracts);
