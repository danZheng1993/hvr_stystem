import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

import { SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { Loader, UsersList, NoData, Text, BannersList} from '../../../components';
import { colors } from '../../../styles';
import { searchUser } from '../../../redux/modules/user'
import { usersloadingSelector, usersSearchResultSelector, bannersListSelector } from '../../../redux/selectors'

const iconLocation = require('../../../../assets/images/location.png');

class Providers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      location: '北京',
      search: ''
    }
  }

  componentWillMount() {
    const {searchUser} = this.props
    const {location} = this.state
    searchUser({
        body: {role: 'provider', location}
    })

  }

  chooseLocation = (location) => {
    this.setState({location})
    this.props.searchUser({
      body: {role: 'provider', location}
    })
  }

  render() {
    const {users, usersloading, banners} = this.props
    const {location} = this.state
    return (
      <>
      <View style={{flexDirection:'row', paddingRight: 20, backgroundColor: colors.secondary, paddingVertical: 10}}>
        <TouchableOpacity 
          style={{ justifyContent:"center", alignItems:"center", marginHorizontal: 10, flexDirection: 'row'}}
          onPress={() => this.props.navigation.navigate('Location',{chooseLocation: this.chooseLocation})}
          >
            <Image
              resizeMode="contain"
              source={iconLocation}
              style={{width:20, height: 20}}
            />
          <Text white>{location}</Text>
        </TouchableOpacity> 
        <View style={{flex: 4}}>
          <SearchBar
            containerStyle={{height: 30, borderWidth: 0, padding: 0, backgroundColor: colors.secondary, borderColor: colors.bluish,  borderBottomColor: 'transparent', borderTopColor: 'transparent'}}
            inputContainerStyle={{height: 30, backgroundColor: colors.white, borderWidth: 0, borderRadius: 15}}
            inputStyle={{fontSize: 12}}
            placeholder="请输入关键词"
            onFocus = {() => this.props.navigation.navigate('SearchBar')}
          />
        </View>
      </View>
      <Loader
        loading={usersloading} />
      <BannersList banners={banners} navigation={this.props.navigation} />
      <ScrollView style={styles.container}>
         {users.length? users.map((user, index) => (
           <View style={styles.componentsSection} key={index}>
             <UsersList user={user} navigation={this.props.navigation}/>
           </View>
         )): <NoData />}
      </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bluish,
    padding: 20
  },
  
  picker: {
    flexDirection: "row",
    justifyContent: 'space-between'
  },
  buttonsContainer: {
    alignSelf: 'stretch',
    margin: 20
  },
  button: {
    marginBottom: 20,
    alignSelf: 'stretch',
  },
  description: {
    padding: 20,
    marginBottom: 20,
    alignSelf: 'stretch'
  },
  input: {
    marginBottom: 15,
  },
  anchor: {
    flex: 1,
    flexDirection: "row",
  },
  inputWrap: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});


const mapStateToProps = createStructuredSelector({
  users: usersSearchResultSelector,
  usersloading: usersloadingSelector,
  banners: bannersListSelector
});

const mapDispatchToProps = {
  searchUser
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Providers);
