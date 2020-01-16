import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import {Text} from '../../components'
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { colors, fonts } from '../../styles';
import Icon from 'react-native-vector-icons/FontAwesome'
import AvailableInFullVersion from '../availableInFullVersion/AvailableInFullVersionViewContainer';
import MainTabNavigator from './MainTabNavigator';
import GalleryScreen from '../gallery/GalleryViewContainer';

import HomeScreen from '../home/HomeView';
import AuthScreen from '../auth/AuthView'

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
import MyVR from '../client/MyPage/MyVR';
import RequestInvoice from '../client/MyPage/RequestInvoice';
import InvoiceForm from '../client/MyPage/InvoiceForm';
import ClientJobDetail from '../client/MyPage/MyJob/JobDetail';
import GiveFeedback from '../client/MyPage/MyJob/GiveFeedback';
import ProviderDetail from '../client/Providers/ProviderDetail'

import Provider from '../provider';
import ApplyJob from '../provider/jobs/ApplyJob';
import BillingInvoice from '../provider/MyPage/BillingInvoice'
import MyCreatedVR from '../provider/MyPage/MyCreatedVR'
import ProviderJob from '../provider/MyPage/MyJob'
import ProviderJobDetail from '../provider/MyPage/MyJob/JobDetail';
import UploadMedia from '../provider/MyPage/MyJob/UploadMedia';

import Chatting from '../../components/Chatting';
import ViewInvoice from '../../components/ViewInvoice';
import WebViewer from '../../components/WebViewer';
import SearchBar from '../../components/SearchBar';
import Notification from '../../components/Notification';
import SystemNotification from '../../components/SystemNotification';
import Player from '../../components/Player';
import SearchResult from '../../components/SearchResult';
import Location from '../../components/Location';
import Developing from '../../components/Developing'
import Settings from '../settings';
import PersonalInformation from '../settings/PersonalInformation';
import Security from '../settings/Security';

const stackNavigator = createStackNavigator(
  {
    Main: {
      screen: HomeScreen,
      navigationOptions: {
        header: null,
      },
    },
    
    Settings: {
      screen: Settings,
      navigationOptions: {
        title: '设置',
      },
    },
    MyCreated: {
      screen: Developing,
      navigationOptions: {
        title: '我发布的',
      },
    },
    VRShop: {
      screen: Developing,
      navigationOptions: {
        title: '我的VR',
      },
    },
    MyContract: {
      screen: Developing,
      navigationOptions: {
        title: '我的合同',
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
      navigationOptions: ({ navigation }) => ({
        title: '',
        headerStyle: {
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0, // remove shadow on iOS
          backgroundColor: colors.white,
        },
        headerLeft: props => (
          <TouchableOpacity
            onPress={props.onPress}
            style={{
              paddingLeft: 25,
            }}
          >
            <Icon name="angle-left" size={30} color={colors.black}/>
          </TouchableOpacity>
        ),
        headerRight:  (
          (
            <Text size={12} style={{color: colors.primary, paddingRight: 25}} onPress={() => navigation.navigate('LoginWithPassword')}>
              登录
            </Text> 
          )
        ),
      }),
    },

    BasicProfile: {
      screen: BasicProfile,
      navigationOptions: {
        title: '',
        headerStyle: {
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0, // remove shadow on iOS
          backgroundColor: colors.white,
        },
        headerLeft: props => (
          <TouchableOpacity
            onPress={props.onPress}
            style={{
              paddingLeft: 25,
            }}
          >
            <Icon name="angle-left" size={30} color={colors.black}/>
          </TouchableOpacity>
        ),
      },
    },
    ShootingID: {
      screen: ShootingID,
      navigationOptions: {
        title: '',
        headerStyle: {
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0, // remove shadow on iOS
          backgroundColor: colors.white,
        },
        headerLeft: props => (
          <TouchableOpacity
            onPress={props.onPress}
            style={{
              paddingLeft: 25,
            }}
          >
            <Icon name="angle-left" size={30} color={colors.black}/>
          </TouchableOpacity>
        ),
      },
    },
    CompanyInfo: {
      screen: CompanyInfo,
      navigationOptions: ({ navigation }) => ({
        title: '',
        headerStyle: {
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0, // remove shadow on iOS
          backgroundColor: colors.white,
        },
        headerLeft: props => (
          <TouchableOpacity
            onPress={props.onPress}
            style={{
              paddingLeft: 25,
            }}
          >
            <Icon name="angle-left" size={30} color={colors.black}/>
          </TouchableOpacity>
        ),
        headerRight:  (
          (
            <Text size={12} style={{color: colors.primary, paddingRight: 25}} onPress={() => navigation.navigate('Provider')}>
              跳跃
            </Text> 
          )
        ),
      }),
    },
    
    SignupAsProvider: {
      screen: SignupAsProvider,
      navigationOptions: {
        title: '',
        headerStyle: {
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0, // remove shadow on iOS
          backgroundColor: colors.white,
        },
        headerLeft: props => (
          <TouchableOpacity
            onPress={props.onPress}
            style={{
              paddingLeft: 25,
            }}
          >
            <Icon name="angle-left" size={30} color={colors.black}/>
          </TouchableOpacity>
        ),
      },
    },
    SignupAsClient: {
      screen: SignupAsClient,
      navigationOptions: {
        title: '',
        headerStyle: {
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0, // remove shadow on iOS
          backgroundColor: colors.white,
        },
        headerLeft: props => (
          <TouchableOpacity
            onPress={props.onPress}
            style={{
              paddingLeft: 25,
            }}
          >
            <Icon name="angle-left" size={30} color={colors.black}/>
          </TouchableOpacity>
        ),
      },
    },

    LoginWithPassword: {
      screen: LoginWithPassword,
      navigationOptions: ({ navigation }) => ({
        title: '',
        headerStyle: {
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0, // remove shadow on iOS
          backgroundColor: colors.white,
        },
        headerLeft: props => (
          <TouchableOpacity
            onPress={props.onPress}
            style={{
              paddingLeft: 25,
            }}
          >
            <Icon name="angle-left" size={30} color={colors.black}/>
          </TouchableOpacity>
        ),
        headerRight:  (
          (
            <Text size={12} style={{color: colors.primary, paddingRight: 25}} onPress={() => navigation.navigate('Signup')}>
              注册
            </Text> 
          )
        ),
      }),
    },
    ClientJob: {
      screen: ClientJob,
      navigationOptions: {
        title: '订单',
      },
    },
    MyCollection: {
      screen: MyCollection,
      navigationOptions: {
        title: '我的收藏',
      },
    },

    RequestInvoice: {
      screen: RequestInvoice,
      navigationOptions: {
        title: '申请发票',
      },
    },

    InvoiceForm: {
      screen: InvoiceForm,
      navigationOptions: {
        title: '发票信息',
      },
    },

    MyAttention: {
      screen: MyAttention,
      navigationOptions: {
        title: '我的关注',
      },
    },
    
    MyVR: {
      screen: MyVR,
      navigationOptions: {
        title: '我的VR',
      },
    },
    LoginWithSMS: {
      screen: LoginWithSMS,
      navigationOptions: ({ navigation }) => ({
        title: '',
        headerStyle: {
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0, // remove shadow on iOS
          backgroundColor: colors.white,
        },
        headerLeft: props => (
          <TouchableOpacity
            onPress={props.onPress}
            style={{
              paddingLeft: 25,
            }}
          >
            <Icon name="angle-left" size={30} color={colors.black}/>
          </TouchableOpacity>
        ),
        headerRight:  (
          (
            <Text size={12} style={{color: colors.primary, paddingRight: 25}} onPress={() => navigation.navigate('Signup')}>
              注册
            </Text> 
          )
        ),
      }),
    },
    PasswordRecovery: {
      screen: PasswordRecovery,
      navigationOptions: {
        title: '找回密码',
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
        title: '需求发布',
      },
    },

    ClientJobDetail: {
      screen: ClientJobDetail,
      navigationOptions: {
        title: '订单详情',
      },
    },

    GiveFeedback: {
      screen: GiveFeedback,
      navigationOptions: {
        title: '意见反馈',
      },
    },

    BillingInvoice: {
      screen: BillingInvoice,
      navigationOptions: {
        title: '发票申请列表',
      },
    },

    MyCreatedVR: {
      screen: MyCreatedVR,
      navigationOptions: {
        title: '我发布的',
      },
    },

    ProviderJob: {
      screen: ProviderJob,
      navigationOptions: {
        title: '订单',
      },
    },

    ProviderJobDetail: {
      screen: ProviderJobDetail,
      navigationOptions: {
        title: '订单详情',
      },
    },

    UploadMedia: {
      screen: UploadMedia,
      navigationOptions: {
        title: '上传视频链接',
      },
    },

    Chatting: {
      screen: Chatting,
      navigationOptions: {
        title: '大众传媒',
      },
    },

    ViewInvoice: {
      screen: ViewInvoice,
      navigationOptions: {
        title: '',
      },
    },

    Notification: {
      screen: Notification,
      navigationOptions: {
        title: '消息',
      },
    },

    SystemNotification: {
      screen: SystemNotification,
      navigationOptions: {
        title: '通知消息',
      },
    },
    
    PersonalInformation: {
      screen: PersonalInformation,
      navigationOptions: {
        title: '',
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
        title: '搜索结果',
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
        title: '',
      },
    },
    Chat: {
      screen: AvailableInFullVersion,
      navigationOptions: {
        title: '',
      },
    },
    Messages: {
      screen: AvailableInFullVersion,
      navigationOptions: {
        title: '',
      },
    },
    Charts: {
      screen: AvailableInFullVersion,
      navigationOptions: {
        title: '',
      },
    },
  },
  {
    headerLayoutPreset: 'center',
    defaultNavigationOptions: () => ({
      titleStyle: {
        fontFamily: fonts.primaryLight,
      },
      headerStyle: {
        backgroundColor: colors.secondary,
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
        borderBottomWidth: 0,
      },
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
