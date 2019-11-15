import React from 'react'

import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';

import { View, StyleSheet } from 'react-native'
import  CodePin  from 'react-native-pin-code'

import { colors } from '../../styles'
import { Text } from '../../components/StyledText';
import {checkcode} from '../../redux/modules/auth'

class CheckVerificationCode extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      phoneNumber: ''
    }
  }
  
  componentWillMount() {
    const {getUser, navigation} = this.props
    let phoneNumber = navigation.getParam('phoneNumber', 'NO-ID')
    if (phoneNumber != 'NO-ID') {
      this.setState({phoneNumber})
    }
  }

  handleCheck = async (code) => {
    const { phoneNumber } = this.state
    const {checkcode} = this.props
    let res = false
    await checkcode({
      body:{ phoneNumber, code: code},
      // success: () => this.props.navigation.navigate({ routeName: 'BasicProfile' })
    })
  }
  check (code) {
    var val
    this.handleCheck(code).then(res => alert(res))
    // alert(val)
    // return val
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.description}>
          <Text size={28} black>
            输入短信验证码
          </Text>
          <Text size={14} black>
            验证码已发送至  13581644633
          </Text>
          <CodePin
            number={4} // You must pass number prop, it will be used to display 4 (here) inputs
            checkPinCode={(code, callback) => callback(this.check(code))}
            success={() => alert("success")} // If user fill '2018', success is called
            text="" // My title
            error="请输入正确的验证码，再试一次" // If user fail (fill '2017' for instance)
            autoFocusFirst={false} // disabling auto-focus
          />
          <Text size={14} black>
            59s后可重新发送
          </Text>
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

const mapStateToProps = createStructuredSelector({
});

const mapDispatchToProps = {
  checkcode,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(CheckVerificationCode);
