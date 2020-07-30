import { applyMiddleware, createStore } from 'redux';
// import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
// import AsyncStorage from '@react-native-community/async-storage';

import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './reducers';
import sagas from './sagas'

const sagaMiddleware = createSagaMiddleware()
export const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware,
    sagaMiddleware,
    createLogger({
      collapsed: true,
      // eslint-disable-next-line no-undef
      predicate: () => __DEV__,
    }),
  )
);

sagaMiddleware.run(sagas)
