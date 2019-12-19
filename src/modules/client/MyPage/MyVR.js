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

import { getMyMedias } from '../../../redux/modules/media'
import { mediasSearchResultSelector , mediasloadingSelector,  profileSelector, myMediasSelector } from '../../../redux/selectors'


class MyVR extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentWillMount() {
    const {getMyMedias, profile, navigation} = this.props
    getMyMedias()
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
  medias: myMediasSelector,
  loading: mediasloadingSelector,
  profile: profileSelector
});

const mapDispatchToProps = {
  getMyMedias
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(MyVR);
