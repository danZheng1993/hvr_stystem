import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import get from 'lodash/get';
import { TouchableRipple } from 'react-native-paper';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker'

import {Text} from './StyledText'
import { colors } from '../styles';
import constants from '../constants';
import DefaultAvatarImage from '../../assets/images/default-avatar.png';
import uploadFile from '../redux/api/upload';
import { saveProfile } from '../redux/modules/auth';
import reactotron from 'reactotron-react-native';

class Profile extends React.Component {
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
    this.setState({ loading: true });
  }

  handleAvatarLoadEnd = () => {
    this.setState({ loading: false });
  }

  handleAvatarLoadError = (err) => {
    this.setState({ loading: false, avatarImage: DefaultAvatarImage });
  }

  createFormData = (photo, body) => {
    const data = new FormData();
    const nameParts = (Platform.OS === 'ios' ? photo.uri : photo.path).split('.');
    const ext = nameParts[nameParts.length - 1];
    data.append("photo", {
      name: `profile.${ext}`,
      type: 'image/*',
      uri: Platform.OS === 'android' ? `file://${photo.path}` : photo.uri,
    });
  
    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });
    return data;
  };

  handleUpdatePhoto = () => {
    ImagePicker.showImagePicker(constants.PHOTO_SELECTION_OPTIONS, response => {
      
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const formData = this.createFormData(response, { type: "photo"});
        uploadFile('profile/me', 'POST', formData)
          .then(res => res.json())
          .then(res => {
            reactotron.log(this.props.saveProfile)
            this.props.saveProfile({
              body: {photo: res.fileName},
              success: () => {
                Alert.alert(
                  '成功',
                  '个人资料更新成功',
                  [{ text: '好' }],
                  { cancelable: false },
                );
              },
              fail: () => {
                Alert.alert('发生了错误', '无法更新用户个人资料信息');
              }
            })
          })
      }
    });
  }

  render() {   
    const {user} = this.props
    const { loading, avatarImage } = this.state;
    return (
      <View >
        {user &&
          <View style = {styles.row}>
            <TouchableRipple onPress={this.handleUpdatePhoto}>
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

export default connect(null, { saveProfile })(Profile);
