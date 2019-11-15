import { ListItem } from 'react-native-elements'
import { View } from 'react-native'
import React, {Componet} from 'react'
import {Button} from '../../components'

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
import {logout} from '../../redux/modules/auth'
import deviceStorage from '../../redux/api/storage'
const settings = props => {
    return (
        <View>
            <ListItem
                key={1}
                title='个人资料设置'
                hideChevron={false}
                onPress = {() => props.navigation.navigate('PersonalInformation')}
                bottomDivider
            />
            <ListItem
                key={2}
                title='账户安全'
                hideChevron={false}
                onPress = {() => props.navigation.navigate('PasswordRecovery')}
                bottomDivider
            />
            <ListItem
                key={3}
                title='清除缓存'
                hideChevron={false}
                bottomDivider
            />
                <Button
                    large
                    caption="退出登录"
                    onPress={() => props.logout(props.navigation.navigate('Auth'))}
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
