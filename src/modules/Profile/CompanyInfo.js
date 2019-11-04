import React from 'react'
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-paper';

import ImagePicker from 'react-native-image-picker'
import { colors } from '../../styles'
import { Button } from '../../components';
import { Text } from '../../components/StyledText';

export default class CompanyInfo extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    photo: null,
    name: '',
    overview: ''
  }
  handleClick = () => {
    this.props.navigation.navigate({ routeName: 'CreateProfile' })
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
        <View style={styles.description}>
          <Text size={18} black>
            营业执照
          </Text>
          <Text size={14} black>
          上传营业执照通过审核后，可以接1万以上的需求项目
          </Text>
          <TouchableOpacity onPress={this.handleChoosePhoto} style={styles.touch}>
            {photo ? 
            <Image
              source={{ uri: photo.uri }}
              style={{width: '100%', height: '100%'}}
              onPress={this.handleChoosePhoto}
            /> :
            <Image
              source={require('../../../assets/images/takePhoto.png')}
              style={styles.photo}
              onPress={this.handleChoosePhoto}
            />
            }    
          </TouchableOpacity>
          <Text size={14} black>
          法人/经营者姓名必须同本帐户姓名一致
          </Text>
          <Text size={18} black>
          公司名称
          </Text>
          <TextInput
            style={styles.input}
            outlined
            label='公司名称'
            placeholder="公司名称"
            value={this.state.name}
            onChangeText={name => this.setState({ name })}
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
    justifyContent: 'space-between'
  },
  headline: {
    alignSelf: 'flex-start',
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
