import React from 'react';
import {
  StyleSheet,
  View,
  Image,
} from 'react-native';
import {Text} from './StyledText'
import { colors } from '../styles';
import constants from '../constants';
import { TouchableRipple } from 'react-native-paper';

export default class Profile extends React.Component {
  render() {   
    const {user} = this.props
    return (
      <View >
        {user &&
          <View style = {styles.row}>
          <TouchableRipple onPress={() => this.props.navigation.navigate('BasicProfile', {update: 'photo'})}>
            <Image
              source={{uri: constants.BASE_URL + 'profileImage/' + (user.photo ? user.photo: 'default.png') + `?t=${new Date().toISOString()}`}}
              style={styles.photo}
            />
          </TouchableRipple>
            <View style={{justifyContent: 'center',}}>
              <Text white bold size={18}>{user.userName}</Text>
              <Text white size={12}>{user.overview.slice(0,15)}</Text>
            </View>
          </View>
        }
      </View>
    );
    }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row'
  },
  
  photo: {
    borderRadius: 50,
    borderColor: colors.gray,
    backgroundColor: colors.info,
    width: 70,
    height: 70
  },
});
