import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import {Text} from '../../components'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { colors, fonts } from '../../styles';
import Icon from 'react-native-vector-icons/FontAwesome'
import AvailableInFullVersion from '../availableInFullVersion/AvailableInFullVersionViewContainer';
import GalleryScreen from '../gallery/GalleryViewContainer';

import HomeScreen from '../home/HomeView';
import AuthScreen from '../auth/AuthView';
import TermsScreen from '../auth/Terms';

import LoginWithPassword from '../login/LoginWithPassword'
import LoginWithSMS from '../login/LoginWithSMS'

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
import ClientJobDetail from '../client/MyPage/MyJob/JobDetail';
import GiveFeedback from '../client/MyPage/MyJob/GiveFeedback';
import ProviderDetail from '../client/Providers/ProviderDetail'

import Provider from '../provider';
import ApplyJob from '../provider/jobs/ApplyJob';
import BillingInvoice from '../provider/MyPage/BillingInvoice'
import Authentication from '../provider/MyPage/Authentication'
import Balance from '../provider/MyPage/Balance'
import Withdraw from '../provider/MyPage/Balance/Withdraw'
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
import AboutUs from '../auth/AboutUs';
import Help from '../auth/Help';

const Stack = createStackNavigator();

const MainNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyleInterpolator: () => ({ titleStyle: { fontFamily: fonts.primaryLight } }),
      headerTitleStyle: { color: colors.white, fontFamily: fonts.primaryRegular },
      headerStyle: {
        backgroundColor: colors.secondary,
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
        borderBottomWidth: 0,
      },
      headerTintColor: '#222222',
      headerLeft: props => (
        <TouchableOpacity
          onPress={props.onPress}
          style={{ paddingVertical: 12, paddingHorizontal: 24 }}
        >
          <Image
            source={require('../../../assets/images/icons/arrow-back.png')}
            resizeMode="contain"
            style={{ height: 20 }}
          />
        </TouchableOpacity>
      ),
    }}
  >
    <Stack.Screen name="Main" component={HomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Settings" component={Settings} options={{ title: '设 置' }} />
    <Stack.Screen name="MyCreated" component={Developing} options={{ title: '我发布的' }} />
    <Stack.Screen name="VRShop" component={Developing} options={{ title: '我的VR' }} />
    <Stack.Screen name="MyContract" component={Developing} options={{ title: '我的合同' }} />
    <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Terms" component={TermsScreen} options={{ title: '服务条款和隐私政策' }} />
    <Stack.Screen
      name="Signup"
      component={SignupScreen}
      options={({ navigation }) => ({
        headerShown: false,
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
      })}
    />
    <Stack.Screen
      name="BasicProfile"
      component={BasicProfile}
      options={{
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
      }}
    />
    <Stack.Screen
      name="ShootingID"
      component={ShootingID}
      options={{
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
      }}
    />
    <Stack.Screen
      name="CompanyInfo"
      component={CompanyInfo}
      options={({ navigation }) => ({
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
      })}
    />
    <Stack.Screen
      name="SignupAsProvider"
      component={SignupAsProvider}
      options={{
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
      }}
    />
    <Stack.Screen
      name="SignupAsClient"
      component={SignupAsClient}
      options={{
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
      }}
    />
    <Stack.Screen
      name="LoginWithPassword"
      component={LoginWithPassword}
      options={({ navigation }) => ({
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
        headerRight: () => (
          <Text size={12} style={{color: colors.primary, paddingRight: 25}} onPress={() => navigation.navigate('Signup')}>
            注册
          </Text> 
        ),
      })}
    />
    <Stack.Screen name="ClientJob" component={ClientJob} options={{ title: '订单' }} />
    <Stack.Screen name="MyCollection" component={MyCollection} options={{ title: '我的收藏' }} />
    <Stack.Screen name="RequestInvoice" component={RequestInvoice} options={{ title: '申请发票' }} />
    <Stack.Screen name="MyAttention" component={MyAttention} options={{ title: '我的关注' }} />
    <Stack.Screen name="MyVR" component={MyVR} options={{ title: '我的VR' }} />
    <Stack.Screen
      name="LoginWithSMS"
      component={LoginWithSMS}
      options={({ navigation }) => ({
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
        headerRight: (props) => (
          <Text size={12} style={{color: colors.primary, paddingRight: 25}} onPress={() => navigation.navigate('Signup')}>
            注册
          </Text>
        ),
      })}
    />
    <Stack.Screen name="Provider" component={Provider} options={{ headerShown: false }} />
    <Stack.Screen name="ProviderDetail" component={ProviderDetail} options={{ headerShown: false }} />
    <Stack.Screen name="ApplyJob" component={ApplyJob} options={{ title: '接单列表' }} />
    <Stack.Screen name="Client" component={Client} options={{ headerShown: false }} />
    <Stack.Screen name="PostJob" component={PostJob} options={{ title: '需求发布' }} />
    <Stack.Screen name="ClientJobDetail" component={ClientJobDetail} options={{ title: '订单详情' }} />
    <Stack.Screen name="GiveFeedback" component={GiveFeedback} options={{ title: '意见反馈' }} />
    <Stack.Screen name="BillingInvoice" component={BillingInvoice} options={{ title: '发票申请列表' }} />
    <Stack.Screen name="Authentication" component={Authentication} options={{ title: '认证中心' }} />
    <Stack.Screen name="Balance" component={Balance} options={{ title: '我的余额' }} />
    <Stack.Screen name="Withdraw" component={Withdraw} options={{ title: '提现' }} />
    <Stack.Screen name="MyCreatedVR" component={MyCreatedVR} options={{ title: '我发布的' }} />
    <Stack.Screen name="ProviderJob" component={ProviderJob} options={{ title: '订单' }} />
    <Stack.Screen name="ProviderJobDetail" component={ProviderJobDetail} options={{ title: '订单详情' }} />
    <Stack.Screen name="UploadMedia" component={UploadMedia} options={{ title: '上传视频链接' }} />
    <Stack.Screen name="Chatting" component={Chatting} options={{ title: '大众传媒' }} />
    <Stack.Screen name="ViewInvoice" component={ViewInvoice} options={{ title: '' }} />
    <Stack.Screen name="Notification" component={Notification} options={{ title: '消息' }} />
    <Stack.Screen name="SystemNotification" component={SystemNotification} options={{ title: '通知消息' }} />
    <Stack.Screen name="PersonalInformation" component={PersonalInformation} options={{ title: '' }} />
    <Stack.Screen name="Security" component={Security} options={{ title: '安全验证' }} />
    <Stack.Screen name="WebViewer" component={WebViewer} options={{ headerShown: false }} />
    <Stack.Screen name="SearchBar" component={SearchBar} options={{ headerShown: false }} />
    <Stack.Screen name="Player" component={Player} options={{ title: '' }} />
    <Stack.Screen name="SearchResult" component={SearchResult} options={{ title: '搜索结果' }} />
    <Stack.Screen name="Location" component={Location} options={{ title: '地方' }} />
    <Stack.Screen name="Gallery" component={GalleryScreen} options={{ title: '画廊' }} />
    <Stack.Screen name="Article" component={AvailableInFullVersion} options={{ title: '' }} />
    <Stack.Screen name="Chat" component={AvailableInFullVersion} options={{ title: '' }} />
    <Stack.Screen name="Messages" component={AvailableInFullVersion} options={{ title: '' }} />
    <Stack.Screen name="Charts" component={AvailableInFullVersion} options={{ title: '' }} />
    <Stack.Screen name="AboutUs" component={AboutUs} options={{ title: '' }} />
    <Stack.Screen name="Help" component={Help} options={{ title: '' }} />
  </Stack.Navigator>
)

export default () => (
  <NavigationContainer>
    <MainNavigator />
  </NavigationContainer>
);
