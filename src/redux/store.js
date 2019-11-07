import { applyMiddleware, createStore, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga'

import storage from 'redux-persist/lib/storage';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './reducers';
import sagas from './sagas'

const sagaMiddleware = createSagaMiddleware()
const initialState = {}

const enhancers = [
  applyMiddleware(
    thunkMiddleware,
    sagaMiddleware,
    createLogger({
      collapsed: true,
      // eslint-disable-next-line no-undef
      predicate: () => __DEV__,
    }),
  ),
];

/* eslint-disable no-undef */
const composeEnhancers =
  (__DEV__ &&
    typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
/* eslint-enable no-undef */

const enhancer = composeEnhancers(...enhancers);

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [],
};
const persistedReducer = persistReducer(persistConfig, reducer);

const store1 = createStore(persistedReducer, initialState, enhancer);

sagaMiddleware.run(sagas)

export const store = store1
export const persistor = persistStore(store);
