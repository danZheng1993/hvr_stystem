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
});

const mapDispatchToProps = {
};
  
const withConnect = connect(mapStateToProps, mapDispatchToProps);
  
export default compose(withConnect)(Notification);
