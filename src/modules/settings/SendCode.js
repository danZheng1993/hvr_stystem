import React from 'react'

import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';

import { View, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper';

import { colors } from '../../styles'
import { Button } from '../../components';
import { Text } from '../../components/StyledText';
import {sendcode} from '../../redux/modules/auth'
import CheckVerificationCode from '../components/CheckVerificationCode';
import { Form, TextValidator } from 'react-native-validator-form';

var timer
class SendVerificationCode extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    isCheck: false,
    counter: 10,
  }
  
  handleClick = () => {
    const { phoneNumber } = this.props
    const { onSuccess } = this.props
    // if(phoneNumber.length != 11 || !Number.isInteger(+phoneNumber)) return;
    this.props.sendcode({
      body: { phoneNumber: "" + phoneNumber},
      success: () => {    
        timer = setInterval(this.countTime, 1000)
        this.setState({isCheck: true})
      }
    })
  };
  
  countTime = () => {
    var {counter} = this.state
    counter --;
    if (counter == 0) {       
      counter = 60
      clearInterval(timer)
      this.setState({isCheck: false})
    }
    this.setState({counter})
  }

  componentWillUnmount() {
    clearInterval(timer)
  }

  render() {
    const {isCheck, counter} = this.state
    const {phoneNumber} = this.props
    return (
      <View style={{alignItems: 'center'}}>
        {!isCheck ? <View>
          <View style={styles.description}>
            <Text color={colors.black}>
              为了保证你的账号安全，请验证身份。验证成功
              后进行下一步操作。
            </Text>
          </View>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text color={colors.black}>*********{phoneNumber % 100}</Text>
            <Button
              large
              bgColor={colors.secondary}
              style={styles.button}
              caption="确定"
              onPress={() => this.handleClick()}
            />
          </View> 
        </View> :
        <View>
          <CheckVerificationCode phoneNumber = {phoneNumber} onSuccess = {this.props.onSuccess}/>
          <View style={styles.description}>
            <Text>{counter}后可重新发送</Text>
          </View>
        </View>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 15,
  },
  description: {
    padding: 20,
    marginBottom: 20,
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

const mapStateToProps = createStructuredSelector({
});

const mapDispatchToProps = {
  sendcode,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(SendVerificationCode);
