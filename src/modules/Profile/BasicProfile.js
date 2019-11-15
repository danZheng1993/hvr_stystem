import React from 'react'
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-paper';
import PhotoUpload from 'react-native-photo-upload'

import ImagePicker from 'react-native-image-picker'
import { colors } from '../../styles'
import { Button, Profile } from '../../components';

import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';

import { saveProfile } from '../../redux/modules/auth'
import { profileSelector } from '../../redux/selectors'
import uploadFile from '../../redux/api/upload'
class BasicProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      photo: null,
      userName: '',
      overview: '',
      update: ''
    }
  }

  componentWillMount() {
    const {navigation} = this.props
    let update = navigation.getParam('update', 'none')
    if (update != 'none') {
      this.setState({update})
    }
  }

  handleClick = () => {
    const {userName, photo, overview,update} = this.state
    const {profile} = this.props
    console.log(profile)
    if (photo) {
      uploadFile('profile/me', 'post',this.createFormData(photo, { type: "photo"}))
      .then(res => console.log(res))
      .catch(err => alert(err))
    }
    if (userName || overview) {
      this.props.saveProfile({
        body: {userName, overview}
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
      customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      ],
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

  render() {
    const { photo , update} = this.state
    return (
      <View style={styles.container}>
        {(update == '' || update == 'photo') && 
         <TouchableOpacity onPress={this.handleChoosePhoto}>
          {photo ? 
          <Image
            source={{ uri: photo.uri }}
            style={styles.photo}
            onPress={this.handleChoosePhoto}
          /> :
          <Image
            source={require('../../../assets/images/takePhoto.png')}
            style={styles.photo}
            onPress={this.handleChoosePhoto}
          />
          }    
        </TouchableOpacity> }
        <View style={styles.description}>
        {(update == '' || update == 'userName') && <TextInput
            style={styles.input}
            outlined
            label='昵称'
            placeholder="昵称"
            value={this.state.userName}
            onChangeText={userName => this.setState({ userName })}
        />}
        {(update == '' || update == 'overview') && 
        <TextInput
            style={styles.input}
            outlined
            label='填写服务介绍'
            placeholder="填写服务介绍"
            multiline
            maxLength={140}
            numberOfLines={6}
            value={this.state.overview}
            onChangeText={overview => this.setState({ overview })}
        />}
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            large
            bgColor={colors.warning}
            style={styles.button}
            caption="下一步"
            onPress={() => this.handleClick()}
          />
        </View>
      </View>    
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  photo: {
    borderRadius: 100,
    borderColor: colors.gray,
    backgroundColor: colors.info,
    width: 100,
    height: 100
  },
  input: {
    marginBottom: 15,
  },
  description: {
    padding: 20,
    marginBottom: 20,
    alignSelf: 'stretch'
  },
  buttonsContainer: {
    alignSelf: 'stretch',
    margin: 20
  },
  button: {
    marginBottom: 20,
    alignSelf: 'stretch',
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
