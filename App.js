import { Provider } from 'react-redux';
import React from 'react';

import { store } from './src/redux/store';
import AppView from './src/modules/AppViewContainer';

console.disableYellowBox = true;

export default function App() {
  return (
    <Provider store={store}>
      <AppView />
    </Provider>
  );
}
