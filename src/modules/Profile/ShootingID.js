import React from 'react'
import { View, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { TextInput } from 'react-native-paper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import DatePicker from 'react-native-datepicker'
import moment from 'moment';

import ImagePicker from 'react-native-image-picker'
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';

import { colors, commonStyles } from '../../styles'
import { Button, toast } from '../../components';
import { Text } from '../../components/StyledText';

import { saveProfile } from '../../redux/modules/auth'
import uploadFile from '../../redux/api/upload'
import { profileSelector } from '../../redux/selectors'

import FrontIDPlaceholder from '../../../assets/images/front.png';
import BackIDPlaceholder from '../../../assets/images/back.png';

import constants from '../../constants';
import reactotron from 'reactotron-react-native';

class ShootingID extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    frontPhoto: null,
    backPhoto: null,
    holderName: '',
    idNumber: '',
    validDate: '',
    validFrom: '',
  }
  handleClick = async () => {
    try {
      const { frontPhoto, backPhoto, holderName, idNumber, validDate, validFrom } = this.state
      const { saveProfile, navigation, route } = this.props
      const forSingle = route.params.forSingle || false;
      if (frontPhoto) {
        await uploadFile('profile/me', 'post',this.createFormData(frontPhoto, { type: "frontID"}));
      }
      if (backPhoto) {
        await uploadFile('profile/me', 'post',this.createFormData(backPhoto, { type: "backID"}))
      }
      saveProfile({ body: { holderName, idNumber, validDate, validFrom } });
      if (forSingle) {
        navigation.goBack();
      } else {
        navigation.navigate('CompanyInfo');
      }
    } catch (err) {
      console.log(err);
      toast('无效的输入');
    }
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
    ImagePicker.showImagePicker(constants.PHOTO_SELECTION_OPTIONS , response => {
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
    ImagePicker.showImagePicker(constants.PHOTO_SELECTION_OPTIONS, response => {
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
      <KeyboardAwareScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
        <Text size={28} bold black style={{marginBottom: 30}}>上传身份证</Text>
        <View style={styles.imageWrapper}>
          <View style={styles.idHolder}>
            <TouchableOpacity onPress={this.handleChooseFrontPhoto} style={styles.touch}>
              {frontPhoto ? 
                <Image
                  source={{ uri: frontPhoto.uri }}
                  style={{width: '100%', height: '100%'}}
                  onPress={this.handleChoosePhoto}
                /> :
                <Image
                  source={FrontIDPlaceholder}
                  style={styles.photo}
                />
              }    
            </TouchableOpacity>
            <Text size={14} black>
              身份证正面照片
            </Text>
          </View>
          <View style={styles.idHolder}>
            <TouchableOpacity onPress={this.handleChooseBackPhoto} style={styles.touch}>
              {backPhoto ? 
              <Image
                source={{ uri: backPhoto.uri }}
                style={{width: '100%', height: '100%'}}
                onPress={this.handleChoosePhoto}
              /> :
              <Image
                source={BackIDPlaceholder}
                style={styles.photo}
              />
              }    
            </TouchableOpacity>
            <Text size={14} black>
              身份证反面照片
            </Text>
          </View>
        </View>
        <View>
          <TextInput
            style={styles.input}
            placeholder="身份证持有人姓名"
            value={this.state.holderName}
            onChangeText={holderName => this.setState({ holderName })}
          />
          <TextInput
            style={styles.input}
            placeholder="身份证号码"
            value={this.state.idNumber}
            onChangeText={idNumber => this.setState({ idNumber })}
          />
          <Text size={16}>有效期限</Text>
          <DatePicker
            style={styles.input}
            date={this.state.validFrom}
            mode="date"
            placeholder="有效期限"
            format="YYYY-MM-DD"
            minDate="2019-12-01"
            maxDate="2049-12-31"
            confirmBtnText="确定"
            cancelBtnText="取消"
            onDateChange={(validFrom) => {this.setState({validFrom})}}
          />
          <DatePicker
            style={styles.input}
            date={this.state.validDate}
            mode="date"
            minDate={moment(this.state.validFrom || new Date).format('YYYY-MM-DD')}
            placeholder="长期请勿选"
            format="YYYY-MM-DD"
            minDate="2019-12-01"
            maxDate="2049-12-31"
            confirmBtnText="确定"
            cancelBtnText="取消"
            onDateChange={(validDate) => {this.setState({validDate})}}
          />
        </View>
        <Button
          rounded
          bgColor={colors.secondary}
          style={styles.button}
          caption="下一步"
          onPress={() => this.handleClick()}
        />
      </KeyboardAwareScrollView>    
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50
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
    height: 100,
    width: '100%',
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
  imageWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingBottom: 16,
  },
  idHolder: {
    flex: 1,
    paddingHorizontal: 4,
    alignItems: 'center',
  },
  input: {
    marginBottom: 15,
    alignSelf: 'stretch',
    width: 300,
    backgroundColor: 'white',
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
