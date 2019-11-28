import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';

import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import Icon from 'react-native-vector-icons/Entypo'
import constants from '../../../constants'
import { Button, Loader, UsersList, NoData,  } from '../../../components';
import { fonts, colors } from '../../../styles';
import { SliderBox } from 'react-native-image-slider-box';
import user, { searchUser } from '../../../redux/modules/user'
import { usersloadingSelector, usersSearchResultSelector, bannersListSelector } from '../../../redux/selectors'

class Providers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bannerImages: [],
      location: ''
    }
  }

  componentWillMount() {
    const {searchUser, banners} = this.props

    let bannerImages = []
    banners && banners.map((banner, index) => {
      typeof(banner) == 'object' && bannerImages.push(constants.BANNER_BASE_URL + banner.image)
    })
    this.setState({bannerImages})
    searchUser({
        body: {role: 'provider'}
    })

  }

  chooseLocation = (location) => {
    this.setState({location})
  }
  render() {
    const {users, usersloading} = this.props
    const {bannerImages, location} = this.state
    return (
      <>
      <View style={{ height: 50, flexDirection: "row" }}>
        <TouchableOpacity 
          style={{ justifyContent:"center", alignItems:"center", marginHorizontal: 10}}
          onPress={() => this.props.navigation.navigate('Location',{chooseLocation: this.chooseLocation})}
          >
          <Icon name="location" size={30} color="black" />
          <Text>{location}</Text>
        </TouchableOpacity>   
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text size={28}>
            接单列表
          </Text> 
        </View>
      </View>
      <ScrollView style={styles.container}>
         <Loader
          loading={usersloading} />
            <SliderBox
              images={bannerImages}
              onCurrentImagePressed={index =>
                  console.warn(`image ${index} pressed`)
              }
            />
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
    paddingHorizontal: 15,
    paddingTop: 20,
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
  componentsSection: {
    backgroundColor: colors.white,
    padding: 15,
    marginBottom: 20,
    borderRadius: 5,
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
