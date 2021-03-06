import React from 'react';
import {
  StyleSheet,
  View,
  Alert,
} from 'react-native';

import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';

import { Button } from '../../components';
import { colors } from '../../styles';
import { Form, TextValidator } from 'react-native-validator-form';
import { saveProfile } from '../../redux/modules/auth'
import {profileSelector} from '../../redux/selectors'
import SendCode from './SendCode'

class PasswordRecovery extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        password: '',
        passwordConfirm: '',
        verified: false
      };
    }

    componentWillMount() {
      // custom rule will have name 'isPasswordMatch'
      Form.addValidationRule('isPasswordMatch', (value) => {
          if (value !== this.state.password) {
              return false;
          }
          return true;
      });
    }

    componentWillUnmount() {
      Form.removeValidationRule('isPasswordMatch');
    }

    handleSubmit = () => {
     const {saveProfile} = this.props
     const {password} = this.state
     saveProfile({
      body: {password},
      success: () => {
        Alert.alert(
          '成功',
          '密码更新成功',
          [
            {
              text: '好',
              onPress: () => {
                this.props.navigation.navigate('Auth');
              },
            },
          ],
          { cancelable: false },
        );
      },
      fail: () => {
        Alert.alert('发生了错误', '密码更新失败');
      }
     })
    }

    onSuccess = () => {
      this.setState({verified: true})
    }

    render(){
      const { verified } = this.state
      const {profile} = this.props
      const phoneNumber =profile ? profile.phoneNumber : 0
      return (
        <View style={styles.container}>
          { !verified ?
            
          <SendCode navigation={this.props.navigation} onSuccess={this.onSuccess} phoneNumber={phoneNumber} /> :
          <Form
              ref="form"
              onSubmit={this.handleSubmit}
          >
            <TextValidator
                style={styles.input}
                outlined
                validators={['required', 'minStringLength:6', 'maxStringLength:20']}                 
                errorMessages={['必填此项', '密码需要输入6字以上', '密码输入限制20字以下']}
                label='设置密码'
                placeholder="设置密码（6-20位字母数字组合)"
                value={this.state.password}
                secureTextEntry
                maxLength={20}
                onChangeText={password => this.setState({ password })}
            />
            <TextValidator
                style={styles.input}
                outlined
                validators={['required', 'isPasswordMatch']}                 
                errorMessages={['必填此项', '密码出错']}
                label='确认密码'
                placeholder="确认密码"
                secureTextEntry
                value={this.state.passwordConfirm}
                onChangeText={passwordConfirm => this.setState({ passwordConfirm })}
                />
              <View style={styles.buttonsContainer}>
                <Button
                  large
                  bgColor={colors.secondary}
                  style={styles.button}
                  caption="发送验证码"
                  onPress={() => this.refs.form.submit()}
                />
              </View>
          </Form> }
        </View> 
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.white
  },
  buttonsContainer: {
    flex: 2,
    alignItems: 'center',
    alignSelf: 'stretch',
    margin: 20
  },
  button: {
    marginBottom: 20,
    alignSelf: 'flex-end',
  },
  input: {
    marginBottom: 15,
    width: 300
  },
  verificationCode: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});


const mapStateToProps = createStructuredSelector({
  profile: profileSelector
});

const mapDispatchToProps = {
  saveProfile
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(PasswordRecovery);
