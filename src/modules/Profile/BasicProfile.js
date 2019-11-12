import React from 'react'
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-paper';

import ImagePicker from 'react-native-image-picker'
import { colors } from '../../styles'
import { Button } from '../../components';

import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';

import { saveProfile } from '../../redux/modules/auth'

class BasicProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      photo: null,
      photoData: null,
      userName: '',
      overview: ''
    }
  }

  handleClick = () => {
    const {userName, photo, overview, photoData} = this.state
    console.log("photodata", photoData)
    this.props.saveProfile({
      body:{userName, overview, photoData},
    })
    this.props.navigation.navigate({ routeName: 'ShootingID' })
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
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
       
        const data = new FormData();
        data.append('name', 'avatar');
        data.append('fileData', {
          uri : response.uri,
          type: response.type,
          name: response.fileName
        });
        console.log(data)
        this.setState({
          photo: source,
          photoData: data
        });
      }
    });
    // const options = {
    //   noData: true,
    // }
    // ImagePicker.launchImageLibrary(options, response => {
    //   if (response.uri) {
    //     this.setState({ photo: response })
    //   }
    // })
  }

  render() {
    const { photo } = this.state
    return (
      <View style={styles.container}>
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
        </TouchableOpacity>
        <View style={styles.description}>
        <TextInput
            style={styles.input}
            outlined
            label='昵称'
            placeholder="昵称"
            value={this.state.userName}
            onChangeText={userName => this.setState({ userName })}
        />
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
        />
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
});

const mapDispatchToProps = {
  saveProfile,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(BasicProfile);
