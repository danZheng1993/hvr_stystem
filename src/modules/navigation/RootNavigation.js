import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { colors, fonts } from '../../styles';

import AvailableInFullVersion from '../availableInFullVersion/AvailableInFullVersionViewContainer';
import MainTabNavigator from './MainTabNavigator';
import GalleryScreen from '../gallery/GalleryViewContainer';

import HomeScreen from '../home/HomeView';
import AuthScreen from '../auth/AuthViewContainer'

import LoginWithPassword from '../login/LoginWithPassword'
import LoginWithSMS from '../login/LoginWithSMS'
import PasswordRecovery from '../login/PasswordRecovery'

import SignupScreen from '../signup/SignupView'
import SignupAsProvider from '../signup/SignupAsProvider'
import SignupAsClient from '../signup/SignupAsClient'

import BasicProfile from '../Profile/BasicProfile'
import ShootingID from '../Profile/ShootingID'
import CompanyInfo from '../Profile/CompanyInfo'

import Client from '../client'
import PostJob from '../client/PostJob'
import ClientJob from '../client/MyPage/MyJob';
import MyCollection from '../client/MyPage/MyCollection';
import MyAttention from '../client/MyPage/MyAttention';
import RequestInvoice from '../client/MyPage/RequestInvoice';
import InvoiceForm from '../client/MyPage/InvoiceForm';
import ClientJobDetail from '../client/MyPage/MyJob/JobDetail';
import GiveFeedback from '../client/MyPage/MyJob/GiveFeedback';
import ProviderDetail from '../client/Providers/ProviderDetail'

import Provider from '../provider';
import ApplyJob from '../provider/jobs/ApplyJob';
import BillingInvoice from '../provider/MyPage/BillingInvoice'
import ProviderJob from '../provider/MyPage/MyJob'
import ProviderJobDetail from '../provider/MyPage/MyJob/JobDetail';
import UploadMedia from '../provider/MyPage/MyJob/UploadMedia';

import Chatting from '../../components/Chatting';
import WebViewer from '../../components/WebViewer';
import SearchBar from '../../components/SearchBar';
import Notification from '../../components/Notification';
import SystemNotification from '../../components/SystemNotification';
import Player from '../../components/Player';
import SearchResult from '../../components/SearchResult';
import Location from '../../components/Location';

import Settings from '../settings';
import PersonalInformation from '../settings/PersonalInformation';
import Security from '../settings/Security';

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
    Signup: {
      screen: SignupScreen,
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

    LoginWithPassword: {
      screen: LoginWithPassword,
      navigationOptions: {
        title: '',
      },
    },
    ClientJob: {
      screen: ClientJob,
      navigationOptions: {
        title: '',
      },
    },
    MyCollection: {
      screen: MyCollection,
      navigationOptions: {
        header: null,
      },
    },

    RequestInvoice: {
      screen: RequestInvoice,
      navigationOptions: {
        header: null,
      },
    },

    InvoiceForm: {
      screen: InvoiceForm,
      navigationOptions: {
        header: null,
      },
    },

    MyAttention: {
      screen: MyAttention,
      navigationOptions: {
        header: null,
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
    Provider: {
      screen: Provider,
      navigationOptions: {
        header: null,
      },
    },
    ProviderDetail: {
      screen: ProviderDetail,
      navigationOptions: {
        header: null,
      },
    },
    ApplyJob: {
      screen: ApplyJob,
      navigationOptions: {
        title: '接单列表',
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

    ClientJobDetail: {
      screen: ClientJobDetail,
      navigationOptions: {
        header: null,
      },
    },

    GiveFeedback: {
      screen: GiveFeedback,
      navigationOptions: {
        header: null,
      },
    },

    BillingInvoice: {
      screen: BillingInvoice,
      navigationOptions: {
        header: null,
      },
    },

    ProviderJob: {
      screen: ProviderJob,
      navigationOptions: {
        title: '接单列表',
      },
    },

    ProviderJobDetail: {
      screen: ProviderJobDetail,
      navigationOptions: {
        header: null,
      },
    },

    UploadMedia: {
      screen: UploadMedia,
      navigationOptions: {
        header: null,
      },
    },

    Settings: {
      screen: Settings,
      navigationOptions: {
        header: null,
      },
    },

    Settings: {
      screen: Settings,
      navigationOptions: {
        header: null,
      },
    },

    Chatting: {
      screen: Chatting,
      navigationOptions: {
        header: null,
      },
    },

    Notification: {
      screen: Notification,
      navigationOptions: {
        header: null,
      },
    },

    SystemNotification: {
      screen: SystemNotification,
      navigationOptions: {
        header: null,
      },
    },
    
    PersonalInformation: {
      screen: PersonalInformation,
      navigationOptions: {
        header: null,
      },
    },
    
    Security: {
      screen: Security,
      navigationOptions: {
        title: '安全验证',
      },
    },

    WebViewer: {
      screen: WebViewer,
      navigationOptions: {
        header: null,
      },
    },

    SearchBar: {
      screen: SearchBar,
      navigationOptions: {
        header: null,
      },
    },

    Player: {
      screen: Player,
      navigationOptions: {
        header: null,
      },
    },

    SearchResult: {
      screen: SearchResult,
      navigationOptions: {
        header: null,
      },
    },

    Location: {
      screen: Location,
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
        backgroundColor: colors.secondary,
        borderBottomWidth: 0,
      },
      // headerBackground: (
      //   <Image
      //     style={{ flex: 1 }}
      //     source={headerBackground}
      //     resizeMode="cover"
      //   />
      // ),
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
