import React from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import {Badge} from 'react-native-elements'
import Icon from 'react-native-vector-icons/Feather';
import { colors, fonts } from '../../../styles';
import { ListItem } from 'react-native-elements'
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { Button, Dropdown, Profile, Text } from '../../../components';
import {sum, values} from 'lodash'
import { profileSelector, unreadMessagesSelector } from '../../../redux/selectors'
class MyPage extends React.Component {
  render () {
    const {profile, unread} = this.props
    const unreadCount = sum(values(unread)) || 0
    const jobStatus = [
      {title: '竞标中', icon: 'camera'},
      {title: '待支付', icon: 'camera'},
      {title: '待拍摄', icon: 'camera'},
      {title: '待验收', icon: 'camera'},
      {title: '评价', icon: 'camera'},
      {title: '已完成', icon: 'camera'},
    ]
    return (
      <>
      <ImageBackground
          source={require('../../../../assets/images/profileBackground.png')}
          style={{ width: '100%'}}
          resizeMode="cover"
      >
        <View style={{padding: 15}}>
          <View style={{flexDirection: 'row'}}>
            <Profile user = {profile} navigation={this.props.navigation} />
            <View style={styles.settingsContainer}>
              {!!unreadCount && <Badge value={unreadCount} status="error"/>}
              <Icon
                name="bell"
                size={30}
                color={colors.white}
                onPress={() => this.props.navigation.navigate('Notification')}
              />
              <Icon
                name="settings"
                size={30}
                color={colors.white}
                onPress={() => this.props.navigation.navigate('Settings')}
              />
            </View>
          </View>
          <View style={{justifyContent: 'space-around', flexDirection: 'row'}}>
            <TouchableOpacity style={{alignItems: 'center'}} onPress={() => this.props.navigation.navigate('MyCollection')}>
              <Text white bold size={28}>{profile.collections.length}</Text>
              <Text white>我的收藏</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{alignItems: 'center'}}  onPress={() => this.props.navigation.navigate('MyAttention')}>
              <Text white bold size={28}>{profile.attentions.length}</Text>
              <Text white>我的关注</Text>
            </TouchableOpacity>
            <View style={{alignItems: 'center'}}>
              <Text white bold size={28}>4</Text>
              <Text white>我的VR</Text>
            </View>
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
            <Text>查看全部订单</Text>
          </View>
          <View style={styles.demoButtonsContainer}>
            {jobStatus.map((jobItem, index) => (
              <TouchableOpacity key={index} style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('ClientJob', {selected: index+1})}>
                <Icon name={jobItem.icon} size={20} color={colors.secondary} />
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
            onPress = {() => null}
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
            onPress = {() => null}
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
            onPress = {() => this.props.navigation.navigate('WebViewer', {url: 'help.html'})}
            bottomDivider
          />
          <ListItem
            key={6}
            titleStyle = {{color: colors.black}}
            title='关于我们'
            hideChevron={false}
            chevron={{ color: colors.gray }}
            onPress = {() => this.props.navigation.navigate('WebViewer', {url: 'About_Us.html'})}
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
  unread: unreadMessagesSelector
});

const mapDispatchToProps = {
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(MyPage);
