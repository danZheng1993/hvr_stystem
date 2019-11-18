
import React from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import SocketIOClient from 'socket.io-client';
import { GiftedChat } from 'react-native-gifted-chat';
import XMPP from 'react-native-xmpp'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      userId: null,
      to: ''
    };

    this.onReceivedMessage = this.onReceivedMessage.bind(this);
    this.onSend = this.onSend.bind(this);
    this._storeMessages = this._storeMessages.bind(this);
    XMPP.on('message', (message) => this.onReceivedMessage(message));

  }

  componentDidMount() {
    const {navigation} = this.props
    let to = navigation.getParam('to', '')
    if (to != '') {
        this.setState({to})
    }
  }
  onReceivedMessage(messages) {
      console.log(messages)
      var message= [
        {
          _id: new Date().getTime(),
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ]

      if (messages.body) {
        message[0].text = messages.body
        this._storeMessages(message);
      }
  }

  handleMessage(message) {
    
  }

  /**
   * When a message is sent, send the message to the server
   * and store it in this component's state.
   */
  onSend(messages=[]) {
      console.log(messages)
      this._storeMessages(messages);
      var JID = `${this.state.to}@desktop-jgen8l2/spark`
      XMPP.message(messages[0].text, JID)
  }

  render() {
    var user = { _id: this.state.userId || -1 };

    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        user={user}
      />
    );
  }

  // Helper functions
  _storeMessages(messages) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  }
}
