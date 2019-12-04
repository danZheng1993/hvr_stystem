import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import {loadItem} from '../../redux/api/storage'
import { profileSelector } from '../../redux/selectors'
import SendVerificationcode from '../components/SendVerificationCode'
import SyncStorage from 'sync-storage'
import XMPP from 'react-native-xmpp'

class LoginWithSMS extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
      };
    }

    onSuccess = () => {
      loadItem('hvr_auth').then((val) => {
        const {profile} = this.props
        if (!profile) return
        const token = SyncStorage.get('token') || ''
        toast("login success!")
        XMPP.connect(`${profile._id}@192.168.31.207/spark`, token.slice(0,8),'RNXMPP.PLAIN','192.168.31.207',5222)
        if (profile.role == 'provider') {
          this.props.navigation.navigate({ routeName: 'Provider' })
        } else if (profile.role =='client'){
          this.props.navigation.navigate({ routeName: 'Client' })
        }
      })
    }

    render(){
      return (
        <View style={styles.container}>
          <SendVerificationcode navigation={this.props.navigation} onSuccess={this.onSuccess}/>
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
  profile: profileSelector
});

const mapDispatchToProps = {
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(LoginWithSMS);
