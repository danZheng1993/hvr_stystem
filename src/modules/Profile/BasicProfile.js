import React from 'react'
import { View, Image, StyleSheet, TouchableOpacity, TextInput, Alert, Platform} from 'react-native'
import { ActivityIndicator } from 'react-native-paper';

import ImagePicker from 'react-native-image-picker'
import { colors } from '../../styles'
import { Button, Text } from '../../components';

import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';

import { saveProfile } from '../../redux/modules/auth'
import { profileSelector } from '../../redux/selectors'
import uploadFile from '../../redux/api/upload'
import constants from '../../constants'
import DefaultAvatar from '../../../assets/images/default-avatar.png'
import reactotron from 'reactotron-react-native';


export const eXTtoType = {
  jpeg: 'jpeg',
  jpg: 'jpg',
  png: 'png',
  mov: 'video/quicktime',
  mp4: 'video/mp4'
};

class BasicProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      photo: null,
      userName: '',
      overview: '',
      update: '',
      location: '北京',
      url: '../../../assets/images/takephoto.png',
      imgError: false,
    }
  }

  componentWillMount() {
    const {profile} = this.props
    let { update } = this.props.route.params;
    if (update != 'none') {
      this.setState({update})
    }
    if (profile) {
      this.setState({
        userName: profile.userName,
        location: profile.location,
        overview: profile.overview,
        url: constants.BASE_URL + 'profileImage/' + profile.photo + `?t=${new Date().toISOString()}`,
        loadingImage: false,
      })
    }
  }

  handleClick = () => {
    const {userName, photo, overview, update,location} = this.state
    const {profile} = this.props
    if (photo) {
      const formData = this.createFormData(photo, { type: "photo"});
      uploadFile('profile/me', 'POST', formData)
        .then(res => {
          if (userName || overview) {
            this.props.saveProfile({
              body: {userName, overview, location}
            })
          }
        })
        .catch(err => console.log('upload error', err))
    }
    if (update == '')
      this.props.navigation.navigate('ShootingID')
    else 
      this.props.navigation.goBack()
  };
  
  handleChoosePhoto = () => {
    var options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        Alert.alert(response.customButton);
      } else {
        this.setState({
          imgError: false,
          photo: response,
        });
      }
    });
  }

  createFormData = (photo, body) => {
    const data = new FormData();
    const nameParts = (Platform.OS === 'ios' ? photo.uri : photo.path).split('.');
    const ext = nameParts[nameParts.length - 1];
    reactotron.log(photo.uri, photo.path);
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

  chooseLocation = (location) => {
    this.setState({location})
  }

  render() {
    const { photo , update, location, url, loadingImage, imgError} = this.state
    return (
      <View style={styles.container}>
      <Text size={28} bold black style={{marginBottom: 30, alignSelf: 'center'}}>信息填写</Text>
        {(update == '' || update == 'photo') && 
         <TouchableOpacity onPress={this.handleChoosePhoto} style={{alignSelf: 'center'}}>
          <View style={styles.photoWrapper}>
            <Image
              source={imgError ? DefaultAvatar : { uri: photo ? photo.uri : url }}
              style={styles.photo}
              onLoadStart={() => {if(!imgError) { this.setState({ loadingImage: true, imgError: false, }) }}}
              onLoadEnd={() => this.setState({ loadingImage: false, })}
              onError={() => this.setState({ loadingImage: false, imgError: true })}
            />
            {loadingImage && (
              <View style={styles.loadingIndicator}>
                <ActivityIndicator size="small" />
              </View>
            )}
          </View>
        </TouchableOpacity>
        }
        {(update == '' || update == 'userName') && 
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <Text>用户昵称</Text>
            <TextInput
                style={styles.singleinput}
                placeholder="昵称"
                value={this.state.userName}
                maxLength={10}
                onChangeText={userName => this.setState({ userName })}
            />
        </View>
        }
        { update == '' && 
        <Text style={{marginBottom: 10}}>所在城市 
          <Text color={colors.secondary} onPress={() => this.props.navigation.navigate('Location', {chooseLocation: this.chooseLocation})}> {location}></Text>
        </Text>
        }
        {(update == '' || update == 'overview') && 
        <View>
          <Text >用户昵称</Text>
            <TextInput
                style={styles.multipleinput}
                placeholder="填写服务介绍"
                multiline
                maxLength={140}
                numberOfLines={4}
                value={this.state.overview}
                onChangeText={overview => this.setState({ overview })}
            />
          </View>
        }
        <Button
          rounded
          bgColor={colors.secondary}
          style={styles.button}
          caption="下一步"
          onPress={() => this.handleClick()}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    padding: 50
  },
  singleinput: {
    flex: 1,
    borderBottomColor: colors.grey,
    padding: 5,
    borderBottomWidth: 1
  },
  multipleinput: {
    backgroundColor: colors.greybackground,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  photoWrapper: {
    position: 'relative',
    width: 100,
    height: 100,
    borderRadius: 50,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: colors.primary,
    overflow: 'hidden',
  },
  loadingIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 100,
    height: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignSelf: 'stretch',
    margin: 20
  },
});

const mapStateToProps = createStructuredSelector({
  profile: profileSelector
});

const mapDispatchToProps = {
  saveProfile,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(BasicProfile);
