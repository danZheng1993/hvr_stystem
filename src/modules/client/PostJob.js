import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Picker
} from 'react-native';

import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import locationData from 'china-location/dist/location.json';
import ChinaLocation from 'react-china-location';
import {TextInput} from 'react-native-paper'
import { Button } from '../../components';
import { fonts, colors } from '../../styles';
import { Form, TextValidator } from 'react-native-validator-form';

import { Text } from '../../components/StyledText';

import {login} from '../../redux/modules/auth'
import { authStateSelector } from '../../redux/selectors'

class PostJob extends React.Component {
  state = {
    phoneNumber: '22222222222',
    password: '2222222222',
    category : '',
    scene: ''
  }
  handleClick = () => {
    const { phoneNumber, password} = this.state
    const { profile } = this.props
    console.log(profile)

  };
  onLocationChange = () => {

  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.description}>
          <Form
                ref="form"
                onSubmit={this.handleClick}
            >
                <Text size={14}>category</Text>
                  <Picker
                  selectedValue={this.state.category}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({category: itemValue})
                  }>
                  <Picker.Item label="Java" value="java" />
                  <Picker.Item label="JavaScript" value="js" />
                </Picker>
              
                <TextValidator
                    name="phoneNumber"
                    label='手机号'
                    validators={['required', 'matchRegexp:^[0-9]{11}$']}
                    errorMessages={['This field is required', 'invalid phone number']}
                    placeholder="输入手机号"
                    type="text"
                    value={this.state.phoneNumber}
                    onChangeText={phoneNumber => this.setState({ phoneNumber })}
                />
                  {/* <ChinaLocation
                      list={locationData} 
                      onLocationChange={this.onLocationChange}
                  /> */}
                <Picker
                  selectedValue={this.state.scene}
                  style={{height: 50, width: 100}}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({scene: itemValue})
                  }>
                  <Picker.Item label="Java" value="java" />
                  <Picker.Item label="JavaScript" value="js" />
                </Picker>
                <Picker
                  selectedValue={this.state.scene}
                  style={{height: 50, width: 100}}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({scene: itemValue})
                  }>
                  <Picker.Item label="Java" value="java" />
                  <Picker.Item label="JavaScript" value="js" />
                </Picker>
              <TextValidator
                  style={styles.input}
                  outlined
                  validators={['required', 'minStringLength:6', 'maxStringLength:20']}                 
                  errorMessages={['This field is required', 'password must be at least 6 characters', 'password is length must be less than 20']}
                  label='设置密码'
                  placeholder="设置密码（6-20位字母数字组合)"
                  value={this.state.password}
                  secureTextEntry
                  maxLength={20}
                  onChangeText={password => this.setState({ password })}
              />
                <View style={styles.buttonsContainer}>
                  <Button
                    large
                    bgColor={colors.warning}
                    style={styles.button}
                    caption="确定"
                    onPress={this.handleClick}
                  />
                </View>
            </Form>   
           
        
        </View>
      </ScrollView>
    );
    }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'space-around',
  },
  picker: {
    flexDirection: "row",
    justifyContent: 'space-between'
  },
  buttonsContainer: {
    alignSelf: 'stretch',
    margin: 20
  },
  button: {
    marginBottom: 20,
    alignSelf: 'stretch',
  },
  description: {
    padding: 20,
    marginBottom: 20,
    alignSelf: 'stretch'
  },
  input: {
    marginBottom: 15,
  },
  anchor: {
    flex: 1,
    flexDirection: "row",
  },
  inputWrap: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});


const mapStateToProps = createStructuredSelector({
  profile: authStateSelector,

});

const mapDispatchToProps = {
  login,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(PostJob);
