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

import { Button, Loader, NoData } from '../../../components'
import { fonts, colors } from '../../../styles';

import { getMyInvoice } from '../../../redux/modules/invoice'
import { invoicesloadingSelector, myInvoiceSelector } from '../../../redux/selectors'


class BillingInvoice extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentWillMount() {
    const {getMyInvoice} = this.props
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
                <Text>订单编号 : {invoice.jobID}</Text>
                <Text>订单金额 : {invoice.price}</Text>
                <Text>发票金额 : {invoice.price}</Text>
                <Text>发票抬头 : {invoice.headerType}</Text>
                <Text>纳税人识别号 : {invoice.taxNumber}</Text>
                <Text>邮寄地址 : {invoice.mailAddress}</Text>
              </View>
              {invoice.status == 'INVOICE_SENT' &&  
              <View style={styles.buttonsContainer}>
                <Button
                  small
                  caption="平台代开"
                  onPress={() => null}
                />
                <Button
                  small
                  caption="上传发票"
                  onPress={() => null}
                />
              </View>
              }
              {invoice.status == 'INVOICE_RECEIVED' &&                
              <View style={styles.buttonsContainer}>
                <Button
                  small
                  caption="查看发票"
                  onPress={() => null}
                />
              </View> }
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
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    padding: 15,
    marginBottom: 20,
    borderRadius: 5,
  },
  buttonsContainer: {
    alignItems: 'flex-end',
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20
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

export default compose(withConnect)(BillingInvoice);
