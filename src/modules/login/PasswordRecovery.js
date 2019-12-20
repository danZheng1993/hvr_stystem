import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';

import { Button } from '../../components';
import { fonts, colors } from '../../styles';
import { Form, TextValidator } from 'react-native-validator-form';
import { Text } from '../../components/StyledText';
import { saveProfile } from '../../redux/modules/auth'
import SendVerificationcode from '../components/SendVerificationCode'

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
       success: () => this.props.navigation.navigate('Auth')
     })
    }

    onSuccess = () => {
      this.setState({verified: true})
    }

    render(){
      const { verified } = this.state
      return (
        <View style={styles.container}>
          { !verified ?
          <SendVerificationcode navigation={this.props.navigation} onSuccess={this.onSuccess}/> :
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
                  caption="确定"
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
    padding: 20
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
  },
  verificationCode: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});


const mapStateToProps = createStructuredSelector({
});

const mapDispatchToProps = {
  saveProfile
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(PasswordRecovery);
