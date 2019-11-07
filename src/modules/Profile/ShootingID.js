import React from 'react'
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-paper';

import ImagePicker from 'react-native-image-picker'
import { colors, commonStyles } from '../../styles'
import { Button } from '../../components';
import { Text } from '../../components/StyledText';
export default class ShootingID extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    frontPhoto: null,
    backPhoto: null
  }
  handleClick = () => {
    this.props.navigation.navigate({ routeName: 'CompanyInfo' })
  };
  handleChooseFrontPhoto = () => {
    const options = {
      noData: true,
    }
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({ frontPhoto: response })
      }
    })
  }
  handleChooseBackPhoto = () => {
    const options = {
      noData: true,
    }
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({ backPhoto: response })
      }
    })
  }

  render() {
    const { frontPhoto, backPhoto } = this.state
    return (
      <View style={styles.container}>
        <View style={styles.description}>
          <Text size={18} black>
              上传身份证
          </Text>
          <TouchableOpacity onPress={this.handleChooseFrontPhoto} style={styles.touch}>
            {frontPhoto ? 
            <Image
              source={{ uri: frontPhoto.uri }}
              style={{width: '100%', height: '100%'}}
              onPress={this.handleChoosePhoto}
            /> :
            <Image
              source={require('../../../assets/images/takePhoto.png')}
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
              source={require('../../../assets/images/takePhoto.png')}
              style={styles.photo}
            />
            }    
          </TouchableOpacity>
          <Text size={14} black>
            身份证反面照片
          </Text>
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
    justifyContent: 'space-around'
  },
  photo: {
    borderRadius: 100,
    borderColor: colors.gray,
    backgroundColor: colors.info,
    width: 100,
    height: 100,
  },
  touch: {
    borderColor: colors.gray,
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    alignSelf: "stretch",
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    height: 200
  },
  input: {
    marginBottom: 15,
  },
  description: {
    padding: 20,
    marginTop: 20,
    alignSelf: 'stretch',
    alignItems: 'center'
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
