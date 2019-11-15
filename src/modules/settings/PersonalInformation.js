import { ListItem } from 'react-native-elements'
import { View } from 'react-native'
import React, {Componet} from 'react'

const PersonalInformation = props => {
    return (
        <View>
            <ListItem
                key={1}
                title='头像'
                hideChevron={false}
                onPress = {() => props.navigation.navigate('BasicProfile',{update: 'photo'})}
                bottomDivider
            />
            <ListItem
                key={2}
                title='昵称'
                hideChevron={false}
                onPress = {() => props.navigation.navigate('BasicProfile', {update: 'userName'})}
                bottomDivider
            />
            <ListItem
                key={3}
                title='服务简介'
                hideChevron={false}               
                onPress = {() => props.navigation.navigate('BasicProfile', {update: 'overview'})}
                bottomDivider
            />
        
        </View>
    )
}

export default PersonalInformation