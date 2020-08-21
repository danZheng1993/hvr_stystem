import { ListItem } from 'react-native-elements'
import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '../styles';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { messageSelector} from '../redux/selectors'

class SystemNotification extends React.Component {

    clearItems = () => {

    }

    render () {
        const {messages} = this.props
        return (
            <View style={styles.container}>
                {messages.length ? messages.map((message, index) => (
                    <ListItem
                        key={index}
                        title= {message.message}
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
    messages: messageSelector
});

const mapDispatchToProps = {
};
  
const withConnect = connect(mapStateToProps, mapDispatchToProps);
  
export default compose(withConnect)(SystemNotification);
