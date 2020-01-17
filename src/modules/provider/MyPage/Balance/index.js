import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native'
import { colors } from '../../../../styles';
import { Text } from '../../../../components';
import { TouchableRipple } from 'react-native-paper';
export default class Balance extends Component {
  render() {
    const {navigation} = this.props
    let balance = navigation.getParam('balance', 0)
    return (
      <View style={styles.container}>
        <View style={styles.componentsSection}>
          <Text size={16} bold black>余额账户（元）</Text>
          <Text size={48} bold black>￥{balance}</Text>
          <View style={{borderTopColor: colors.greybackground, borderTopWidth: 1, alignSelf: 'stretch'}}>
          </View>
          <TouchableRipple onPress={() => navigation.navigate('Withdraw')} style={{backgroundColor: colors.secondary, paddingVertical: 5, paddingHorizontal: 70, marginVertical: 20}}>
            <Text white bold size={18}>提现</Text>
          </TouchableRipple>
          <Text>说明：每周可提现一次，提现统一在下周一到账， 节假日顺延。</Text>
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
