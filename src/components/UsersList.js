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
import NoData from './NoData';
import Profile from './Profile'
export default class UsersList extends React.Component {
  constructor(props) {
    super(props)
    
  }
  render() {   
    const {user, navigation} = this.props
    console.log(user)
    return (
        <View>          
         {user ? 
          <TouchableRipple onPress={() => navigation.navigate('ProviderDetail', {id: user._id})}>
            <Profile user={user} />
          </TouchableRipple>
          : <NoData />}
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
