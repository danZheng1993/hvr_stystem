import { applyMiddleware, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import AsyncStorage from '@react-native-community/async-storage';

import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { compose } from 'redux'

import reducer from './reducers';
import sagas from './sagas'
import reactotron from '../../ReactotronConfig';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
}

const persistedReducer = persistReducer(
  persistConfig,
  reducer,
);

const sagaMiddleware = createSagaMiddleware()
export const store = createStore(
  persistedReducer,
  compose(
    applyMiddleware(
      thunkMiddleware,
      sagaMiddleware,
      createLogger({
        collapsed: true,
        // eslint-disable-next-line no-undef
        predicate: () => __DEV__,
      }),
    ),
    reactotron.createEnhancer()
  )
);

export const persistor = persistStore(store);

sagaMiddleware.run(sagas)
