import React from 'react';

import {
  StyleSheet,
  View,
  ScrollView,
  Text,
} from 'react-native';

import { connect } from 'react-redux';
import { withState,compose } from 'recompose';
import { createStructuredSelector } from 'reselect';

import { Button, Loader, MediaList, RadioGroup, NoData } from '../../../components'
import { fonts, colors } from '../../../styles';

import { getMyInvoice } from '../../../redux/modules/invoice'
import { jobsSearchResultSelector, jobsloadingSelector, invoicesloadingSelector, myInvoiceSelector } from '../../../redux/selectors'


class RequestInvoice extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentWillMount() {
    const {getMyInvoice,navigation} = this.props
    getMyInvoice()
  }
  
  render() {    
    const {loading, myInvoice} = this.props
    return (
      <ScrollView style={styles.container}>
        <Loader loading={loading} />
        <View>
          {myInvoice && myInvoice.map((invoice, index) => (
            <View style={styles.componentsSection} key={index}>
              <View>
                <Text>合同金额 : {invoice.price}</Text>
                <Text>合同金额 : {invoice.price}</Text>
              </View>
              <View style={{alignItems: 'flex-end', justifyContent: 'center'}}>
                {invoice.status == 'INVOICE_CREATED' && <Text onPress={() => this.props.navigation.navigate('InvoiceForm', {invoice: invoice})}>申请发票</Text> }
                {invoice.status == 'INVOICE_SENT' && <Text>处理中</Text> }
                {invoice.status == 'INVOICE_RECEIVED' && <Text onPress={() => this.props.navigation.navigate('InvoiceForm', {invoice: invoice})}>查看发票</Text> }
              </View>
            </View>
          ))}
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
  },
  componentsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    padding: 15,
    marginBottom: 20,
    borderRadius: 5,
  },
});


const mapStateToProps = createStructuredSelector({
  myInvoice: myInvoiceSelector,
  loading: invoicesloadingSelector
});

const mapDispatchToProps = {
  getMyInvoice
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(RequestInvoice);
