
import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { XMPP } from '../utils';
import {Loader} from "."
import { getChat } from '../redux/modules/chat'
import { addToContacts } from '../redux/modules/auth'
import {getUser} from '../redux/modules/user'
import { chatsloadingSelector, chatsListSelector, profileSelector, userDetailSelector } from '../redux/selectors'
import constants from '../constants'; 

class Chatting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      userId: null,
      to: '',
    };

    this.onReceivedMessage = this.onReceivedMessage.bind(this);
    this.onSend = this.onSend.bind(this);
    this._storeMessages = this._storeMessages.bind(this);

  }

  componentWillMount() {  
    const {navigation, profile, getUser} = this.props
    const to = navigation.getParam('to', '')
    if (to != '') {
      if (profile.contacts.indexOf(to) == -1) {
        this.props.addToContacts({
          body: {contact: to}
        })
      }
      this.setState({to, photo: `${to  }_photo.jpg`})
      getUser({id: to})
      this.props.getChat({
        params: {to},
        success: (payload) => this.initMessages(payload.data.messages)
      })
      XMPP.on('message', (message) => this.onReceivedMessage(message));
    }
  }
  
  initMessages = (chatsList) => {
    const {profile, user} = this.props
    const {to} = this.state
    const message= [
      {
        _id: new Date().getTime(),
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: constants.BASE_URL +  user.photo,
        },
      },
    ]
    console.log(">>>>>chats",chatsList)
    chatsList.length && chatsList.map((conversation, index) => (
      (conversation.messageCount == 1) ?
        this._storeMessages({
          _id: new Date().getTime(),
          text: conversation.messages.message.body,
          createdAt: conversation.messages.message.sentDate,
          user: {
            _id: (conversation.messages.message.to == `${to}@desktop-jgen8l2/spark`) ? -1: 2,
            avatar: constants.BASE_URL +  user.photo
          }
        })
      : conversation.messages.message.map((messageItem, messageIndex) => (
        this._storeMessages({
          _id: new Date().getTime(),
          text: messageItem.body,
          createdAt: messageItem.sentDate,
          user: {
            _id: (messageItem.to == `${to}@desktop-jgen8l2/spark`) ? -1: 2,
            avatar: constants.BASE_URL +  user.photo
          }
        })
      ))
    ))
  }

  onReceivedMessage(messages) {
      const {navigation, user} = this.props
      const {to} = this.state
      if (!messages.body) return
      const from = String(messages.from).split('@')[0]
      // if (navigation.state.routeName != 'Chatting') return
      if (from != to) return

      const message= [
        {
          _id: new Date().getTime(),
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: constants.BASE_URL +  user.photo
          },
        },
      ]
      message[0].text = messages.body
      this._storeMessages(message);
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
      const JID = `${this.state.to}@desktop-jgen8l2/spark`
      XMPP.message(messages[0].text, JID)
  }

  render() {
    const user = { _id: this.state.userId || -1 };
    const {loading} = this.props
    return (
      <>
        {loading? <Loader loading={loading} /> : (
          <GiftedChat
            messages={this.state.messages}
            onSend={this.onSend}
            user={user}
          />
)}
      </>
    );
  }

  // Helper functions
  _storeMessages(messages) {
    this.setState((previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }));
  }
}

const mapStateToProps = createStructuredSelector({
  loading: chatsloadingSelector,
  chatsList: chatsListSelector,
  profile: profileSelector,
  user: userDetailSelector
});

const mapDispatchToProps = {
  getChat,
  getUser,
  addToContacts
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Chatting);
