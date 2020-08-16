import React, { useEffect } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import { Provider } from 'react-redux';
import Pushy from 'pushy-react-native';

import { store } from './src/redux/store';
import { messageReceived } from './src/redux/modules/message';
import AppView from './src/modules/AppViewContainer';

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
    Pushy.register();
    Pushy.setNotificationListener(async (data) => {
      let notificationTitle = 'HVR System';
      let notificationText = data.message || 'Test notification';
      Pushy.notify(notificationTitle, notificationText, data);
      store.dispatch(messageReceived({ message: data.message }));
  });
  })
  return (
    <Provider store={store}>
      <AppView />
    </Provider>
  );
}
