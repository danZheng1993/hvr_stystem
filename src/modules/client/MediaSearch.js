import React from 'react';
import { SearchBar } from 'react-native-elements';
import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';

import { connect } from 'react-redux';
import { withState,compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import _ from 'lodash'
import { Button, Loader, RadioGroup, MediaList, Text } from '../../components'
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

  
  searchContent = () => {
    const { searchMedia} = this.props
    const { search } = this.state
    searchMedia({
        body: {title: search},
    })
  }

  render() {    
    const {medias, loading, profile} = this.props
    const {selected} = this.state
    let sortedMedias = medias
    if (selected == 0)
      sortedMedias = medias.filter(media => (profile.collections.indexOf(media._id) !== -1))
    else if (selected == 1)
      sortedMedias =  _.orderBy(medias, 'visits', 'desc');
    else if (selected == 2) 
      sortedMedias =  _.orderBy(medias, 'created', 'desc');
    return (
      <>
        <View style={{flexDirection:'row', paddingRight: 100, paddingLeft: 20, backgroundColor: colors.secondary, paddingTop: 10}}>
          <View style={{flex: 4}}>
            <SearchBar
                containerStyle={{height: 30, padding: 0, backgroundColor: colors.secondary, borderColor: colors.bluish,  borderBottomColor: 'transparent', borderTopColor: 'transparent'}}
                inputContainerStyle={{height: 30, backgroundColor: colors.white, borderWidth: 0, borderTopLeftRadius: 15, borderBottomLeftRadius: 15, padding: 5,  borderRightColor: colors.black, borderRightWidth: 1,}}
                inputStyle={{padding: 5}}
                placeholder="关键词"
                onChangeText={search => this.setState({ search })}
                value={this.state.search}
            />
          </View>
          <View style={{flex: 1, marginTop: 1, justifyContent:"center", alignItems:"center", backgroundColor: colors.white,  borderTopRightRadius: 15, borderBottomRightRadius: 15}}>
              <Text color={colors.secondary} onPress = {() => this.searchContent()}>搜索</Text>
          </View>
        </View>
        <View style={styles.componentsSection}>
          <RadioGroup
            items={['关注', '热门', '最新']}
            selectedIndex={this.props.radioGroupsState[0]}
            onChange={index => this.handleClick(index)}
            underline
          />
        </View>
        <ScrollView style={styles.container}>
          <Loader loading={loading} />
          <MediaList medias={sortedMedias} navigation={this.props.navigation}/>
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  componentsSection: {
    backgroundColor: colors.secondary,
    padding: 5,
    height: 50
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
