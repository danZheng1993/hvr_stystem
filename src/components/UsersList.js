import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
} from 'react-native';
import constants from '../constants'
import { fonts, colors } from '../styles';
import { TouchableRipple } from 'react-native-paper';
import {Text} from './StyledText';
export default class UsersList extends React.Component {
  constructor(props) {
    super(props)
    
  }
  render() {   
    const {user, navigation} = this.props
    console.log(user)
    return (
      <TouchableRipple onPress={() => navigation.navigate('ProviderDetail', {id: user._id})} style={{marginBottom: 10}}>
      {user &&
          <ImageBackground
              source={require('../../assets/images/userBackground.png')}
              style={{ flex: 1, flexDirection: 'row', padding: 10}}
              resizeMode="cover"
          >
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={{uri: constants.BASE_URL + (user.photo ? user.photo: 'default.png')}}
                style={styles.photo}
              />
              <Text bold>{user.userName}</Text>
              <Text>{user.overview}</Text>
            </View>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text color={colors.secondary}>服务雇主: 3000</Text>
              <Text color={colors.secondary}>家发布作品: 2600个</Text>
              <Text color={colors.secondary}>播放量:200万</Text>
              <Text color={colors.secondary}>坐标: 北京</Text>
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
