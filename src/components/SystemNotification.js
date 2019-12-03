import { ListItem } from 'react-native-elements'
import { View, Text, StyleSheet } from 'react-native'
import React, {Component} from 'react'
import {Button} from '.'
import Icon from 'react-native-vector-icons/Feather';
import { colors, fonts } from '../styles';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import {findIndex} from 'lodash'
import { createStructuredSelector } from 'reselect';
import { NavigationActions } from 'react-navigation'
import {getContacts} from '../redux/modules/auth'
import { notificationsSelector} from '../redux/selectors'
import constants from '../constants'

class SystemNotification extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    clearItems = () => {

    }

    render () {
        const {notification} = this.props
        return (
            <View style={styles.container}>
                {notification.length ? notification.map((notificationItem, index) => (
                    <ListItem
                        key={index}
                        title= {notificationItem.body}
                        hideChevron={false}
                        // onPress = {() => props.navigation.navigate('PersonalInformation')}
                        bottomDivider
                    />
                )) : <Text>No Items to display</Text> 
                }
                {/* {contacts && contacts.map((contact, i) => (
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
                ))} */}
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
  demoButton: {
    marginTop: 8,
    marginBottom: 8,
  },  
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
    paddingTop: 20,
    backgroundColor: colors.bluish,
  },
})
const mapStateToProps = createStructuredSelector({
    notification: notificationsSelector
});

const mapDispatchToProps = {
};
  
const withConnect = connect(mapStateToProps, mapDispatchToProps);
  
export default compose(withConnect)(SystemNotification);
