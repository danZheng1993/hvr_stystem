import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';

import GalleryScreen from '../gallery/GalleryViewContainer';

// To use this screens please see the full version at https://reactnativestarter.com

// import ProfileScreen from '../containers/ProfileScreen';
// import ArticleScreen from '../containers/ArticleScreen';
// import ChatScreen from '../containers/chat/ChatScreen';
// import MessagesScreen from '../containers/chat/MessagesScreen';
// import ChartsScreen from '../containers/ChartsScreen';
import AuthScreen from '../auth/AuthViewContainer'

import LoginScreen from '../login/LoginViewContainer'
import LoginAsProvider from '../login/LoginAsProvider'
import LoginAsClient from '../login/LoginAsClient'
import LoginWithPassword from '../login/LoginWithPassword'
import LoginWithSMS from '../login/LoginWithSMS'
import PasswordRecovery from '../login/PasswordRecovery'

import SignupScreen from '../signup/SignupView'
import SignupAsProvider from '../signup/SignupAsProvider'
import SignupAsClient from '../signup/SignupAsClient'
import SendVerificationCode from '../components/SendVerificationCode'
import CheckVerificationCode from '../components/CheckVerificationCode'

import CreateProfile from '../Profile/CreateProfile'
import BasicProfile from '../Profile/BasicProfile'
import ShootingID from '../Profile/ShootingID'
import CompanyInfo from '../Profile/CompanyInfo'

import Client from '../client'
import PostJob from '../client/PostJob'

import AvailableInFullVersion from '../availableInFullVersion/AvailableInFullVersionViewContainer';

import { colors, fonts } from '../../styles';
import HomeScreen from '../home/HomeView';

const headerBackground = require('../../../assets/images/topBarBg.png');

const stackNavigator = createStackNavigator(
  {
    Main: {
      screen: HomeScreen,
      navigationOptions: {
        header: null,
      },
    },
    Auth: {
      screen: AuthScreen,
      navigationOptions: {
        header: null,
      },
    },
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        header: null,
      },
    },
    Signup: {
      screen: SignupScreen,
      navigationOptions: {
        header: null,
      },
    },
    CreateProfile: {
      screen: CreateProfile,
      navigationOptions: {
        header: null,
      },
    },
    BasicProfile: {
      screen: BasicProfile,
      navigationOptions: {
        title: '信息填写',
      },
    },
    ShootingID: {
      screen: ShootingID,
      navigationOptions: {
        title: '拍摄身份证',
      },
    },
    CompanyInfo: {
      screen: CompanyInfo,
      navigationOptions: {
        title: '公司信息',
      },
    },
    
    SignupAsProvider: {
      screen: SignupAsProvider,
      navigationOptions: {
        title: '注册',
      },
    },
    SignupAsClient: {
      screen: SignupAsClient,
      navigationOptions: {
        title: '注册',
      },
    },
    SendVerificationCode: {
      screen: SendVerificationCode,
      navigationOptions: {
        title: '',
      },
    },
    CheckVerificationCode: {
      screen: CheckVerificationCode,
      navigationOptions: {
        title: '',
      },
    },
    LoginAsProvider: {
      screen: LoginAsProvider,
      navigationOptions: {
        title: '',
      },
    },
    LoginAsClient: {
      screen: LoginAsClient,
      navigationOptions: {
        title: '',
      },
    },
    LoginWithPassword: {
      screen: LoginWithPassword,
      navigationOptions: {
        title: '',
      },
    },
    LoginWithSMS: {
      screen: LoginWithSMS,
      navigationOptions: {
        title: '',
      },
    },
    PasswordRecovery: {
      screen: PasswordRecovery,
      navigationOptions: {
        title: '找回密码',
      },
    },
    Profile: {
      screen: AvailableInFullVersion,
      navigationOptions: {
        header: null,
      },
    },
    Client: {
      screen: Client,
      navigationOptions: {
        header: null,
      },
    },
    PostJob: {
      screen: PostJob,
      navigationOptions: {
        header: null,
      },
    },
    Gallery: {
      screen: GalleryScreen,
      navigationOptions: {
        title: 'Gallery',
      },
    },
    Article: {
      screen: AvailableInFullVersion,
      navigationOptions: {
        header: null,
      },
    },
    Chat: {
      screen: AvailableInFullVersion,
      navigationOptions: {
        header: null,
      },
    },
    Messages: {
      screen: AvailableInFullVersion,
      navigationOptions: {
        header: null,
      },
    },
    Charts: {
      screen: AvailableInFullVersion,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    defaultNavigationOptions: () => ({
      titleStyle: {
        fontFamily: fonts.primaryLight,
      },
      headerStyle: {
        backgroundColor: colors.primary,
        borderBottomWidth: 0,
      },
      headerBackground: (
        <Image
          style={{ flex: 1 }}
          source={headerBackground}
          resizeMode="cover"
        />
      ),
      headerTitleStyle: {
        color: colors.white,
        fontFamily: fonts.primaryRegular,
      },
      headerTintColor: '#222222',
      headerLeft: props => (
        <TouchableOpacity
          onPress={props.onPress}
          style={{
            paddingLeft: 25,
          }}
        >
          <Image
            source={require('../../../assets/images/icons/arrow-back.png')}
            resizeMode="contain"
            style={{
              height: 20,
            }}
          />
        </TouchableOpacity>
      ),
    }),
  },
);

export default createAppContainer(stackNavigator);
