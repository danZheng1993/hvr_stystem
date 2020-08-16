import uuid from 'react-native-uuid';
import { createAction, handleActions } from 'redux-actions'

// ------------------------------------
// Constants
// ------------------------------------
export const MESSAGE_RECEIVED = 'MESSAGE_RECEIVED'
export const MESSAGE_VIEWED = 'MESSAGE_RECEIVED'

// ------------------------------------
// Actions
// ------------------------------------

export const messageReceived = createAction(MESSAGE_RECEIVED)
export const messageViewed = createAction(MESSAGE_VIEWED)

const initialState = {
  messages: []
}

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [MESSAGE_RECEIVED]: (state, { payload }) => ({
    ...state,
    messages: [...state.messages, {id: uuid.v4(), ...payload}],
  }),
  [MESSAGE_VIEWED]: (state, { payload }) => {
    const newMessages = state.messages.map((msg) => {
      return {...msg, read: msg.id === payload}
    });
    return {
      ...state,
      messages: newMessages
    };
  }
}, initialState);
