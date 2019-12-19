import { ListItem } from 'react-native-elements'
import { View } from 'react-native'
import React, {Componet} from 'react'
import {Button} from '../../components'
import colors from '../../styles/colors'
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { NavigationActions } from 'react-navigation'
import {logout} from '../../redux/modules/auth'
import { clearItem } from '../../redux/api/storage'
import XMPP from 'react-native-xmpp'
const settings = props => {
    clearStorage = ()=> {
        clearItem().then(() => {
            XMPP.disconnect()
            props.logout(props.navigation.reset([NavigationActions.navigate({ routeName: 'Auth' })], 0))
        })
    }
    return (
        <View style={{justifyContent: 'space-between', flex: 1, backgroundColor: colors.bluish}}>
            <View style={{ backgroundColor: colors.white, paddingHorizontal: 15, margin: 20,borderRadius: 5}}>
                <ListItem
                    key={1}
                    titleStyle = {{color: colors.secondary, fontWeight: 'bold', fontSize: 18}}
                    title='个人资料设置'
                    hideChevron={false}
                    chevron={{ color: colors.secondary }}
                    onPress = {() => props.navigation.navigate('PersonalInformation')}
                    bottomDivider
                />
                <ListItem
                    key={2}
                    title='账户安全'
                    chevron={{ color: colors.secondary }}
                    titleStyle = {{color: colors.secondary, fontWeight: 'bold', fontSize: 18}}
                    hideChevron={false}
                    onPress = {() => props.navigation.navigate('Security')}
                    bottomDivider
                />
                <ListItem
                    key={3}
                    title='清除缓存'
                    titleStyle = {{color: colors.secondary, fontWeight: 'bold', fontSize: 18}}
                    hideChevron={false}
                    chevron={{ color: colors.secondary }}
                />
            </View>
            <Button
                large
                caption="退出登录"
                onPress={() => clearStorage()}
            />
        </View>
    )
}

const mapStateToProps = createStructuredSelector({
});

const mapDispatchToProps = {
    logout,
};
  
const withConnect = connect(mapStateToProps, mapDispatchToProps);
  
export default compose(withConnect)(settings);
