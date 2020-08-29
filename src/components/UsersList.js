import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  ActivityIndicator
} from 'react-native';
import constants from '../constants'
import { colors } from '../styles';
import { TouchableRipple } from 'react-native-paper';
import {Text} from './StyledText';

import DefaultAvatarImage from '../../assets/images/default-avatar.png';

export default class UsersList extends React.Component {
  state = {
    loading: false,
    imageFailed: false,
  }
  render() {   
    const {user, navigation} = this.props
    const { imageFailed, loading } = this.state;
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
              <View style={styles.imageWrapper}>
                <Image
                  source={!imageFailed ? {uri: constants.BASE_URL + 'profileImage/' + user.photo + `?t=${new Date().toISOString()}`} : DefaultAvatarImage}
                  style={styles.photo}
                  onLoadStart={() => this.setState({ loading: true })}
                  onLoadEnd={() => this.setState({ loading: false })}
                  onError={() => this.setState({ imageFailed: true, loading: false })}
                />
                {loading && (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="small" color="white" />
                  </View>
                )}
              </View>
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
  imageWrapper: {
    width: 50,
    height: 50,
    position: 'relative',
    borderRadius: 25,
    overflow: 'hidden',
  }, 
  photo: {
    borderRadius: 25,
    borderColor: colors.gray,
    backgroundColor: colors.info,
    width: 50,
    height: 50
  },
  loadingContainer: {
    position: 'absolute',
    width: 50,
    height: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
