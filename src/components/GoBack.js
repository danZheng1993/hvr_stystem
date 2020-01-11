import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'
import { colors, fonts } from '../styles';
export default  goBack = (props) => {
    return (
      <Icon
        name='angle-left'
        color={props.color || colors.secondary}
        size={30}
        style={{alignSelf: 'center', marginRight: 10}}
        onPress = {() => props.navigation.goBack()}
      />
    );
}