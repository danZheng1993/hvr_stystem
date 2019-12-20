import React from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Linking,
  Platform
} from 'react-native';

import { connect } from 'react-redux';
import { compose, withState } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { Button, Loader, Profile, RadioGroup, Text, toast} from '../../../components';
import { fonts, colors } from '../../../styles';

import { getUser } from '../../../redux/modules/user'
import { addToAttentions } from '../../../redux/modules/auth'
import { searchMedia } from '../../../redux/modules/media'
import { getFeedback } from '../../../redux/modules/job'
import { mediasloadingSelector, mediasSearchResultSelector, jobsloadingSelector, jobsFeedbackSelector} from '../../../redux/selectors'
import ProviderWorks from './ProviderWorks';
import ProviderFeedbacks from './ProviderFeedbacks';

class ProviderDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      select: 0,
      user: null
    }
  }

  handleClick =() => {

  }

  componentWillMount() {
    const {getFeedback, searchMedia, navigation} = this.props
    let user = navigation.getParam('user', null)
    if (user) {
      this.setState({user})
      getFeedback({
        body: {hired: user._id}
      })
      searchMedia({
        body: {creator: user._id}
      })
    }
  }

  dialCall = (number) => {
    let phoneNumber = '';
    if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
    else {phoneNumber = `telprompt:${number}`; }
    Linking.openURL(phoneNumber);
  };

  handleSelect = (index) => {
    this.props.setRadioGroupsState({ ...this.props.radioGroupsState, 1: index })
    this.setState( {select: index} )
  }

  handleAttentions = (id) => {
    this.props.addToAttentions({
      body: {attention: id},
      success: () => toast('成功!'),
      fail: ()=> toast('失败')
    })
  }
  render() {
    const {medias, feedbacks, loading} = this.props
    const {select, user} = this.state
    if (!user) return (<></>)
    return (
      <>
      <ImageBackground
          source={require('../../../../assets/images/profileBackground.png')}
          style={{
            width: '100%'}}
          resizeMode="cover"
        >
        <View style={{padding: 15}}>
          <View style={{flexDirection: 'row', justifyContent: "space-between"}}>
            <Profile user = {user} navigation={this.props.navigation} />
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text onPress={() => this.handleAttentions(user._id)} white>+关注</Text>
            </View>
          </View>
          <View style={{justifyContent: 'space-around', flexDirection: 'row'}}>
            <View style={{alignItems: 'center'}}>
              <Text white bold size={28}>{user.contacts.length}</Text>
              <Text white>服务用户数</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text white bold size={28}>{medias.length}</Text>
              <Text white>项目作品</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text white bold size={28}>{user.balance}</Text>
              <Text white>播放数量</Text>
            </View>
          </View> 
          </View>
        </ImageBackground>
      <View style={styles.container}>
        <Loader
          loading={loading} /> 
        <View style={{flexBasis: 1, flexGrow: 1}}>
          <View style={{height: 50, backgroundColor: colors.secondary}}>
            <RadioGroup
              underline
              items={['项目作品', '雇主评价']}
              selectedIndex={this.props.radioGroupsState[1]}
              onChange={index => this.handleSelect(index)}
            />
            </View>
          <View style={{flexBasis: 1, flexGrow: 1}}>
          {(select) ?
            <ProviderFeedbacks feedbacks={feedbacks} navigation={this.props.navigation}/> : <ProviderWorks medias={medias} navigation={this.props.navigation}/>
          }
          </View>
        </View>
        <View style={styles.buttonsContainer}>
        <Button
          small
          bgColor={colors.primary}
          style={styles.button}
          caption="在线沟通"
          onPress={() => this.props.navigation.navigate('Chatting', {to: user._id})}
        />
        <Button
          small
          bgColor={colors.primary}
          style={styles.button}
          caption="电话"
          onPress={() => {this.dialCall(user.phoneNumber)}}
        />
        <Button
          small
          bgColor={colors.primary}
          style={styles.button}
          caption="约拍"
          onPress={() => this.props.navigation.navigate('PostJob', {hired: user._id})}
        />
            
        </View>
      </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  
  buttonsContainer: {
    alignItems: 'flex-end',
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: colors.secondary
  },
});


const mapStateToProps = createStructuredSelector({
  loading: jobsloadingSelector || mediasloadingSelector,
  feedbacks: jobsFeedbackSelector,
  medias: mediasSearchResultSelector,
});

const mapDispatchToProps = {
  addToAttentions,
  searchMedia,
  getFeedback
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect,   withState('radioGroupsState', 'setRadioGroupsState', [0, 0]),)(ProviderDetail);
