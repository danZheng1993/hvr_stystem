import React from 'react';

import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';

import { connect } from 'react-redux';
import { withState,compose } from 'recompose';
import { createStructuredSelector } from 'reselect';

import { Button, Loader, MediaList, RadioGroup, NoData } from '../../../components'
import { fonts, colors } from '../../../styles';

import { searchMedia } from '../../../redux/modules/media'
import { mediasSearchResultSelector , mediasloadingSelector,  profileSelector } from '../../../redux/selectors'


class MyCollection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentWillMount() {
    const {searchMedia, profile, navigation} = this.props
    searchMedia({
      body: {collections: profile.collections}
    })
  }

  render() {    
    const {medias, loading} = this.props
    return (
      <ScrollView style={styles.container}>
        <Loader loading={loading} />
        {medias ? <MediaList medias={medias} navigation={this.props.navigation}/>: <NoData />}
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
});


const mapStateToProps = createStructuredSelector({
  medias: mediasSearchResultSelector,
  loading: mediasloadingSelector,
  profile: profileSelector
});

const mapDispatchToProps = {
  searchMedia
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(MyCollection);
