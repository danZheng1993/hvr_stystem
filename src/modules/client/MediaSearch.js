import React from 'react';

import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';

import { connect } from 'react-redux';
import { withState,compose } from 'recompose';
import { createStructuredSelector } from 'reselect';

import { Button, Loader, RadioGroup, MediaList } from '../../components'
import { fonts, colors } from '../../styles';

import { searchMedia } from '../../redux/modules/media'
import { mediasSearchResultSelector, mediasloadingSelector, profileSelector } from '../../redux/selectors'

const status = ['关注', '热门', '最新']

class MediaSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected : 0
    }
  }

  componentWillMount() {
    const {searchMedia, profile, navigation} = this.props
    const selected = navigation.getParam('selected', 0)
    this.props.setRadioGroupsState({ ...this.props.radioGroupsState, 0: selected })
    this.setState({selected})
    searchMedia({
      body: {title: ''}
    })
  }

  handleClick = (index) => {
    this.props.setRadioGroupsState({ ...this.props.radioGroupsState, 0: index })
    this.setState({selected: index})
  }

  render() {    
    const {medias, loading} = this.props
    const {selected} = this.state
    return (
      <ScrollView style={styles.container}>
        <Loader loading={loading} />
        <View style={styles.componentsSection}>
          <RadioGroup
            style={styles.demoItem}
            items={['关注', '热门', '最新']}
            selectedIndex={this.props.radioGroupsState[0]}
            onChange={index => this.handleClick(index)}
          />
        </View>
        <MediaList medias={medias} navigation={this.props.navigation}/>
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
  medias: mediasSearchResultSelector,
  loading: mediasloadingSelector,
  profile: profileSelector
});

const mapDispatchToProps = {
  searchMedia
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect,    withState('radioGroupsState', 'setRadioGroupsState', [0, 0]))(MediaSearch);
