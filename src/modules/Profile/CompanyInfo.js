import React from 'react'
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-paper';

import ImagePicker from 'react-native-image-picker'
import { colors } from '../../styles'
import { Button } from '../../components';
import { Text } from '../../components/StyledText';

import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import {NavigationActions} from 'react-navigation'
import { saveProfile } from '../../redux/modules/auth'
import uploadFile from '../../redux/api/upload'
import { profileSelector } from '../../redux/selectors'

class CompanyInfo extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    photo: null,
    name: '',
  }
  handleClick = () => {
    const {photo, name,} = this.state
    const {profile} = this.props
    if (photo) {
      uploadFile('profile/me', 'post',this.createFormData(photo, { type: "companyLicense"}))
      .then(res => console.log(res))
      .catch(err => alert(err))
    }
    this.props.saveProfile({
      body: {companyName: name}
    })
    this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Provider' })], 0)
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
  
  handleChoosePhoto = () => {
    const options = {
      noData: true,
    }
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({ photo: response })
      }
    })
  }

  render() {
    const { photo } = this.state
    return (
      <View style={styles.container}>
          <View style={{marginBottom: 30}}>
            <Text size={28} bold black>
              上传营业执照
            </Text>
            <Text size={14}>
              上传营业执照通过审核后
            </Text>
            <Text>
              可以接1万以上的需求项目
            </Text>
          </View>
          <TouchableOpacity onPress={this.handleChoosePhoto} style={styles.touch}>
            {photo ? 
            <Image
              source={{ uri: photo.uri }}
              style={{width: '100%', height: '100%'}}
              onPress={this.handleChoosePhoto}
            /> :
            <Image
              source={require('../../../assets/images/companyLicense.png')}
              style={styles.photo}
              onPress={this.handleChoosePhoto}
            />
            }    
          </TouchableOpacity>
          <Text size={14} color={colors.redAlert}>
            温馨提示: 法人/经营者姓名必须同本帐户姓名一致
          </Text>
          <Text size={18} black>
            公司名称
          </Text>
          <TextInput
            style={styles.input}
            placeholder="请输入公司名称"
            value={this.state.name}
            onChangeText={name => this.setState({ name })}
        />
        <Text size={14} color={colors.redAlert}>
          温馨提示: 公司名称必须与营业执照一致
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
    height: 70,
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
    alignSelf: 'stretch',
    width: 300
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

export default compose(withConnect)(CompanyInfo);
