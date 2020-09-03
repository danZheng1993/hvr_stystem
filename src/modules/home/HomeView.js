import React from 'react';
import {
  View,
  ImageBackground,
  Platform,
} from 'react-native';

import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import SyncStorage from 'sync-storage';
import FS from 'react-native-fs';

import { Button, Loader } from '../../components';
import { getMyJob } from '../../redux/modules/job'
import { addToContacts, pushNotification, pushUnreadMessages } from '../../redux/modules/auth'
import { profileSelector } from '../../redux/selectors'
import { commonStyles } from '../../styles'
import { isIphoneX } from '../../helpers';
import constants from '../../constants';
import { getApi } from '../../redux/api/apiCall';
import DefaultBGImage from '../../../assets/images/background.png';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    timer = null;
    this.state = {
      splashImage: null,
      loading: false,
    }
  }

  async componentWillMount() {
    this.setState({ loading: true });
    const data = await SyncStorage.init();
    this.fetchSplash();
    try {
      const splashImage = await SyncStorage.get('splashImage');
      const splashImageSource = await FS.readFile(splashImage, 'base64');
      this.setState({ splashImage: splashImageSource, loading: false });
    } catch (err) {
      this.setState({ splashImage: null, loading: false });
      console.log('splash source fetch failed', err);
    }
  }

  async fetchSplash () {
    try {
      const result = await getApi('/splash/');
      const splashImage = result.data.splash;
      await FS.mkdir(`${FS.DocumentDirectoryPath}/splashImage/`);
      const target = `${FS.DocumentDirectoryPath}/splashImage/${splashImage}`
      FS.downloadFile({
        fromUrl: `${constants.SPLASH_BASE_URL}${splashImage}`,
        toFile: target,
      });
      SyncStorage.set('splashImage', target);
    } catch(err) {
      console.log('Fetch Splash Image failed', err);
    }
  }

  handleMessage(message) {
    console.log("message>>>", message)
    if (!message.body) return
    const {profile, pushNotification, pushUnreadMessages, getMyJob} = this.props
    const from = String(message.from).split('@')[0]
    pushUnreadMessages(from)
    if (from == 'system' && message.body) {
      console.warn(message.body)
      pushNotification(message)
      getMyJob()
    } else if (profile.contacts.indexOf(from) == -1) {
        this.props.addToContacts({
          body: {contact: from}
        })
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
    const token = SyncStorage.get('token') || '';
    let route = 'Auth'
    if (profile && profile.role == 'provider') route = 'Provider'
    else if (profile && profile.role == 'client') route = 'Client'
    this.props.navigation.navigate(route);
  }

  handleClick = () => {
    clearTimeout(this.timer);
    this.redirect()
  };

  render() {
    const { splashImage, loading } = this.state;
    return (
      <View style={{flex: 1}}>
        {loading ? (
          <Loader loading={true} />
        ) : (
          <ImageBackground
            source={splashImage ? { uri: `data:image/gif;base64,${splashImage}` } : DefaultBGImage}
            style={{flex: 1, paddingTop: Platform.OS === 'ios' ? isIphoneX() ? 24 : 16 : 0 }}
            resizeMode="cover"
          >
            
            <View style={{flex: 2,alignItems: 'flex-end',alignSelf: 'stretch',margin: 20}}>
              <Button
                small
                secondary
                rounded
                style={commonStyles.button}
                caption="跳跃"
                onPress={() => this.handleClick()}
              />
            </View>
          </ImageBackground>
        )}
      </View>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  profile: profileSelector
});

const mapDispatchToProps = {
  addToContacts,
  pushNotification,
  pushUnreadMessages,
  getMyJob
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(HomeScreen);
