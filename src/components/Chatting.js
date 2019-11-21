
import React from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import {Loader} from '../components'
import { getChat } from '../redux/modules/chat'
import { chatsloadingSelector, chatsListSelector } from '../redux/selectors'
import XMPP from 'react-native-xmpp'

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

  componentWillMount() {
    const {navigation} = this.props
    let to = navigation.getParam('to', '')
    if (to != '') {
      this.props.getChat({
        params: {to},
        success: () => this.initMessages()
      })
      this.setState({to})
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
    chatsList.length && chatsList[0].map((conversation, index) => (
      (conversation.messageCount == 1) ?
        this._storeMessages({
          _id: new Date().getTime(),
          text: conversation.messages.message.body,
          createdAt: conversation.messages.message.sentDate,
          user: {
            _id: (conversation.messages.message.to == `${to}@desktop-jgen8l2/spark`) ? -1: 2 
          }
        })
      : conversation.messages.message.map((messageItem, messageIndex) => (
        this._storeMessages({
          _id: new Date().getTime(),
          text: messageItem.body,
          createdAt: messageItem.sentDate,
          user: {
            _id: (messageItem.to == `${to}@desktop-jgen8l2/spark`) ? -1: 2 
          }
        })
      ))
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
    const {loading} = this.props
    return (
      <>
        <Loader loading={loading} />
        <GiftedChat
          messages={this.state.messages}
          onSend={this.onSend}
          user={user}
        />
      </>
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
  getChat,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Chatting);
