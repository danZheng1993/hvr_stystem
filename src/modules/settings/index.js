import { ListItem } from 'react-native-elements'
import { View, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { CommonActions, useNavigation } from '@react-navigation/native';

import {logout} from '../../redux/modules/auth'
import { clearItem } from '../../redux/api/storage'
import colors from '../../styles/colors'
import {Text} from '../../components'

const settings = props => {
  const navigation = useNavigation();
  const clearStorage = ()=> {
    Alert.alert('你想注销吗？', '', [
      { text: '取消' },
      {
        text: '可以',
        onPress: () => {
          navigation.reset({
            routes: [{ name: 'Main' }],
            index: 0
          });
          clearItem().then(() => {
            props.logout();
          });
        }
      }
    ])
  }
  return (
    <View style={{justifyContent: 'space-between', flex: 1, backgroundColor: colors.bluish}}>
      <View style={{ backgroundColor: colors.white, paddingHorizontal: 15, margin: 20,borderRadius: 5}}>
        <ListItem
          key={1}
          titleStyle={{color: colors.secondary, fontWeight: 'bold', fontSize: 18}}
          title='个人资料设置'
          hideChevron={false}
          chevron={{ color: colors.secondary, size: 28 }}
          onPress={() => props.navigation.navigate('PersonalInformation')}
          bottomDivider
        />
        <ListItem
          key={2}
          title='账户安全'
          chevron={{ color: colors.secondary, size: 28}}
          titleStyle={{color: colors.secondary, fontWeight: 'bold', fontSize: 18}}
          hideChevron={false}
          onPress={() => props.navigation.navigate('Security')}
          bottomDivider
        />
      </View>
      <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.secondary,
          padding: 10
        }}
        onPress={clearStorage}
      >
        <Text white bold size={18}>退出登录</Text>
      </TouchableOpacity>
    </View>
  );
}

const mapStateToProps = createStructuredSelector({
});

const mapDispatchToProps = {
    logout,
};
  
const withConnect = connect(mapStateToProps, mapDispatchToProps);
  
export default compose(withConnect)(settings);
