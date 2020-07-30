import { Provider } from 'react-redux';
import React from 'react';
import { StyleSheet } from 'react-native';

import {  store } from './src/redux/store';
import AppView from './src/modules/AppViewContainer';

export default function App() {
  return (
    <Provider store={store}>
      <AppView />
    </Provider>
  );
}
