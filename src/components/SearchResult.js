import React from 'react';

import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';

import { connect } from 'react-redux';
import { withState,compose } from 'recompose';
import { createStructuredSelector } from 'reselect';

import { Button, Loader, MediaList, RadioGroup, NoData, UsersList } from '../components'
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
      <ScrollView style={styles.container}>
        {type == 'media' &&
          (medias.length ? <MediaList medias={medias} navigation={this.props.navigation}/>: <NoData />)}
        {type == 'user' &&
          (users.length ? 
            users.map((user, index) => (
              <UsersList user={user} navigation={this.props.navigation} key={index} />
            )) : <NoData />)}
        {type == 'news' && 
          (news.length ? news.map((l, i) => (
            typeof(l) == "object" &&
            <ListItem
              key={i}
              rightAvatar={{ source: { uri: constants.NEWS_BASE_URL + l.image } }}
              avatarStyle={{ width: 100, height: 100, backgroundColor: 'white'}}
              title={l.title}
              subtitle={l.content}
              bottomDivider
            />
        )) : <NoData />)
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    paddingTop: 20,
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
