import { ListItem } from 'react-native-elements'
import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '../styles';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { notificationsSelector} from '../redux/selectors'

class SystemNotification extends React.Component {

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
                )) : <Text>暂无消息</Text> 
                }
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
})
const mapStateToProps = createStructuredSelector({
    notification: notificationsSelector
});

const mapDispatchToProps = {
};
  
const withConnect = connect(mapStateToProps, mapDispatchToProps);
  
export default compose(withConnect)(SystemNotification);
