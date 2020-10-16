import uuid from 'react-native-uuid';
import { createAction, handleActions } from 'redux-actions'

// ------------------------------------
// Constants
// ------------------------------------
export const MESSAGE_RECEIVED = 'MESSAGE_RECEIVED'
export const MESSAGE_VIEWED = 'MESSAGE_VIEWED'
export const TOKEN_GENERATED = 'TOKEN_GENERATED'
export const MESSAGE_READ = 'MESSAGE_READ'

// ------------------------------------
// Actions
// ------------------------------------

export const messageReceived = createAction(MESSAGE_RECEIVED)
export const messageViewed = createAction(MESSAGE_VIEWED)
export const tokenGenerated = createAction(TOKEN_GENERATED)
export const messageRead = createAction(MESSAGE_READ)

const initialState = {
  messages: [],
  token: null,
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [MESSAGE_RECEIVED]: (state, { payload }) => ({
    ...state,
    messages: [...state.messages, {id: uuid.v4(), ...payload}],
  }),
  [MESSAGE_READ]: (state) => ({
    ...state,
    messages: []
  }),
  [MESSAGE_VIEWED]: (state, { payload }) => {
    const newMessages = state.messages.map((msg) => {
      return {...msg, read: msg.id === payload}
    });
    return {
      ...state,
      messages: newMessages
    };
  },
  [TOKEN_GENERATED]: (state, { payload }) => ({
    ...state,
    token: payload,
  })
}, initialState);
