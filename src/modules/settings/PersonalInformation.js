import { ListItem } from 'react-native-elements'
import { View } from 'react-native'
import React from 'react'
import colors from '../../styles/colors'
const PersonalInformation = props => {
    return (
        <View style={{backgroundColor: colors.bluish, flex: 1}}>
            <View style={{ backgroundColor: colors.white, paddingHorizontal: 15, margin: 20,borderRadius: 5}}>
                <ListItem
                    key={1}
                    titleStyle = {{color: colors.secondary, fontWeight: 'bold', fontSize: 18}}
                    title='头像'
                    hideChevron={false}
                    chevron={{ color: colors.secondary }}
                    onPress = {() => props.navigation.navigate('BasicProfile',{update: 'photo'})}
                    bottomDivider
                />
                <ListItem
                    key={2}
                    title='昵称'
                    chevron={{ color: colors.secondary }}
                    titleStyle = {{color: colors.secondary, fontWeight: 'bold', fontSize: 18}}
                    hideChevron={false}
                    onPress = {() => props.navigation.navigate('BasicProfile', {update: 'userName'})}
                    bottomDivider
                />
                <ListItem
                    key={3}
                    title='服务简介'
                    titleStyle = {{color: colors.secondary, fontWeight: 'bold', fontSize: 18}}
                    onPress = {() => props.navigation.navigate('BasicProfile', {update: 'overview'})}
                    hideChevron={false}
                    chevron={{ color: colors.secondary }}
                />
            </View>
        </View>
    )
}

export default PersonalInformation