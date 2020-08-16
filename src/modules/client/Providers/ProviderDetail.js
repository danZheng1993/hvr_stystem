import React from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Linking,
  Image,
  Platform,
  TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux';
import { compose, withState } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { Button, Loader, RadioGroup, Text, toast, GoBack} from '../../../components';
import { colors } from '../../../styles';
import { addToAttentions } from '../../../redux/modules/auth'
import { searchMedia } from '../../../redux/modules/media'
import { getFeedback } from '../../../redux/modules/job'
import { mediasloadingSelector, mediasSearchResultSelector, jobsloadingSelector, jobsFeedbackSelector, profileSelector} from '../../../redux/selectors'
import ProviderWorks from './ProviderWorks';
import ProviderFeedbacks from './ProviderFeedbacks';
import constants from '../../../constants'

const iconPhone = require('../../../../assets/images/phone.png')

class ProviderDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      select: 0,
      user: null
    }
  }

  componentWillMount() {
    const {getFeedback, searchMedia} = this.props
    let { user } = this.props.route.params;
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
    const {medias, feedbacks, loading, profile} = this.props
    const {select, user} = this.state
    const attentions =  profile.attentions || []
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
            <View style={{flexDirection: 'row'}}>
              <GoBack navigation={this.props.navigation} color={colors.white} />
              <View style = {{flexDirection: 'row'}}>
                <Image
                  source={{uri: constants.BASE_URL + (user.photo ? user.photo: 'default.png')}}
                  style={styles.photo}
                />
                <View style={{justifyContent: 'center',}}>
                  <Text white bold size={18}>{user.userName}</Text>
                  <Text white size={14}>{user.location} \ 粉丝数 {user.balance}</Text>
                </View>
              </View>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              { attentions.indexOf(user._id) == -1
                  ? <Text onPress={() => this.handleAttentions(user._id)} white>+关注</Text>
                  : <Text white>已关注</Text>
              }
            </View>
          </View>
          <View style={{justifyContent: 'space-around', flexDirection: 'row'}}>
            <View style={{alignItems: 'center'}}>
              <Text white bold size={24}>{user.contacts.length}</Text>
              <Text white size={14}>服务用户</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text white bold size={24}>{medias.length}</Text>
              <Text white size={14}>发布视频</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text white bold size={24}>{user.balance}</Text>
              <Text white size={14}>播放数量</Text>
            </View>
          </View> 
          </View>
        </ImageBackground>
      <View style={styles.container}>
        <Loader
          loading={loading} /> 
        <View style={{flexBasis: 1, flexGrow: 1}}>
          <View style={{height: 50, backgroundColor: colors.white}}>
            <RadioGroup
              underline
              size={18}
              lightTheme
              items={['发布视频', '用户评价']}
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
          <View style={{flex: 1}}></View>
          <TouchableOpacity 
            style={{flex: 1, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', height: 30, borderTopLeftRadius: 5, borderBottomLeftRadius: 5}}   
            onPress={() => this.props.navigation.navigate('PostJob', {hired: user._id})}
          >
            <Text white bold>约 拍</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={{flex: 1, backgroundColor: colors.bluish, alignItems: 'center', justifyContent: 'center', height: 30, borderTopRightRadius: 5, borderBottomRightRadius: 5}}   
            onPress={() => this.props.navigation.navigate('Chatting', {to: user._id})}
          >
            <Text color={colors.primary} bold>在线沟通</Text>
          </TouchableOpacity>
          <Button
            style={{flex: 1}}
            small
            size={28}
            icon={iconPhone}
            bgColor={colors.secondary}
            caption="电话"
            onPress={() => {this.dialCall(user.phoneNumber)}}
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
    padding: 10,
    backgroundColor: colors.secondary
  },

  photo: {
    borderRadius: 50,
    marginRight: 10,
    borderColor: colors.gray,
    backgroundColor: colors.info,
    width: 70,
    height: 70
  },
});


const mapStateToProps = createStructuredSelector({
  loading: jobsloadingSelector || mediasloadingSelector,
  feedbacks: jobsFeedbackSelector,
  medias: mediasSearchResultSelector,
  profile: profileSelector,
});

const mapDispatchToProps = {
  addToAttentions,
  searchMedia,
  getFeedback
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect,   withState('radioGroupsState', 'setRadioGroupsState', [0, 0]),)(ProviderDetail);
