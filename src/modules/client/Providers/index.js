import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Picker,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import moment from 'moment'
import { Button, Loader, UsersList,  } from '../../../components';
import { fonts, colors } from '../../../styles';

import { searchUser } from '../../../redux/modules/user'

import {  usersListSelector, usersloadingSelector } from '../../../redux/selectors'

class Providers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }
  componentWillMount() {
    const {searchUser} = this.props
    searchUser({
        body: {role: 'provider'}
    })
  }
  handleClick = () => {
   
  };

  render() {
    
    // const {types, typesloading, scenes, scenesLoading, services, servciesLoading, subcategories, subcategorysloading} = this.props
    const {users, usersloading} = this.props
    console.log(users)
    return (
      <ScrollView style={styles.container}>
        <View style={styles.description}>
         { <Loader
          loading={usersloading} /> }
         <UsersList users={users} />
         </View>
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
  users: usersListSelector,
  usersloading: usersloadingSelector,
});

const mapDispatchToProps = {
  searchUser
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Providers);
