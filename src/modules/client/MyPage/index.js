import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, ImageBackground, Image, Platform } from 'react-native';
import { colors, fonts } from '../../../styles';
import { ListItem } from 'react-native-elements'
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { Profile, Text, Bell } from '../../../components';
import {sum, values} from 'lodash'
import {getMyMedias} from '../../../redux/modules/media'
import { profileSelector, unreadMessagesSelector, myMediasSelector } from '../../../redux/selectors'
import constants from '../../../constants';
import { isIphoneX } from '../../../helpers';

const iconBidding = require('../../../../assets/images/bidding.png');
const iconSetting = require('../../../../assets/images/setting.png');
const iconPaying = require('../../../../assets/images/paying.png');
const iconWaiting = require('../../../../assets/images/waiting.png');
const iconTesting = require('../../../../assets/images/testing.png');
const iconFeedback = require('../../../../assets/images/feedback.png');

class MyPage extends React.Component {

  componentWillMount() {
    this.props.getMyMedias()
  }

  render () {
    const {profile, unread, medias} = this.props
    const jobStatus = [
      {title: '竞标中', icon: iconBidding},
      {title: '待付款', icon: iconPaying},
      {title: '待拍摄', icon: iconWaiting},
      {title: '待验收', icon: iconTesting},
      {title: '评价', icon: iconFeedback},
    ]
    const collectionlength = profile ? profile.collections.length: 0
    const attentionlength = profile ? profile.attentions.length: 0
    return (
      <>
      <ImageBackground
          source={require('../../../../assets/images/profileBackground.png')}
          style={{ width: '100%', paddingTop: Platform.OS === 'ios' ? isIphoneX() ? 48 : 25 : 15 }}
          resizeMode="cover"
      >
        <View style={styles.headerContainer}>
          <View style={{flexDirection: 'row'}}>
            <Profile user = {profile} navigation={this.props.navigation} />
            <View style={styles.settingsContainer}>
              <Bell navigation={this.props.navigation}/>
              <TouchableOpacity style={{marginLeft: 10}} onPress={() => this.props.navigation.navigate('Settings')}>
                <Image
                  resizeMode="cover"
                  source={iconSetting}
                  style={{width:20, height: 20}}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{justifyContent: 'space-around', flexDirection: 'row'}}>
            <TouchableOpacity style={{alignItems: 'center'}} onPress={() => this.props.navigation.navigate('MyCollection')}>
              <Text white bold size={28}>{collectionlength}</Text>
              <Text white>我的收藏</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{alignItems: 'center'}}  onPress={() => this.props.navigation.navigate('MyAttention')}>
              <Text white bold size={28}>{attentionlength}</Text>
              <Text white>我的关注</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{alignItems: 'center'}} onPress={() => this.props.navigation.navigate('MyVR')}>
              <Text white bold size={28}>{medias.length}</Text>
              <Text white>我的VR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View style={styles.componentsSection}>
          <View style={styles.componentSectionHeader}>
            <Text color={colors.primary}>我的订单</Text>
            <Text onPress={() => this.props.navigation.navigate('ClientJob', {selected: 0})}>查看全部订单</Text>
          </View>
          <View style={styles.demoButtonsContainer}>
            {jobStatus.map((jobItem, index) => (
              <TouchableOpacity key={index} style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('ClientJob', {selected: index+1})}>
                <Image
                  resizeMode="cover"
                  source={jobItem.icon}
                  style={{width:20, height: 20, tintColor: colors.primary}}
                />
                <Text>
                  {jobItem.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={{ backgroundColor: colors.white, paddingHorizontal: 15,borderRadius: 5}}>
          <ListItem
            key={1}
            titleStyle = {{color: colors.black}}
            title='我的合同'
            hideChevron={false}
            chevron={{ color: colors.gray }}
            onPress = {() => this.props.navigation.navigate('MyContract')}
            bottomDivider
          />
          <ListItem
            key={2}
            titleStyle = {{color: colors.black}}
            title='申请发票'
            hideChevron={false}
            chevron={{ color: colors.gray }}
            onPress = {() => this.props.navigation.navigate('RequestInvoice')}
            bottomDivider
          />
          <ListItem
            key={3}
            titleStyle = {{color: colors.black}}
            title='VR商城'
            hideChevron={false}
            chevron={{ color: colors.gray }}
            onPress = {() => this.props.navigation.navigate('VRShop')}
            bottomDivider
          />
          <ListItem
            key={4}
            titleStyle = {{color: colors.black}}
            title='意见反馈'
            hideChevron={false}
            chevron={{ color: colors.gray }}
            onPress = {() => this.props.navigation.navigate('GiveFeedback')}
            bottomDivider
          />
          <ListItem
            key={5}
            titleStyle = {{color: colors.black}}
            title='帮助中心'
            hideChevron={false}
            chevron={{ color: colors.gray }}
            onPress = {() => this.props.navigation.navigate('Help')}
            bottomDivider
          />
          <ListItem
            key={6}
            titleStyle = {{color: colors.black}}
            title='关于我们'
            hideChevron={false}
            chevron={{ color: colors.gray }}
            onPress = {() => this.props.navigation.navigate('AboutUs')}
          />
        </View>
      </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    padding: 15,
    paddingTop: Platform.OS === 'ios' ? 25 : 15,
  },
  container: {
    flex: 1,
    backgroundColor: colors.bluish,
    padding: 15
  },
  componentsSection: {
    backgroundColor: colors.white,
    padding: 15,
    marginBottom: 15,
    borderRadius: 5,
  },
  componentSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  demoButtonsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  settingsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
});

const mapStateToProps = createStructuredSelector({
  profile: profileSelector,
  medias: myMediasSelector,
  unread: unreadMessagesSelector
});

const mapDispatchToProps = {
  getMyMedias
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(MyPage);
