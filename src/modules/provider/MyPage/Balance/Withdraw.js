import React, {Component} from 'react';
import {View, StyleSheet, Image, TextInput} from 'react-native'
import { colors } from '../../../../styles';
import { Text, toast } from '../../../../components';
import { TouchableRipple } from 'react-native-paper';

const iconWeisin = require('../../../../../assets/images/weisin.png')
const iconAlipay = require('../../../../../assets/images/alipay.png')
const iconCard = require('../../../../../assets/images/card.png')

export default class Withdraw extends Component {
  constructor(props) {
    super(props)
    this.state = {
      amount: ''
    }
  }

  Withdraw = (type) => {
    const {amount} = this.state
    if (!amount || isNaN(amount)) return toast('Wrong Input!')
    switch(type) {
      case 1: // WEISIN
        break;
      case 1: // ALIPAY
        break;
      case 1: // CREDIT CARD
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.componentsSection}>
          <Text size={16} bold black style={{alignSelf: 'flex-start'}}>提现金额</Text>
          <View style={styles.row}>
            <Text size={48} bold black>￥</Text>
            <TextInput
              style={[styles.input, {width: '80%'}]}
              keyboardType = 'numeric'
              value={this.state.amount}
              onChangeText={amount => this.setState({ amount })}
            />
          </View>
          <View style={{borderTopColor: colors.greybackground, borderTopWidth: 1, alignSelf: 'stretch'}}>
          </View>
          <TouchableRipple onPress={() => this.Withdraw(1)} style={[styles.button, {backgroundColor: '#66dd79'}]}>
            <View style={styles.row}>
              <Image
                source={iconWeisin}
                style={styles.image}
              />
              <Text white bold size={18}>提现到微信</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => this.Withdraw(2)} style={[styles.button, {backgroundColor: '#01aaef'}]}>
            <View style={styles.row}>
              <Image
                source={iconAlipay}
                style={styles.image}
              />
              <Text white bold size={18}>提现到支付宝</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => this.Withdraw(3)} style={[styles.button, {backgroundColor: '#369eff'}]}>
            <View style={styles.row}>
              <Image
                source={iconCard}
                style={styles.image}
              />
              <Text white bold size={18}>提现到银行卡</Text>
            </View>
          </TouchableRipple>
        </View>
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

  
  input: {
    height: 60,
    padding: 3,
    fontSize: 40
  },

  image: {
    width: 30,
    height: 30
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  button: {
    paddingVertical: 5,
    marginVertical: 10,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center'
  },

  componentsSection: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: colors.white,
    marginBottom: 30,
    paddingVertical: 30,
    paddingHorizontal: 15
  },
});
