import React from 'react';
import { SearchBar } from 'react-native-elements';
import {
  StyleSheet,
  View,
  ScrollView,
  Platform,
} from 'react-native';

import { connect } from 'react-redux';
import { withState,compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import _ from 'lodash'
import { Loader, RadioGroup, MediaList, Text, Bell } from '../../components'
import { colors } from '../../styles';

import { searchMedia } from '../../redux/modules/media'
import { mediasSearchResultSelector, mediasloadingSelector, profileSelector } from '../../redux/selectors'
import { isIphoneX } from '../../helpers';

const status = ['关注', '热门', '最新']

class MediaSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected : 0
    }
  }

  componentWillMount() {
    const {searchMedia, profile, route} = this.props
    const { selected = 0 } = route.params || {};
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
        <View style={{flexDirection:'row', paddingHorizontal: 20, backgroundColor: colors.secondary, paddingTop: Platform.OS === 'ios' ? isIphoneX() ? 48 : 25 : 15}}>
          <View style={{flex: 4}}>
            <SearchBar
                containerStyle={{height: 30, padding: 0, backgroundColor: colors.secondary, borderColor: colors.bluish,  borderBottomColor: 'transparent', borderTopColor: 'transparent'}}
                inputContainerStyle={{height: 30, backgroundColor: colors.white, borderWidth: 0, borderTopLeftRadius: 15, borderBottomLeftRadius: 15, borderTopRightRadius: 0, borderBottomRightRadius: 0}}
                inputStyle={{fontSize: 12}}
                placeholder="关键词"
                onChangeText={search => this.setState({ search })}
                value={this.state.search}
            />
          </View>
          <View style={{flex: 1, marginTop: 1, justifyContent:"center", alignItems:"center", backgroundColor: colors.white,  borderTopRightRadius: 15, borderBottomRightRadius: 15}}>
              <Text color={colors.secondary} style={{borderLeftColor: colors.gray, borderLeftWidth: 1, paddingHorizontal: 10}} onPress = {() => this.searchContent()}>搜索</Text>
          </View>
          <View style={{flex: 1, alignItems :"flex-end", justifyContent: 'center'}}>
            <Bell navigation={this.props.navigation}/>
          </View>
        </View>
        <View style={styles.componentsSection}>
          <View style={{width: '50%', height: 20}}>
            <RadioGroup
              items={['关注', '热门', '最新']}
              selectedIndex={this.props.radioGroupsState[0]}
              onChange={index => this.handleClick(index)}
              noline
              size={14}
            />
          </View>
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
    justifyContent: 'center',
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

export default compose(withConnect, withState('radioGroupsState', 'setRadioGroupsState', [0, 0]))(MediaSearch);
