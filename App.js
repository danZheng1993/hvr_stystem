import React, { useEffect } from 'react';
import { Platform, PermissionsAndroid, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import Pushy from 'pushy-react-native';
import * as WeChat from 'react-native-wechat-lib';
import Geolocation from '@react-native-community/geolocation';

Geolocation.setRNConfiguration({
  skipPermissionRequests: true,
  authorizationLevel: "whenInUse",
});

import { store, persistor } from './src/redux/store';
import { messageReceived, tokenGenerated } from './src/redux/modules/message';
import AppView from './src/modules/AppViewContainer';
import { Player } from './src/components';
import CONSTANTS from './src/constants';
import reactotron from 'reactotron-react-native';
import { getApi, getLocation, postApi } from './src/redux/api/apiCall';

const initWeChat = async () => {
  try {
    const result = await WeChat.registerApp(CONSTANTS.WECHAT_APP_ID, 'https://hvr.app');
    console.log('wechat init', result);
  } catch (err) {
    console.log('wechat init fail', err);
  }
};

initWeChat();

console.disableYellowBox = true;

export default function App() {
  useEffect(() => {
    Pushy.listen();
    if (Platform.OS === 'android') {
      PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE).then((granted) => {
        if (!granted) {
          PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE).then((result) => {
            if (result !== PermissionsAndroid.RESULTS.GRANTED) {
              // Possibly ask the user to grant the permission
              PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
            }
          });
        }
      });
    }
    Pushy.register().then((deviceToken) => {
      store.dispatch(tokenGenerated(deviceToken));
    });
    Pushy.setNotificationListener(async (data) => {
      let notificationTitle = 'HVR System';
      let notificationText = data.message || 'Test notification';
      Pushy.notify(notificationTitle, notificationText, data);
      store.dispatch(messageReceived(data));
    });
  })
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppView />
      </PersistGate>
    </Provider>
  );
}
