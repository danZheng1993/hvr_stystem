import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image
} from 'react-native';
import moment from 'moment'
import { fonts, colors } from '../styles';

export default class Profile extends React.Component {
  constructor(props) {
    super(props)
    
  }
  render() {   
    const {user, navigation} = this.props
    return (
      <View style={styles.componentsSection}>
        {user.photo ? 
          <Image
            source={{ uri: photo.uri }}
            style={styles.photo}
          /> :
          <Image
            source={require('../../assets/images/takePhoto.png')}
            style={styles.photo}
          />
          }
        <Text size={14}><Text>{user.userName}</Text></Text>
        <Text size={14}><Text>{user.description}</Text></Text>
        {/* <Text size={14}><Text>{user.photo}</Text></Text>
        <Text size={14}><Text>{user.location}</Text></Text>
        <Text size={14}><Text>{user.overview}</Text></Text>
        <Text size={14}><Text>¥{user.balance}</Text></Text> */}
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
