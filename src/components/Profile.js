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


        {user && <>
          <View style = {styles.row}>
            <Image
              source={{uri: url + (user.photo ? user.photo: 'default.png')}}
              style={styles.photo}
            />
            <View style={{justifyContent: 'center',}}>
              <Text size={14}><Text>{user.userName}</Text></Text>
              <Text size={14}><Text>{user.overview}</Text></Text>
            </View>
            <View style={styles.demoIconsContainer}>
              <Icon
                style={styles.demoIcon}
                name="bell"
                size={30}
                color="#5759CB"
                onPress={() => navigation.navigate('Notification')}
              />
              <Icon
                style={styles.demoIcon}
                name="settings"
                size={30}
                color="#5759CB"
                onPress={() => navigation.navigate('Settings')}
              />
            </View>
          </View>
          <View style={{justifyContent: 'space-around', flexDirection: 'row'}}>
            <View style={{alignItems: 'center'}}>
              <Text>39</Text>
              <Text>我的收藏</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text>45</Text>
              <Text>我的关注</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text>4</Text>
              <Text>我的VR</Text>
            </View>
          </View>
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
  demoIconsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
});
