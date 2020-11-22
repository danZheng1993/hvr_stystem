import React, {Component} from 'react';
import {View, StyleSheet, Image, TextInput, Alert} from 'react-native'
import { TouchableRipple } from 'react-native-paper';
import * as WeChat from 'react-native-wechat-lib';
import { connect } from 'react-redux';

const iconWeisin = require('../../../../../assets/images/weisin.png')
const iconAlipay = require('../../../../../assets/images/alipay.png')
const iconCard = require('../../../../../assets/images/card.png')
import { colors } from '../../../../styles';
import { Text, toast } from '../../../../components';
import constants from '../../../../constants';

import { sendPaymentToUser } from '../../../../redux/modules/payment';
import reactotron from 'reactotron-react-native';

class Withdraw extends Component {
  constructor(props) {
    super(props)
    this.state = {
      amount: ''
    }
	}
	
	weixinWithdraw = async (amount) => {
		try {
			const result = await WeChat.sendAuthRequest('snsapi_userinfo', 'wechat_hvr_integration');
			const data = await fetch(`${constants.BASE_URL}auth/openid`, {
				method: 'POST',
				body: { code: result.code }
			}).then(response => response.json())
			reactotron.log({ data });
			// this.props.sendPaymentToUser({
			// 	body: {
			// 		amount,
			// 		openId: result.openId,
			// 	},
			// 	success: () => {
			// 		Alert.alert('汇款成功');
			// 	},
			// 	fail: () => {
			// 		Alert.alert('汇款失败');
			// 	}
			// });
		} catch {
			Alert.alert('汇款失败');
		}
	}

  Withdraw = (type) => {
    const {amount} = this.state
    if (!amount || isNaN(amount)) return toast('Wrong Input!')
    switch(type) {
			case 1: // WEISIN
				this.weixinWithdraw(amount);
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
          {/* <TouchableRipple onPress={() => this.Withdraw(2)} style={[styles.button, {backgroundColor: '#01aaef'}]}>
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
          </TouchableRipple> */}
        </View>
      </View>
    );
  }
}

export default connect(null, { sendPaymentToUser })(Withdraw);

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
