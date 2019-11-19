
import React from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';

import { getChats, getChat } from '../redux/modules/chat'
import { chatsloadingSelector, chatsListSelector } from '../redux/selectors'
import XMPP from 'react-native-xmpp'
import { getAllExternalFilesDirs } from 'react-native-fs';

class Chatting extends React.Component {
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
        this.props.getChats({
          body: {toID: to},
          success: () => this.initMessages()
        })
    }
  }

  initMessages() {
    const {to} = this.state
    const {chatsList} = this.props
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
    console.log(">>>>>chats",chatsList)
    chatsList[0].map((conversation, index) => (
      (conversation.messageCount == 1) ?
        this._storeMessages({
          _id: new Date().getTime(),
          text: conversation.messages.message.body,
          createdAt: conversation.messages.message.sentDate,
          user: {
            _id: (conversation.messages.message.to == `${to}@desktop-jgen8l2/spark`) ? -1: 2 
          }
        })
      : conversation.messages.message.map((message, messageIndex) => {
        this._storeMessages({
          _id: new Date().getTime(),
          text: message.body,
          createdAt: message.sentDate,
          user: {
            _id: (message.to == `${to}@desktop-jgen8l2/spark`) ? 2: -1 
          }
        });
      })
    ))
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

const mapStateToProps = createStructuredSelector({
  loading: chatsloadingSelector,
  chatsList: chatsListSelector
});

const mapDispatchToProps = {
  getChats,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Chatting);
