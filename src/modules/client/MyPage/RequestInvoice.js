import React from 'react';

import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';

import { Loader, Text } from '../../../components'
import { fonts, colors } from '../../../styles';

import { getMyInvoice } from '../../../redux/modules/invoice'
import { invoicesloadingSelector, myInvoiceSelector } from '../../../redux/selectors'

class RequestInvoice extends React.Component {

  componentWillMount() {
    const {getMyInvoice,navigation} = this.props
    getMyInvoice()
  }

  handleNavigate = (invoice) => {
    const {navigation} = this.props
    switch (invoice.status) {
      case 'INVOICE_CREATED':
        navigation.navigate('InvoiceForm', {invoice})
        break;
      case 'INVOICE_RECEIVED':
        navigation.navigate('ViewInvoice', {invoice})
        break;
      default:
        break;
    }
  }
  
  render() {    
    const {loading, myInvoice} = this.props
    return (
      <ScrollView style={styles.container}>
        <Loader loading={loading} />
        <View>
          {Array.isArray(myInvoice) && myInvoice.map((invoice, index) => (
            <View style={styles.componentsSection} key={index}>
              <View style={{padding: 15}}>
                <Text>{invoice.jobID.type}</Text>
                <Text size={18} color={colors.secondary}>合同金额 : ¥{invoice.price}</Text>
              </View>
              <TouchableOpacity 
                style={{alignItems: 'flex-end', justifyContent: 'center', backgroundColor: invoice.status == 'INVOICE_SENT' ? colors.primary : colors.secondary, borderTopRightRadius: 5, borderBottomRightRadius: 5, padding: 15}} 
                onPress={() => this.handleNavigate(invoice)}
              >
                {invoice.status == 'INVOICE_CREATED' && <Text size={18} white>申请发票</Text> }
                {invoice.status == 'INVOICE_SENT' && <Text size={18} white >处理中</Text> }
                {invoice.status == 'INVOICE_RECEIVED' && <Text size={18} white>查看发票</Text> }
              </TouchableOpacity>
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
