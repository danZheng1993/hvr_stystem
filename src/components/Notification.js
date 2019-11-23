import { ListItem } from 'react-native-elements'
import { View, Text, StyleSheet } from 'react-native'
import React, {Component} from 'react'
import {Button} from '../components'
import Icon from 'react-native-vector-icons/Feather';
import { colors, fonts } from '../styles';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { NavigationActions } from 'react-navigation'
import {getContacts} from '../redux/modules/auth'
import { contactsSelector} from '../redux/selectors'
import constants from '../constants'
import SyncStorage from 'sync-storage';
import { loadItem, deleteItem } from '../redux/api/storage';

class Notification extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            notification: []
        }
    }

    componentWillMount() {
        loadItem('notification').then(res => {
            const items = res || ''
            this.setState({notification: items.split(',')})
        })
        this.props.getContacts()
    }

    clearItems = () => {
        deleteItem('notification').then(() => {
            console.log("delete success")
            this.setState({
                notification: []
            })
        }
        )
    }

    startChat = (id) => {
        this.props.navigation.navigate('Chatting', {to: id})
    }

    render () {
        const {notification} = this.state
        const {contacts} = this.props
        return (
            <View style={styles.container}>
              <View style={styles.demoIconsContainer}>
                <View style={styles.buttonContainer} >
                <Button
                    style={styles.demoButton}
                    action
                    bgColor="#4F44C1"
                    >
                    <Text>
                    <Icon name="dollar-sign" size={20} color="white" />
                    </Text>
                </Button>
                <Text>
                交易信息
                </Text>
                </View>
                <View style={styles.buttonContainer} >
                <Button
                    style={styles.demoButton}
                    action
                    bgColor="#EF1F78"
                    >
                    <Text>
                    <Icon name="bell" size={20} color="white" />
                    </Text>
                </Button>
                <Text>
                通知消息
                </Text>
                </View>
                <View style={styles.buttonContainer} >
                <Button
                    style={styles.demoButton}
                    action
                    bgColor="#3CD4A0"
                    >
                    <Text>
                    <Icon name="star" size={20} color="white" />
                    </Text>
                </Button>
                <Text>
                活动消息
                </Text>
                </View>
            </View>
            
                {/* {notification.length ? notification.map((notificationItem, index) => (
                    <ListItem
                        key={index}
                        title= {notificationItem}
                        hideChevron={false}
                        // onPress = {() => props.navigation.navigate('PersonalInformation')}
                        bottomDivider
                    />
                )) : <Text>No Items to display</Text> 
                } */}
                {contacts && contacts.map((contact, i) => (
                    typeof(contact) == "object" &&
                    <ListItem
                    key={i}
                    leftAvatar={{ source: { uri: constants.BASE_URL + contact.photo } }}
                    avatarStyle={{ width: 100, height: 100, backgroundColor: 'white'}}
                    title={contact.userName}
                    subtitle={contact.overview}
                    onPress={() => this.startChat(contact._id)}
                    bottomDivider
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
    contacts: contactsSelector
});

const mapDispatchToProps = {
    getContacts
};
  
const withConnect = connect(mapStateToProps, mapDispatchToProps);
  
export default compose(withConnect)(Notification);