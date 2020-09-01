import React from 'react';

import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';

import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';

import { MediaList, NoData, UsersList, NewsList } from '../components'
import { colors } from '../styles';
import { mediasSearchResultSelector, usersSearchResultSelector, newsSearchResultSelector } from '../redux/selectors'


class SearchResult extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      type: ''
    }
  }

  componentWillMount() {
    const { route } = this.props
    const { type = '' } = route.params || {};
    this.setState({type})
  }

  render() {    
    const {type} = this.state
    const {medias, users, news} = this.props
    return (
      <ScrollView style={[styles.container, type == 'news' && {backgroundColor: colors.white}]}>
        {type == 'media' &&
          (medias.length ? <MediaList medias={medias}/>: <NoData />)}
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
            ? <NewsList news={news} />
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
