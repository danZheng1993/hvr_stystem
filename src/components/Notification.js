import { ListItem, Badge } from 'react-native-elements'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, {Component} from 'react'
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';

import { colors, fonts } from '../styles';
import {getContacts, clearUnreadMessages, getNormalNotifications, getEventNotifications} from '../redux/modules/auth'
import { messageRead } from '../redux/modules/message';
import { contactsSelector, unreadMessagesSelector} from '../redux/selectors'
import constants from '../constants'
import reactotron from 'reactotron-react-native';

const iconTransaction = require('../../assets/images/transaction.png')
const iconNotification = require('../../assets/images/notification.png')
const iconActivity = require('../../assets/images/activity.png')

class Notification extends React.Component {
    state = {
      notification: [],
      normalNotification: [],
      eventNotification: [],
    }

    componentDidMount() {
      this.props.getContacts();
      this.props.navigation.addListener('focus', this.fetchNotifications)
      this.fetchNotifications();
    }

    fetchNotifications = () => {
      const { getNormalNotifications, getEventNotifications } = this.props;
      getNormalNotifications({
        success: (payload) => {
          this.setState({ normalNotification: payload.data.messages || [] })
        }
      });
      getEventNotifications({
        success: (payload) => {
          this.setState({ eventNotification: payload.data.messages || [] })
        }
      });
    }

    startChat = (id) => {
      this.props.clearUnreadMessages(id)
      this.props.navigation.navigate('Chatting', {to: id})
    }

    showNotification = () => {
      this.props.messageRead();
      this.props.clearUnreadMessages('system')
      this.props.navigation.navigate('SystemNotification')
    }

    showNormalNotification = () => {
      const { normalNotification } = this.state;
      this.props.messageRead();
      this.props.navigation.navigate({
        name: 'NotificationList',
        params: { type: 'normal', notifications: normalNotification }
      });
    }
    
    showEventNotification = () => {
      const { eventNotification } = this.state;
      this.props.messageRead();
      this.props.navigation.navigate({
        name: 'NotificationList',
        params: { type: 'event', notifications: eventNotification }
      });
    }

    render () {
        const {contacts, unread} = this.props
        return (
          <View style={styles.container}>
              <View style={styles.demoIconsContainer}>
                <TouchableOpacity 
                  style={{ justifyContent:"center", alignItems:"center", marginHorizontal: 10}}
                  // onPress = {() => this.showNotification()}
                >
                  <Image
                    resizeMode="contain"
                    source={iconTransaction}
                    style={{width:50, height: 50}}
                  />
                  <Text color={colors.secondary}>交易信息</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={{ justifyContent:"center", alignItems:"center", marginHorizontal: 10}}
                  onPress = {() => this.showNormalNotification()}
                >
                  <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                    {!!unread['system'] && <Badge value={unread['system']} status="error"/>}
                    <Image
                      resizeMode="contain"
                      source={iconNotification}
                      style={{width:50, height: 50}}
                    />
                  </View>
                  <Text color={colors.secondary}>通知消息</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={{ justifyContent:"center", alignItems:"center", marginHorizontal: 10}}
                  onPress = {() => this.showEventNotification()}
                >
                  <Image
                    resizeMode="contain"
                    source={iconActivity}
                    style={{width:50, height: 50}}
                  />
                  <Text color={colors.secondary}>活动消息</Text>
                </TouchableOpacity>
              </View>
              {!!contacts.length && contacts.map((contact, i) => (
                typeof(contact) == "object" &&
                <ListItem
                  key={i}
                  leftAvatar={{ source: { uri: constants.BASE_URL + contact.photo } }}
                  avatarStyle={{ width: 100, height: 100, backgroundColor: 'white'}}
                  title={contact.userName}
                  subtitle={contact.overview}
                  onPress={() => this.startChat(contact._id)}
                  bottomDivider
                  badge={!!unread[contact._id] ? { value: unread[contact._id] , textStyle: { color: 'white' }, badgeStyle: { backgroundColor: 'red' } }: null}
                />
              ))}
          </View>
        )
    }
}
const styles= StyleSheet.create({
  
  demoIconsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    marginBottom: 20,
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 5,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 20,
    backgroundColor: colors.bluish,
  },
})
const mapStateToProps = createStructuredSelector({
    contacts: contactsSelector,
    unread: unreadMessagesSelector
});

const mapDispatchToProps = {
    getContacts,
    messageRead,
    clearUnreadMessages,
    getNormalNotifications,
    getEventNotifications,
};
  
const withConnect = connect(mapStateToProps, mapDispatchToProps);
  
export default compose(withConnect)(Notification);
