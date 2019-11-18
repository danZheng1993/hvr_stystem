import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import moment from 'moment'
import { fonts, colors } from '../styles';

export default class Profile extends React.Component {
  constructor(props) {
    super(props)
    
  }
  render() {   
    const url="http://192.168.31.207:4000/"
    const {user, navigation} = this.props
    return (
      <View style={styles.componentsSection}>
        <View style={styles.demoIconsContainer}>
          <Icon
            style={styles.demoIcon}
            name="bell"
            size={25}
            color="#5759CB"
          />
          <Icon
            style={styles.demoIcon}
            name="settings"
            size={25}
            color="#5759CB"
            onPress={() => navigation.navigate('Settings')}
          />
        </View>

        {user && <>
          <Image
            source={{uri: url + (user.photo ? user.photo: 'default.png')}}
            style={styles.photo}
          />
        <Text size={14}><Text>{user.userName}</Text></Text>
        <Text size={14}><Text>{user.overview}</Text></Text>
        </>
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
    borderRadius: 100,
    borderColor: colors.gray,
    backgroundColor: colors.info,
    width: 100,
    height: 100
  },
  demoIconsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
});
