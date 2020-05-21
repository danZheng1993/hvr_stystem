import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
} from 'react-native';
import constants from '../constants'
import { colors } from '../styles';
import { TouchableRipple } from 'react-native-paper';
import {Text} from './StyledText';

export default class UsersList extends React.Component {
  render() {   
    const {user, navigation} = this.props
    console.log(user)
    return (
      <TouchableRipple onPress={() => navigation.navigate('ProviderDetail', {user: user})} style={{marginBottom: 10}}>
      {user &&
          <ImageBackground
              source={require('../../assets/images/userBackground.png')}
              style={{ flex: 1, flexDirection: 'row', padding: 10}}
              imageStyle={{borderRadius: 10}}
              resizeMode="cover"
          >
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={{uri: constants.BASE_URL + (user.photo ? user.photo: 'default.png')}}
                style={styles.photo}
              />
              <Text bold>{user.userName}</Text>
              <Text size={12} >{user.overview}</Text>
            </View>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text color={colors.primary}>服务雇主: {user.contacts.length}家</Text>
              <Text color={colors.primary}>发布作品: 3个</Text>
              <Text color={colors.primary}>播放量:{user.balance}</Text>
              <Text color={colors.primary}>坐标: {user.location}</Text>
            </View>
          </ImageBackground>}
      </TouchableRipple>
    );
    }
}

const styles = StyleSheet.create({
  photo: {
    borderRadius: 50,
    width: 50,
    height: 50
  },
});
