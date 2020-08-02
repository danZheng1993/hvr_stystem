import React from 'react'
import { View, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { TextInput } from 'react-native-paper';

import ImagePicker from 'react-native-image-picker'
import { colors, commonStyles } from '../../styles'
import { Button } from '../../components';
import { Text } from '../../components/StyledText';

import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';

import { saveProfile } from '../../redux/modules/auth'
import uploadFile from '../../redux/api/upload'
import { profileSelector } from '../../redux/selectors'

class ShootingID extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    frontPhoto: null,
    backPhoto: null
  }
  handleClick = () => {
    const {frontPhoto, backPhoto,} = this.state
    const {profile} = this.props
    if (frontPhoto) {
      uploadFile('profile/me', 'post',this.createFormData(frontPhoto, { type: "frontID"}))
      .then(res => console.log(res))
      .catch(err => Alert.alert(err))
    }
    if (backPhoto) {
      uploadFile('profile/me', 'post',this.createFormData(backPhoto, { type: "backID"}))
      .then(res => console.log(res))
      .catch(err => Alert.alert(err))
    }
    this.props.navigation.navigate('CompanyInfo')
  };
  
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

  handleChooseFrontPhoto = () => {
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
        Alert.alert(response.customButton);
      } else {
        let source = response;
        this.setState({
          frontPhoto: source,
        });
      }
    });
  }
  handleChooseBackPhoto = () => {
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
        Alert.alert(response.customButton);
      } else {
        let source = response;
        this.setState({
          backPhoto: source,
        });
      }
    });
  }

  render() {
    const { frontPhoto, backPhoto } = this.state
    return (
      <View style={styles.container}>
        <Text size={28} bold black style={{marginBottom: 30}}>上传身份证</Text>
          <TouchableOpacity onPress={this.handleChooseFrontPhoto} style={styles.touch}>
            {frontPhoto ? 
            <Image
              source={{ uri: frontPhoto.uri }}
              style={{width: '100%', height: '100%'}}
              onPress={this.handleChoosePhoto}
            /> :
            <Image
              source={require('../../../assets/images/front.png')}
              style={styles.photo}
            />
            }    
          </TouchableOpacity>
          <Text size={14} black>
            身份证正面照片
          </Text>
          <TouchableOpacity onPress={this.handleChooseBackPhoto} style={styles.touch}>
            {backPhoto ? 
            <Image
              source={{ uri: backPhoto.uri }}
              style={{width: '100%', height: '100%'}}
              onPress={this.handleChoosePhoto}
            /> :
            <Image
              source={require('../../../assets/images/back.png')}
              style={styles.photo}
            />
            }    
          </TouchableOpacity>
          <Text size={14} black>
            身份证反面照片
          </Text>
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50
  },
  photo: {
    width: 60,
    height: 40,
  },
  touch: {
    backgroundColor: colors.greybackground,
    borderRadius: 10,
    alignSelf: "stretch",
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    height: 150
  },
  input: {
    marginBottom: 15,
  },
  buttonsContainer: {
    alignSelf: 'stretch',
    margin: 20
  },
  button: {
    margin: 20,
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

export default compose(withConnect)(ShootingID);
