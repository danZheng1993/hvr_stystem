import { ListItem } from 'react-native-elements'
import { View, Text } from 'react-native'
import React, {Component} from 'react'
import {Button} from '../components'

import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { NavigationActions } from 'react-navigation'

const resetAction = () => NavigationActions.reset({
  index: 1,
  actions: [
    NavigationActions.navigate({ routeName: 'Auth'}),
  ]
})
import {logout} from '../redux/modules/auth'

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
            this.setState({notification: res.split(',')})
        })
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

    render () {
        const {notification} = this.state
        return (
            <View>
                {notification.length ? notification.map((notificationItem, index) => (
                    <ListItem
                        key={index}
                        title= {notificationItem}
                        hideChevron={false}
                        // onPress = {() => props.navigation.navigate('PersonalInformation')}
                        bottomDivider
                    />
                )) : <Text>No Items to display</Text> 
                }
                <Button
                    large
                    caption="Clear Items"
                    onPress={() => this.clearItems()}
                />
            </View>
        )
    }
}

const mapStateToProps = createStructuredSelector({
});

const mapDispatchToProps = {
    logout,
};
  
const withConnect = connect(mapStateToProps, mapDispatchToProps);
  
export default compose(withConnect)(Notification);
