import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text
} from 'react-native';
import moment from 'moment'
import { fonts, colors } from '../styles';
import { TouchableRipple } from 'react-native-paper';

export default class UsersList extends React.Component {
  constructor(props) {
    super(props)
    
  }
  render() {   
    const {users, navigation} = this.props
    console.log(users)
    return (
        <ScrollView>          
         {users && users.map((user, index) => (
          <TouchableRipple key={index} onPress={() => navigation.navigate('ProvidersView', {id: user._id})}>
            <View style={styles.componentsSection} >
              <Text size={14}>订单信息:<Text>{user.userName}</Text></Text>
              <Text size={14}>订单编号:<Text>{user.overview}</Text></Text>
              <Text size={14}>拍摄城市:<Text>{user.location}</Text></Text>
              </View>
          </TouchableRipple>
         ))}
         </ScrollView>
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
});
