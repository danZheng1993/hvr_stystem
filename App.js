import { Provider } from 'react-redux';
import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { colors } from './src/styles';
// import configureStore from './src/configureStore';

import {  store, persistor } from './src/redux/store';
import AppView from './src/modules/AppViewContainer';

const initialState = {};
// const store = configureStore(initialState);

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate
        loading={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <View style={styles.container}>
            <ActivityIndicator color={colors.red} />
          </View>
        }
        persistor={persistor}
      >
        <AppView />
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});





// import React from 'react';
// import { View, Text, AsyncStorage } from 'react-native';
// import SocketIOClient from 'socket.io-client';
// import { GiftedChat } from 'react-native-gifted-chat';

// const USER_ID = '@userId';

// export default class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       messages: [],
//       userId: null
//     };

//     this.determineUser = this.determineUser.bind(this);
//     this.onReceivedMessage = this.onReceivedMessage.bind(this);
//     this.onSend = this.onSend.bind(this);
//     this._storeMessages = this._storeMessages.bind(this);

//     this.socket = SocketIOClient('http://192.168.0.207:3000');
//     this.socket.on('message', this.onReceivedMessage);
//     this.determineUser();
//   }

//   /**
//    * When a user joins the chatroom, check if they are an existing user.
//    * If they aren't, then ask the server for a userId.
//    * Set the userId to the component's state.
//    */
//   determineUser() {
//     AsyncStorage.getItem(USER_ID)
//       .then((userId) => {
//         // If there isn't a stored userId, then fetch one from the server.
//         if (!userId) {
//           this.socket.emit('userJoined', null);
//           this.socket.on('userJoined', (userId) => {
//             AsyncStorage.setItem(USER_ID, userId);
//             this.setState({ userId });
//           });
//         } else {
//           this.socket.emit('userJoined', userId);
//           this.setState({ userId });
//         }
//       })
//       .catch((e) => alert(e));
//   }

//   // Event listeners
//   /**
//    * When the server sends a message to this.
//    */
//   onReceivedMessage(messages) {
//     this._storeMessages(messages);
//   }

//   /**
//    * When a message is sent, send the message to the server
//    * and store it in this component's state.
//    */
//   onSend(messages=[]) {
//     this.socket.emit('message', messages[0]);
//     this._storeMessages(messages);
//   }

//   render() {
//     var user = { _id: this.state.userId || -1 };

//     return (
//       <GiftedChat
//         messages={this.state.messages}
//         onSend={this.onSend}
//         user={user}
//       />
//     );
//   }

//   // Helper functions
//   _storeMessages(messages) {
//     this.setState((previousState) => {
//       return {
//         messages: GiftedChat.append(previousState.messages, messages),
//       };
//     });
//   }
// }
