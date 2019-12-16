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

export default class Profile extends React.Component {
  constructor(props) {
    super(props)
    
  }
  render() {   
    const url="http://192.168.0.207:4000/"
    const {user, navigation} = this.props
    return (
      <View >
        {user &&
          <View style = {styles.row}>
            <Image
              source={{uri: url + (user.photo ? user.photo: 'default.png')}}
              style={styles.photo}
            />
            <View style={{justifyContent: 'center',}}>
              <Text white bold size={18}>{user.userName}</Text>
              <Text white size={14}>{user.overview}</Text>
            </View>
          </View>
        }
      </View>
    );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bluish,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  row: {
    flexDirection: 'row'
  },

  description: {
    padding: 20,
    marginBottom: 20,
    alignSelf: 'stretch'
  },

  componentsSection: {
    backgroundColor: colors.white,
    padding: 15,
    marginBottom: 20,
    borderRadius: 5,
  },
  photo: {
    borderRadius: 50,
    borderColor: colors.gray,
    backgroundColor: colors.info,
    width: 70,
    height: 70
  },
});
