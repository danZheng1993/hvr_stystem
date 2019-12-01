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
    if (typeof(invoice) == 'object') {
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
        <View style={styles.componentsSection}> 
          <Text size={20}>发票类型 : {invoice.type}</Text>
          <Text size={20}>发票金额 : {invoice.price}</Text>
           <View>
            <Text >
              发票抬头
            </Text>
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
            <Text size={14}>
              是否邮寄
            </Text>
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
          <View style={{alignSelf: 'stretch'}}>
            <TextInput
                style={styles.input}
                outlined
                label='输入邮寄地址'
                placeholder="输入邮寄地址"
                value={this.state.mailAddress}
                onChangeText={mailAddress => this.setState({ mailAddress })}
            />
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            large
            bgColor={colors.warning}
            style={styles.button}
            caption="提交"
            onPress={() => this.handleClick()}
          />
        </View>
      </View>    
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bluish,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  input: {
    marginBottom: 15,
  },
  componentsSection: {
    backgroundColor: colors.white,
    padding: 15,
    marginBottom: 20,
    borderRadius: 5,
  },
  buttonsContainer: {
    alignSelf: 'stretch',
    margin: 20
  },
  button: {
    marginBottom: 20,
    alignSelf: 'stretch',
  },
});

const mapStateToProps = createStructuredSelector({
});

const mapDispatchToProps = {
  // updateResult,
  updateInvoice,
  updateMyInvoiceList
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(InvoiceForm);
