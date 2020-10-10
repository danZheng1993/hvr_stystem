
import React from 'react';
import { View, TouchableOpacity, Text, Dimensions, ActivityIndicator, Image, TouchableWithoutFeedback } from 'react-native';
import { GiftedChat, Send } from 'react-native-gifted-chat';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import socketIO from 'socket.io-client';
import moment from 'moment';
import { reverse, get } from "lodash";
import {Loader} from "."
import { getChat } from '../redux/modules/chat'
import { addToContacts } from '../redux/modules/auth'
import {getUser} from '../redux/modules/user'
import { chatsloadingSelector, chatsListSelector, profileSelector, userDetailSelector } from '../redux/selectors'
import constants from '../constants'; 
import { postApi, getApi } from '../redux/api/apiCall';
import { colors} from '../styles';

import DefaultAvatar from '../../assets/images/default-avatar.png';
import reactotron from 'reactotron-react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('screen');

const styles = {
  sendButton: {
    padding: 16,
  },
  sendButtonText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  loadEarlierButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 18,
    backgroundColor: colors.primaryLight,
    width: 150,
    alignItems: 'center',
    marginVertical: 24,
    marginHorizontal: (SCREEN_WIDTH - 150) / 2,
  },
  loadEarlierText: {
    color: colors.white,
  },
  loadingIndicator: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginVertical: 24,
    marginHorizontal: (SCREEN_WIDTH - 150) / 2,
    alignItems: 'center',
  },

  imageWrapper: {
    width: 50,
    height: 50,
    position: 'relative',
    borderRadius: 25,
    overflow: 'hidden',
  }, 
  photo: {
    borderRadius: 25,
    borderColor: colors.gray,
    backgroundColor: colors.info,
    width: 50,
    height: 50
  },
  loadingContainer: {
    position: 'absolute',
    width: 50,
    height: 50,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  }
}

class AvatarImage extends React.Component {
  state = {
    loading: false,
    imageFailed: false,
  }

  componentDidUpdate(prevProps) {
    if (this.props.photo !== prevProps.photo) {
      this.setState({
        loading: false,
        imageFailed: false,
      });
    }
  }

  render() {
    const { photo } = this.props;
    const { imageFailed, loading } = this.state;
    return (
      <View style={styles.imageWrapper}>
        <Image
          source={!imageFailed ? { uri: photo } : DefaultAvatar}
          style={styles.photo}
          onLoadStart={() => {
            !imageFailed && this.setState({ loading: true })
          }}
          onLoad={() => {
            !imageFailed && this.setState({ loading: false })
          }}
          onError={() => {
            this.setState({ imageFailed: true, loading: false })
          }}
        />
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="white" />
          </View>
        )}
      </View>
    )
  }
}

class Chatting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      userId: null,
      to: '',
      loadingEarlier: false,
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
    const startDate = moment().startOf('date').toISOString();
    const endDate = moment().endOf('date').toISOString();
    // .add(moment().utcOffset(), 'minutes')
    try {
      const result = await getApi(`/chats?filter[sender]=${sender}&filter[receiver]=${receiver}&filter[start]=${startDate}&filter[end]=${endDate}`);
      const messages = result.data.chats.map((chat) => ({
        _id: chat._id,
        text: chat.message,
        user: {
          _id: sender === chat.sender ? -1 : 2,
        },
        createdAt: chat.created
      }));
      this.setState({ messages: reverse(messages) });
    } catch(err) {
      console.log('chats fetch', err);
    }
  }

  loadEarlier = async () => {
    const { messages: originMessages } = this.state;
    this.setState({ loadingEarlier: true });
    const receiver = this.state.to;
    const sender = this.props.profile._id;
    try {
      const lastDate = moment(originMessages[originMessages.length - 1].createdAt).subtract(1, 'day').endOf('date').toISOString();
      const startDate = moment(originMessages[originMessages.length - 1].createdAt).subtract(1, 'day').startOf('date').toISOString();
      const result = await getApi(`/chats?filter[sender]=${sender}&filter[receiver]=${receiver}&filter[start]=${startDate}&filter[end]=${lastDate}`);
      const messages = result.data.chats.map((chat) => ({
        _id: chat._id,
        text: chat.message,
        user: {
          _id: sender === chat.sender ? -1 : 2,
        },
        createdAt: chat.created
      }));
      this.setState((previousState) => ({
        messages: GiftedChat.prepend(previousState.messages, reverse(messages)),
      }));
    } catch(err) {
      console.log('chats fetch', err);
    } finally {
      this.setState({ loadingEarlier: false });
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
            avatar: constants.BASE_URL + 'profileImage/' + user.photo
          }
        })
      : conversation.messages.message.map((messageItem, messageIndex) => (
        this._storeMessages({
          _id: new Date().getTime(),
          text: messageItem.body,
          createdAt: messageItem.sentDate,
          user: {
            _id: (messageItem.to == to) ? -1: 2,
            avatar: constants.BASE_URL + 'profileImage/' + user.photo
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
            name: user.username,
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

  renderSend = (props) => (
    <Send {...props}>
      <View style={styles.sendButton}>
        <Text style={styles.sendButtonText}>发送</Text>
      </View>
    </Send>
  );

  renderLoadEarlier = (props) => this.state.loadingEarlier ? (
    <View style={styles.loadingIndicator}>
      <ActivityIndicator color={colors.secondary} size="small" />
    </View>
  ): (
    <TouchableOpacity style={styles.loadEarlierButton} onPress={props.onLoadEarlier}>
      <Text style={styles.loadEarlierText}>加载早期消息</Text>
    </TouchableOpacity>
  )

  renderAvatar = (props) => {
    const { currentMessage, onPressAvatar } = props;
    const { user, _id: currentMessageId, moderatorJoined } = currentMessage;
    const { firstUnread } = this.state;
    const { user: userProfile } = this.props;
    const profilePhoto = get(userProfile, 'photo', 'default.png');
    return <AvatarImage photo={constants.BASE_URL + 'profileImage/' + profilePhoto} />;
  };

  render() {
    const {loading} = this.props
    const user = { _id: this.state.userId || -1 };
    return (
      <>
        {loading? <Loader loading={loading} /> : (
          <GiftedChat
            messages={this.state.messages}
            onSend={this.onSend}
            user={user}
            loadEarlier={true}
            onLoadEarlier={this.loadEarlier}
            renderSend={this.renderSend}
            placeholder="键入消息。。。"
            renderLoadEarlier={this.renderLoadEarlier}
            renderAvatar={this.renderAvatar}
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
