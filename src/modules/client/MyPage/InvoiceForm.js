import React from 'react'
import { View, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper';

import { colors } from '../../../styles'
import { Button, Text } from '../../../components';

import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';

import { updateInvoice, updateMyInvoiceList } from '../../../redux/modules/invoice'
import RadioForm from 'react-native-simple-radio-button';
import { invoicesloadingSelector } from '../../../redux/selectors';

class InvoiceForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      invoice: {},
      headerType: '个人/事业单位',
      radioGroup: [
        {
            label: '个人/事业单位',
            value: '个人/事业单位'
        },
        {
            label: '单位',
            value: '单位',
        },
      ],
      booleanGroup: [
        {
            label: '是',
            value: true
        },
        {
            label: '不',
            value: false,
        },
      ],
      isMail: false,
      headerContent: '',
      mailAddress: '',
      taxNumber: '',
    }
  }

  componentWillMount() {
    const { navigation} = this.props
    let invoice = navigation.getParam('invoice', {})
    if (invoice) {
      this.setState({invoice})
    }
  }
  handleSuccess = (data) => {
    this.props.updateMyInvoiceList(data)
    this.props.navigation.goBack()
  }

  handleClick = () => {
    const {updateInvoice} = this.props
    const {headerContent, headerType, taxNumber, mailAddress, isMail, invoice} = this.state
    updateInvoice({
      id: invoice._id,
      body: {headerType, headerContent, taxNumber, mailAddress, isMail},
      success: (payload) => this.handleSuccess(payload.data)
    })
  };
  render() {
    const {invoice} = this.state
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.componentsSection}>
            <Text size={18} black>发票类型 : </Text>
            <View style={{borderRadius: 5, borderColor: colors.primary, borderWidth: 1, paddingHorizontal: 20}}>
              <Text size={18} color={colors.primary}>{invoice.type}</Text>
            </View>
          </View>
          <View style={styles.componentsSection}>
            <Text size={18} black>发票金额 : <Text size={18} color={colors.primary}>¥{invoice.price}</Text></Text>
          </View>
          <View style={{backgroundColor: colors.white, paddingHorizontal: 10}}>
            <Text size={18} black style={{paddingLeft: 20}}>发票抬头</Text>
            <View style={styles.underline}>
              <RadioForm
                radio_props={this.state.radioGroup}
                initial={0}
                formHorizontal={true}
                labelHorizontal={true}
                buttonColor={'#000000'}
                animation={true}
                onPress = {(value) => {this.setState({headerType: value})}}
              />
            </View>
            <View style={{alignSelf: 'stretch'}}>
              <TextInput
                  style={styles.input}
                  outlined
                  label='请填写发票抬头'
                  placeholder="请填写发票抬头"
                  maxLength={100}
                  value={this.state.headerContent}
                  onChangeText={headerContent => this.setState({ headerContent })}
              />
            </View>
            <View style={{alignSelf: 'stretch'}}>
              <TextInput
                  style={styles.input}
                  outlined
                  label='请填写购买方纳税人识别号'
                  placeholder="请填写购买方纳税人识别号"
                  maxLength={20}
                  value={this.state.taxNumber}
                  keyboardType='numeric'
                  onChangeText={taxNumber => this.setState({ taxNumber })}
              />
            </View>
            <View>
              <Text size={18} black style={{paddingLeft: 20}}>是否邮寄</Text>
              <View style={styles.underline}>
                <RadioForm
                  radio_props={this.state.booleanGroup}
                  initial={1}
                  formHorizontal={true} 
                  labelHorizontal={true}
                  buttonColor={'#000000'}
                  animation={true}
                  onPress = {(value) => {this.setState({isMail: value})}}
                />
              </View>
            </View>
            {/* <View style={{alignSelf: 'stretch'}}>
              <TextInput
                  style={styles.input}
                  outlined
                  label='输入邮寄地址'
                  placeholder="输入邮寄地址"
                  value={this.state.mailAddress}
                  onChangeText={mailAddress => this.setState({ mailAddress })}
              />
            </View> */}
          </View>
        </View>
        <Button
          large
          bgColor={colors.secondary}
          style={{alignSelf: 'stretch'}}
          caption="提交"
          onPress={() => this.handleClick()}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bluish,
    alignItems: 'stretch',
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  input: {
    marginBottom: 15,
  },
  underline: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 10,
    marginVertical: 10
  },
  componentsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginBottom: 10
  },
});

const mapStateToProps = createStructuredSelector({
});

const mapDispatchToProps = {
  updateInvoice,
  updateMyInvoiceList
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(InvoiceForm);
