import React from 'react';

import {
  StyleSheet,
  View,
  ScrollView,
  Text
} from 'react-native';

import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';

import { Loader, UsersList, NoData } from '../../../components'
import { colors } from '../../../styles';

import { searchUser } from '../../../redux/modules/user'
import { removeFromAttentions } from '../../../redux/modules/auth'
import { removeAttention } from '../../../redux/modules/user'
import { usersSearchResultSelector , usersloadingSelector,  profileSelector } from '../../../redux/selectors'


class MyAttention extends React.Component {
  
  componentWillMount() {
    const {searchUser, profile} = this.props
    searchUser({
      body: {attentions: profile.attentions}
    })
  }

  handleCancel = (id) => {
    this.props.removeFromAttentions({
      body: {attention: id},
      success: () => this.props.removeAttention({id})
    })

  }

  render() {    
    const {users, loading} = this.props
    console.log("attentions", users)
    return (
      <ScrollView style={styles.container}>
        <Loader loading={loading} />
        {users.length ? users.map((user, index) => (
          <View style={styles.componentsSection} key={index}>
            <UsersList user={user} navigation={this.props.navigation}/>
            <Text onPress={() => this.handleCancel(user._id)}>取消关注</Text>
          </View>
        ))  : <NoData />}
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
  componentsSection: {
    backgroundColor: colors.white,
    padding: 15,
    marginBottom: 20,
    borderRadius: 5,
  },
});


const mapStateToProps = createStructuredSelector({
  users: usersSearchResultSelector,
  loading: usersloadingSelector,
  profile: profileSelector
});

const mapDispatchToProps = {
  searchUser,
  removeFromAttentions,
  removeAttention
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(MyAttention);
