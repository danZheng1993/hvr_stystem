
import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import socketIO from 'socket.io-client';
import moment from 'moment';
import { reverse } from "lodash";
import {Loader} from "."
import { getChat } from '../redux/modules/chat'
import { addToContacts } from '../redux/modules/auth'
import {getUser} from '../redux/modules/user'
import { chatsloadingSelector, chatsListSelector, profileSelector, userDetailSelector } from '../redux/selectors'
import constants from '../constants'; 
import { postApi, getApi } from '../redux/api/apiCall';

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
    const socket = socketIO(constants.BASE_URL, { transports: ['websocket'], jsonp: false });
    socket.connect();
    this.socket = socket;
    socket.on('connect', () => { 
      socket.emit('join', { userId: props.profile._id })
    });
    socket.on('disconnect', () => {
    });
    socket.on('message', (data) => {
      this.onReceivedMessage(data);
    })
  }

  componentWillMount() {  
    const {route, profile, getUser} = this.props
    const { to } = route.params || {}
    if (to != '') {
      if (profile.contacts.indexOf(to) == -1) {
        this.props.addToContacts({
          body: {contact: to}
        })
      }
      this.setState({to, photo: `${to  }_photo.jpg`})
      getUser({id: to})
      this.initChat(to);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.to !== this.props.to) {
      this.initChat();
    }
  }

  initChat = async (to = undefined) => {
    const receiver = to || this.state.to;
    const sender = this.props.profile._id;
    const startDate = moment().startOf('date').add(moment().utcOffset(), 'minutes').toISOString();
    const endDate = moment().endOf('date').add(moment().utcOffset(), 'minutes').toISOString();
    try {
      const result = await getApi(`/chats?filter[sender]=${sender}&filter[receiver]=${receiver}&filter[start]=${startDate}&filter[end]=${endDate}`);
      const messages = result.data.chats.map((chat) => ({
        _id: chat._id,
        text: chat.message,
        user: {
          _id: sender === chat.sender ? -1 : 2
        },
        createdAt: chat.created
      }));
      this.setState({ messages: reverse(messages) });
    } catch(err) {
      console.log('chats fetch', err);
    }
  }

  loadEarlier = async () => {
    const { messages } = this.state;
    const receiver = this.state.to;
    const sender = this.props.profile._id;
    const lastDate = moment(messages[messages.length - 1].createdAt).add(moment().utcOffset(), 'minutes').subtract(1, 'day').startOf('date').toISOString();
    const startDate = moment(messages[messages.length - 1].createdAt).add(moment().utcOffset(), 'minutes').subtract(1, 'day').endOf('date').toISOString();
    try {
      const result = await getApi(`/chats?filter[sender]=${sender}&filter[receiver]=${receiver}&filter[start]=${startDate}&filter[end]=${lastDate}`);
      const messages = result.data.chats.map((chat) => ({
        _id: chat._id,
        text: chat.message,
        user: {
          _id: sender === chat.sender ? -1 : 2
        },
        createdAt: chat.created
      }));
      this.setState((previousState) => ({
        messages: GiftedChat.prepend(previousState.messages, messages),
      }));
    } catch(err) {
      console.log('chats fetch', err);
    }
  }
  
  initMessages = (chatsList) => {
    const {profile, user} = this.props
    const {to} = this.state
    chatsList.length && chatsList.map((conversation, index) => (
      (conversation.messageCount == 1) ?
        this._storeMessages({
          _id: new Date().getTime(),
          text: conversation.messages.message.body,
          createdAt: conversation.messages.message.sentDate,
          user: {
            _id: (conversation.messages.message.to == to) ? -1: 2,
            avatar: constants.BASE_URL +  user.photo
          }
        })
      : conversation.messages.message.map((messageItem, messageIndex) => (
        this._storeMessages({
          _id: new Date().getTime(),
          text: messageItem.body,
          createdAt: messageItem.sentDate,
          user: {
            _id: (messageItem.to == to) ? -1: 2,
            avatar: constants.BASE_URL +  user.photo
          }
        })
      ))
    ))
  }

  onReceivedMessage = (messages) => {
      const {user} = this.props

      if (!messages.message) return
      const message= [
        {
          _id: messages.id,
          text: messages.message,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: constants.BASE_URL +  user.photo
          },
        },
      ]
      this._storeMessages(message);
  }

  handleMessage = (message) => {
    
  }

  /**
   * When a message is sent, send the message to the server
   * and store it in this component's state.
   */
  onSend = (messages=[]) => {
    this._storeMessages(messages);
    const { to, userId } = this.state;
    this.sendMessage(messages);
  }

  // Helper functions
  _storeMessages = (messages) => {
    this.setState((previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }));
  }

  sendMessage = async (messages) => {
    const { to } = this.state;
    const { profile } = this.props;
    const message = messages[0];
    try {
      const result = await postApi('/chats', {
        message: message.text,
        sender: profile._id,
        receiver: to,
      });
      const messageId = result.data._id;
      this.socket.emit('message', {
        message: message.text,
        sender: profile._id,
        receiver: to,
        id: messageId,
      })
    } catch (err) {
      console.log(err);
    }
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
            loadEarlier={true}
            onLoadEarlier={this.loadEarlier}
          />
        )}
      </>
    );
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
