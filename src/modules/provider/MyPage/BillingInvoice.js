import React from 'react';

import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Alert,
} from 'react-native';

import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import ImagePicker from 'react-native-image-picker'

import { Button, Loader } from '../../../components'
import { colors } from '../../../styles';
import uploadFile from '../../../redux/api/upload'
import { getMyInvoice } from '../../../redux/modules/invoice'
import { invoicesloadingSelector, myInvoiceSelector } from '../../../redux/selectors'

class BillingInvoice extends React.Component {

  componentWillMount() {
    const {getMyInvoice} = this.props
    getMyInvoice()
  }
  
  createFormData = (photo, body) => {
    const data = new FormData();
    data.append("photo", {
      name: photo.fileName,
      type: photo.type,
      uri: photo.uri
        // Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
    });
  
    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });
    console.log("uplaod", data)
    return data;
  };
  
  handleChoosePhoto = (id) => {
    var options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        Alert.alert(response.customButton);
      } else {
        let source = response;
        uploadFile(`invoices/${id}`, 'post',this.createFormData(source, { type: "photo"}))
          .then(res => console.log("res>>>",res))
          .catch(err => Alert.alert(err))
      }
    });
  }

  render() {    
    const {loading, myInvoice} = this.props
    return (
      <ScrollView style={styles.container}>
        <Loader loading={loading} />
        <View>
          {Array.isArray(myInvoice) && myInvoice.map((invoice, index) => (
            <View style={styles.componentsSection} key={index}>
              <View>
                <Text>订单编号 : {invoice.jobID._id}</Text>
                <Text>订单金额 : ¥{invoice.price}</Text>
                <Text>发票金额 : ¥{invoice.price}</Text>
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
                  onPress={() => this.handleChoosePhoto(invoice._id)}
                />
              </View>
              }
              {invoice.status == 'INVOICE_RECEIVED' &&                
              <View style={styles.buttonsContainer}>
                <Button
                  small
                  caption="查看发票"
                  onPress={() => this.props.navigation.navigate('ViewInvoice', {invoice})}
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
