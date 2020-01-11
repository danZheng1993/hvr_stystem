import React from 'react';

import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';

import { connect } from 'react-redux';
import { withState,compose } from 'recompose';
import { createStructuredSelector } from 'reselect';

import { Button, Loader, MediaList, RadioGroup, NoData, UsersList, NewsList } from '../components'
import {ListItem} from 'react-native-elements'
import { fonts, colors } from '../styles';
import constants from '../constants'
import { searchMedia } from '../redux/modules/media'
import { mediasSearchResultSelector , mediasloadingSelector,  profileSelector, usersSearchResultSelector, newsSearchResultSelector } from '../redux/selectors'


class SearchResult extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      type: ''
    }
  }

  componentWillMount() {
    const {navigation} = this.props
    let type = navigation.getParam('type', '')
    this.setState({type})
  }

  render() {    
    const {type} = this.state
    const {medias, users, news, loading} = this.props
    return (
      <ScrollView style={[styles.container, type == 'news' && {backgroundColor: colors.white}]}>
        {type == 'media' &&
          (medias.length ? <MediaList medias={medias} navigation={this.props.navigation}/>: <NoData />)}
        {type == 'user' &&
          (users.length ? 
            <View style={{padding: 10}}>
              {users.map((user, index) => (
                <UsersList user={user} navigation={this.props.navigation} key={index} />
              ))}
            </View>
            : <NoData />)}
        {type == 'news' && 
          (news.length
            ? <NewsList news={news} navigation={this.props.navigation} />
            : <NoData />)
         }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bluish,
  },
});


const mapStateToProps = createStructuredSelector({
  medias: mediasSearchResultSelector,
  users: usersSearchResultSelector,
  news: newsSearchResultSelector,
});

const mapDispatchToProps = {
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(SearchResult);
