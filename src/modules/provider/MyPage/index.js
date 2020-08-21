import React from 'react';
import { StyleSheet, View, ScrollView, ImageBackground, TouchableOpacity, Image, Platform } from 'react-native';
import { colors } from '../../../styles';
import { ListItem } from 'react-native-elements'
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { Profile, Text, Bell } from '../../../components';
import { profileSelector, unreadMessagesSelector, myMediasSelector, mediasloadingSelector } from '../../../redux/selectors'
import { getMyMedias} from '../../../redux/modules/media'
import constants from '../../../constants'

const iconSetting = require('../../../../assets/images/setting.png');
const iconBidding = require('../../../../assets/images/bidding.png');
const iconPaying = require('../../../../assets/images/paying.png');
const iconWaiting = require('../../../../assets/images/waiting.png');
const iconTesting = require('../../../../assets/images/testing.png');
const iconFeedback = require('../../../../assets/images/feedback.png');

class MyPage extends React.Component {
  componentWillMount() {
    this.props.getMyMedias()
  }
  
  render () {
    const {profile, medias} = this.props
    const jobStatus = [
      {title: '竞标中', icon: iconBidding},
      {title: '已选用', icon: iconBidding},
      {title: '待支付', icon: iconPaying},
      {title: '待拍摄', icon: iconWaiting},
      {title: '待验收', icon: iconTesting},
      {title: '已完成', icon: iconFeedback},
    ]
    return (
      <>
        <ImageBackground
          source={require('../../../../assets/images/profileBackground.png')}
          style={{
            width: '100%'}}
          resizeMode="cover"
        >
        <View style={{padding: 15, paddingTop: Platform.OS === 'ios' ? isIphoneX() ? 48 : 25 : 15}}>
          <View style={{flexDirection: 'row'}}>
            <Profile user = {profile} navigation={this.props.navigation} />
            <View style={styles.settingsContainer}>
              <Bell navigation={this.props.navigation} />
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
            <TouchableOpacity style={{alignItems: 'center'}}  onPress={() => this.props.navigation.navigate('MyCreatedVR')}>
              <Text white bold size={28}>{medias.length}</Text>
              <Text white>我发布的</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{alignItems: 'center'}}  onPress={() => this.props.navigation.navigate('Balance', {balance: profile.balance})}>
              <Text white bold size={28}>{profile.balance}</Text>
              <Text white>我的余额</Text>
            </TouchableOpacity>
          </View> 
          </View>
        </ImageBackground>
      <ScrollView
        style={styles.container}
      >
        <View style={styles.componentsSection}>
          <View style={styles.componentSectionHeader}>
            <Text color={colors.primary}>我的订单</Text>
            <Text onPress={() => this.props.navigation.navigate('ProviderJob', {selected: 0})}>查看全部订单</Text>
          </View>
          <View style={styles.demoButtonsContainer}>
            {jobStatus.map((jobItem, index) => (
              <TouchableOpacity key={index} style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('ProviderJob', {selected: index+1})}>
                <Image
                  resizeMode="cover"
                  source={jobItem.icon}
                  style={{width:20, height: 20, tintColor: colors.primary}}
                />
                <Text size={12}>
                  {jobItem.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={{ backgroundColor: colors.white, paddingHorizontal: 15,borderRadius: 5, marginBottom: 30}}>
          <ListItem
            key={1}
            titleStyle = {{color: colors.black}}
            title='认证中心'
            hideChevron={false}
            chevron={{ color: colors.gray }}
            onPress = {() => this.props.navigation.navigate('Authentication')}
            bottomDivider
          />
          <ListItem
            key={2}
            titleStyle = {{color: colors.black}}
            title='我的合同'
            hideChevron={false}
            chevron={{ color: colors.gray }}
            onPress = {() => this.props.navigation.navigate('MyContract')}
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
            title='直播管理'
            hideChevron={false}
            chevron={{ color: colors.gray }}
            onPress = {() => this.props.navigation.navigate('MyContract')}
            bottomDivider
          />
          <ListItem
            key={5}
            titleStyle = {{color: colors.black}}
            title='开具发票'
            hideChevron={false}
            chevron={{ color: colors.gray }}
            onPress = {() => this.props.navigation.navigate('BillingInvoice')}
            bottomDivider
          />
          <ListItem
            key={6}
            titleStyle = {{color: colors.black}}
            title='关于我们'
            hideChevron={false}
            chevron={{ color: colors.gray }}
            bottomDivider
            onPress = {() => this.props.navigation.navigate('WebViewer', {url: constants.BASE_URL + 'AboutUs.html'})}
          />
          <ListItem
            key={7}
            titleStyle = {{color: colors.black}}
            title='意见反馈'
            hideChevron={false}
            chevron={{ color: colors.gray }}
            onPress = {() => this.props.navigation.navigate('GiveFeedback')}
            bottomDivider
          />
          <ListItem
            key={8}
            titleStyle = {{color: colors.black}}
            title='帮助中心'
            hideChevron={false}
            chevron={{ color: colors.gray }}
            onPress = {() => this.props.navigation.navigate('WebViewer', {url: constants.BASE_URL + 'help.html'})}
          />
        </View>
        </ScrollView>
      </>
    );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bluish,
    padding: 15
  },
  componentsSection: {
    backgroundColor: colors.white,
    padding: 10,
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
  unread: unreadMessagesSelector,
  medias: myMediasSelector
});

const mapDispatchToProps = {
  getMyMedias
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(MyPage);
