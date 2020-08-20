import React, { useEffect } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import Pushy from 'pushy-react-native';

import { store, persistor } from './src/redux/store';
import { messageReceived, tokenGenerated } from './src/redux/modules/message';
import AppView from './src/modules/AppViewContainer';
import { Player } from './src/components';

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
      console.log({ deviceToken });
      store.dispatch(tokenGenerated(deviceToken));
    });
    Pushy.setNotificationListener(async (data) => {
      let notificationTitle = 'HVR System';
      let notificationText = data.message || 'Test notification';
      Pushy.notify(notificationTitle, notificationText, data);
      store.dispatch(messageReceived({ message: data.message }));
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
