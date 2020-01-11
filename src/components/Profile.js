import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {Text} from './StyledText'
import moment from 'moment'
import { fonts, colors } from '../styles';
import constants from '../constants';

export default class Profile extends React.Component {
  constructor(props) {
    super(props)
    
  }
  render() {   
    const {user, navigation} = this.props
    return (
      <View >
        {user &&
          <View style = {styles.row}>
            <Image
              source={{uri: constants.BASE_URL + (user.photo ? user.photo: 'default.png')}}
              style={styles.photo}
            />
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
