import React from 'react';
import {
  View,
  ImageBackground,
} from 'react-native';

import { Button } from '../../components';

import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { getSubcategorys } from '../../redux/modules/subcategory';

import { getTypes } from '../../redux/modules/type'
import { getScenes } from '../../redux/modules/scene'
import { getServices } from '../../redux/modules/service'
import { profileSelector } from '../../redux/selectors'
import { commonStyles } from '../../styles'
import { saveItem, loadItem} from '../../redux/api/storage'

import XMPP from 'react-native-xmpp'
class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    timer = null;
    XMPP.on('message', (message) => this.handleMessage(message));
    XMPP.on('iq', (message) => console.log('IQ:' + message));
    XMPP.on('presence', (message) => console.log('PRESENCE:' + message));
    XMPP.on('error', (message) => console.log('ERROR:' + message));
    XMPP.on('loginError', (message) => console.log('LOGIN ERROR:' + message));
    XMPP.on('login', (message) => console.log('LOGGED!'));
    XMPP.on('connect', (message) => console.log('CONNECTED!'));
    XMPP.on('disconnect', (message) => console.log('DISCONNECTED!'));
  }

  componentWillMount() {
    const {getTypes, getScenes, getServices, getSubcategorys} = this.props
    getScenes()
    getTypes()
    getServices()
    getSubcategorys()
  }

  handleMessage(message) {
    console.log("message>>>", message)
    if (String(message.from).indexOf("bbb") != -1 && message.body) {
      loadItem('notification')
      .then((res) =>  {
        let notification = res || ''
        notification += notification ? (',' + message.body) : message.body
        console.log(notification)
        saveItem('notification', notification).then(() => console.log("success"))
      })

    } else {

    }
  }

  componentDidMount() {
    this.timer = setTimeout(() => {    
      this.redirect()
    }, 5000);
  }
  redirect = () => {  
    const {profile} = this.props
    console.log("profile", profile)
    var route = 'Auth'
    if (profile) {
      XMPP.connect(`${profile._id}@192.168.31.207/spark`, profile.password.slice(0,8),'RNXMPP.PLAIN','192.168.31.207',5222)
    }
    if (profile && profile.role == 'provider') route = 'Provider'
    else if (profile && profile.role == 'client') route = 'Client'
    this.props.navigation.navigate({ routeName: route })

  }

  handleClick = () => {
    clearTimeout(this.timer);
    this.redirect()
  };

  render() {
    return (
      <View style={commonStyles.container}>
        <ImageBackground
          source={require('../../../assets/images/background.png')}
          style={commonStyles.bgImage}
          resizeMode="cover"
        >
          
        <View style={commonStyles.buttonsContainer}>
          <Button
            large
            secondary
            rounded
            style={commonStyles.button}
            caption="Skip"
            onPress={() => this.handleClick()}
          />
        </View>
        </ImageBackground>
      </View>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  profile: profileSelector
});

const mapDispatchToProps = {
  getTypes,
  getScenes,
  getServices,
  getSubcategorys
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(HomeScreen);
