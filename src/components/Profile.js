import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';
import get from 'lodash/get';

import {Text} from './StyledText'
import { colors } from '../styles';
import constants from '../constants';
import { TouchableRipple } from 'react-native-paper';

import DefaultAvatarImage from '../../assets/images/default-avatar.png';

export default class Profile extends React.Component {
  state = {
    avatarImage: false,
    loading: null,
  }

  componentDidMount() {
    const { user } = this.props
    this.setState({
      avatarImage: {uri: constants.BASE_URL + 'profileImage/' + user.photo}
    });
  }

  componentDidUpdate(prevProps) {
    if (get(prevProps, 'user.photo') !== get(this.props, 'user.photo')) {
      const { user } = this.props
      this.setState({
        avatarImage: {uri: constants.BASE_URL + 'profileImage/' + user.photo}
      });
    }
  }

  handleAvatarLoadStart = () => {
    console.log('start loading');
    this.setState({ loading: true });
  }

  handleAvatarLoadEnd = () => {
    console.log('load end');
    this.setState({ loading: false });
  }

  handleAvatarLoadError = (err) => {
    console.log('load error', err);
    this.setState({ loading: false, avatarImage: DefaultAvatarImage });
  }

  render() {   
    const {user} = this.props
    const { loading, avatarImage } = this.state;
    return (
      <View >
        {user &&
          <View style = {styles.row}>
            <TouchableRipple onPress={() => this.props.navigation.navigate('BasicProfile', {update: 'photo'})}>
              <View style={styles.imageWrapper}>
                <Image
                  source={avatarImage}
                  style={styles.photo}
                  onLoadStart={this.handleAvatarLoadStart}
                  onLoad={this.handleAvatarLoadEnd}
                  onError={this.handleAvatarLoadError}
                />
                {loading && (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="small" color="white" />
                  </View>
                )}
              </View>
            </TouchableRipple>
            <View style={{justifyContent: 'center',}}>
              <Text white bold size={18}>{user.userName}</Text>
              <Text white size={12}>{user.overview.slice(0,15)}</Text>
            </View>
          </View>
        }
      </View>
    );
    }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row'
  },
  imageWrapper: {
    width: 70,
    height: 70,
    position: 'relative',
    borderRadius: 35,
    overflow: 'hidden',
    marginRight: 16,
  }, 
  photo: {
    borderRadius: 35,
    borderColor: colors.gray,
    backgroundColor: colors.info,
    width: 70,
    height: 70
  },
  loadingContainer: {
    position: 'absolute',
    width: 70,
    height: 70,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
