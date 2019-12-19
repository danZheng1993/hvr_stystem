import React from 'react'
import { View, Image, StyleSheet, TouchableOpacity, ScrollView, TextInput} from 'react-native'
// import {TextInput} from 'react-native-paper';

import PhotoUpload from 'react-native-photo-upload'

import ImagePicker from 'react-native-image-picker'
import { colors } from '../../styles'
import { Button, Profile, Text } from '../../components';

import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';

import { saveProfile } from '../../redux/modules/auth'
import { profileSelector } from '../../redux/selectors'
import uploadFile from '../../redux/api/upload'
import constants from '../../constants'
class BasicProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      photo: null,
      userName: '',
      overview: '',
      update: '',
      location: '北京',
      url: '../../../assets/images/takephoto.png'
    }
  }

  componentWillMount() {
    const {navigation, profile} = this.props
    let update = navigation.getParam('update', 'none')
    if (update != 'none') {
      this.setState({update})
    }
    if (profile) {
      this.setState({
        userName: profile.userName,
        location: profile.location,
        overview: profile.overview,
        url: constants.BASE_URL + profile.photo
      })
    }
  }

  handleClick = () => {
    const {userName, photo, overview,update,location} = this.state
    const {profile} = this.props
    console.log(profile)
    if (photo) {
      uploadFile('profile/me', 'post',this.createFormData(photo, { type: "photo"}))
      .then(res => console.log(res))
      .catch(err => alert(err))
    }
    if (userName || overview) {
      this.props.saveProfile({
        body: {userName, overview, location}
      })
    }
    if (update == '')
      this.props.navigation.navigate({ routeName: 'ShootingID' })
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
      console.log('Response = ', response);
 
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let source = response;
        this.setState({
          photo: source,
        });
      }
    });
  }

  createFormData = (photo, body) => {
    const data = new FormData();
    data.append("photo", {
      name: photo.fileName,
      type: photo.type,
      uri: photo.uri
        // Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
    });
  
    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });
    console.log("uplaod", data)
    return data;
  };

  chooseLocation = (location) => {
    this.setState({location})
  }

  render() {
    const { photo , update, location, url} = this.state
    return (
      <View style={styles.container}>
      <Text size={28} bold black style={{marginBottom: 30, alignSelf: 'center'}}>信息填写</Text>
        {(update == '' || update == 'photo') && 
         <TouchableOpacity onPress={this.handleChoosePhoto} style={{alignSelf: 'center'}}>
          <Image
            source={{ uri: photo ? photo.uri : url }}
            style={styles.photo}
          />  
        </TouchableOpacity> }
        {(update == '' || update == 'userName') && 
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <Text>用户昵称</Text>
            <TextInput
                style={styles.singleinput}
                placeholder="昵称"
                value={this.state.userName}
                onChangeText={userName => this.setState({ userName })}
            />
        </View>
        }
        { update == '' && 
        <Text style={{marginBottom: 10}}>所在城市 
          <Text color={colors.secondary} onPress={() => this.props.navigation.navigate('Location', {chooseLocation: this.chooseLocation})}> {location}></Text>
        </Text> }
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
    borderRadius: 50
  },
  input: {
    marginBottom: 15,
  },
  description: {
    marginBottom: 20,
  },
  buttonsContainer: {
    alignSelf: 'stretch',
    margin: 20
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
