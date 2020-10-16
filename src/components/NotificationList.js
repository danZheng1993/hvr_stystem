import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { connect } from 'react-redux';
import { compose } from 'recompose';
import isEmpty from 'lodash/isEmpty';

import { colors } from '../styles';
import constants from '../constants';

const Notification = ({ notification }) => (
  <View style={styles.notification}>
    <Text style={styles.title}>{notification.content}</Text>
    {!isEmpty(notification.title) && (
      <Text style={styles.subTitle}>{notification.title}</Text>
    )}
    {!isEmpty(notification.image) && (
      <Image style={styles.image} source={{ uri: constants.MESSAGE_BASE_URL + notification.image }} resizeMode="contain" />
    )}
  </View>
)

class NotificationList extends React.Component {
  getNotifications = () => {
    const { route, userRole } = this.props;
    const notifications = route.params && route.params.notifications || [];
    return notifications.filter(notification => notification.target === userRole || notification.target === 'all');
  }
  render () {
    const notifications = this.getNotifications();
    return (
      <View style={styles.container}>
        {notifications.length ? notifications.map((notification, index) => (
            <Notification notification={notification} />
          )) : <Text>暂无消息</Text> }
      </View>
    )
  }
}

const styles= StyleSheet.create({ 
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
    paddingTop: 20,
    backgroundColor: colors.bluish,
  },
  notification: {
    backgroundColor: 'white',
    padding: 16,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#E3E3E3',
  },
  title: {
    fontSize: 16,
  },
  subTitle: {
    fontSize: 14
  },
  image: {
    width: '100%',
    height: 250,
  }
})

const mapStateToProps = state => ({
  userRole: state.auth.me.role,
});
  
const withConnect = connect(mapStateToProps);
  
export default compose(withConnect)(NotificationList);
