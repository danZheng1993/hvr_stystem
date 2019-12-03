import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import {Badge} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors, fonts } from '../../../styles';

import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { Button, Dropdown, Profile } from '../../../components';

import { profileSelector, unreadMessagesSelector } from '../../../redux/selectors'
class MyPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

  render () {
    const {profile, unread} = this.props
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {profile &&
        <View style={styles.componentsSection}>
          <View style={{flexDirection: 'row'}}>
            <Profile user = {profile} navigation={this.props.navigation} />
            <View style={styles.settingsContainer}>
                {!!unread.length && <Badge value={unread.length} status="error" />}
                <Icon
                  style={styles.demoIcon}
                  name="bell"
                  size={30}
                  color="#5759CB"
                  onPress={() => this.props.navigation.navigate('Notification')}
                />
                <Icon
                  style={styles.demoIcon}
                  name="gear"
                  size={30}
                  color="#5759CB"
                  onPress={() => this.props.navigation.navigate('Settings')}
                />
            </View>
          </View>
          <View style={{justifyContent: 'space-around', flexDirection: 'row'}}>
              <TouchableOpacity style={{alignItems: 'center'}} onPress={() => this.props.navigation.navigate('MyCollection')}>
                <Text>{profile.collections.length}</Text>
                <Text>我的收藏</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{alignItems: 'center'}}  onPress={() => this.props.navigation.navigate('MyAttention')}>
                <Text>{profile.attentions.length}</Text>
                <Text>我的关注</Text>
              </TouchableOpacity>
              <View style={{alignItems: 'center'}}>
                <Text>4</Text>
                <Text>我的VR</Text>
              </View>
            </View>
        </View>}
        <View style={styles.componentsSection}>
          <Text style={styles.componentSectionHeader}>我的订单</Text>
          <View style={styles.demoButtonsContainer}>
          <View style={styles.buttonContainer} >
              <Button
                  style={styles.demoButton}
                  action
                  bgColor="#958FDA"
                  onPress={() => this.props.navigation.navigate('MyJob', {selected: 1})}
                  >
                <Text>
                  <Icon name="tags" size={20} color="white" />
                </Text>
              </Button>
              <Text>
                竞标中
              </Text>
            </View>
            <View style={styles.buttonContainer} >
              <Button
                  style={styles.demoButton}
                  action
                  bgColor="#52B1F4"
                  onPress={() => this.props.navigation.navigate('MyJob', {selected: 2})}
                >
                <Text>
                  <Icon name="tags" size={20} color="white" />
                </Text>
              </Button>
              <Text>
              待支付
              </Text>
            </View>
            <View style={styles.buttonContainer} >
              <Button
                  style={styles.demoButton}
                  action
                  bgColor="#19D4E6"
                  onPress={() => this.props.navigation.navigate('MyJob', {selected: 3})}
                >
                <Text>
                  <Icon name="tags" size={20} color="white" />
                </Text>
              </Button>
              <Text>
              待拍摄
              </Text>
            </View>
            <View style={styles.buttonContainer} >
              <Button
                  style={styles.demoButton}
                  action
                  bgColor="#4F44C1"
                  onPress={() => this.props.navigation.navigate('MyJob', {selected: 4})}
                >
                <Text>
                  <Icon name="tags" size={20} color="white" />
                </Text>
              </Button>
              <Text>
              待验收
              </Text>
            </View>
            <View style={styles.buttonContainer} >
              <Button
                  style={styles.demoButton}
                  action
                  bgColor="#3CD4A0"
                  onPress={() => this.props.navigation.navigate('MyJob', {selected: 5})}
                >
                <Text>
                  <Icon name="tags" size={20} color="white" />
                </Text>
              </Button>
              <Text>
              评价
              </Text>
            </View>
            <View style={styles.buttonContainer} >
              <Button
                  style={styles.demoButton}
                  action
                  bgColor="#3CD4A0"
                  onPress={() => this.props.navigation.navigate('MyJob', {selected: 6})}
                >
                <Text>
                  <Icon name="tags" size={20} color="white" />
                </Text>
              </Button>
              <Text>
              已完成
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.componentsSection}>
          <Text style={styles.componentSectionHeader}>常用功能</Text>

          <View style={styles.demoIconsContainer}>
            <View style={styles.buttonContainer} >
              <Button
                  style={styles.demoButton}
                  action
                  bgColor="#4F44C1"
                >
                <Text>
                  <Icon name="tags" size={20} color="white" />
                </Text>
              </Button>
              <Text>
              我的合同
              </Text>
            </View>
            <View style={styles.buttonContainer} >
              <Button
                  style={styles.demoButton}
                  action
                  bgColor="#EF1F78"
                  onPress={() => this.props.navigation.navigate('RequestInvoice')}
                >
                <Text>
                  <Icon name="tags" size={20} color="white" />
                </Text>
              </Button>
              <Text>
              申请发票
              </Text>
            </View>
            <View style={styles.buttonContainer} >
              <Button
                  style={styles.demoButton}
                  action
                  bgColor="#3CD4A0"
                >
                <Text>
                  <Icon name="tags" size={20} color="white" />
                </Text>
              </Button>
              <Text>
              VR商城
              </Text>
            </View>
            <View style={styles.buttonContainer} >
              <Button
                  style={styles.demoButton}
                  action
                  bgColor="#52B1F4"
                  onPress={() => this.props.navigation.navigate({ routeName: 'GiveFeedback' })}
                  >
                <Text>
                  <Icon name="tags" size={20} color="white" />
                </Text>
              </Button>
              <Text>
              意见反馈
              </Text>
            </View>
          </View>
          <View style={styles.demoIconsContainer}>
            <View style={styles.buttonContainer} >
              <Button
                  style={styles.demoButton}
                  action
                  bgColor="#958FDA"
                  onPress={() => this.props.navigation.navigate('WebViewer', {url: 'help.html'})}
                >
                <Text>
                  <Icon name="tags" size={20} color="white" />
                </Text>
              </Button>
              <Text>
              帮助中心
              </Text>
            </View>
            <View style={styles.buttonContainer} >
              <Button
                  style={styles.demoButton}
                  action
                  bgColor="#958FDA"
                  onPress={() => this.props.navigation.navigate('WebViewer', {url: 'About_Us.html'})}
                >
                <Text>
                  <Icon name="tags" size={20} color="white" />
                </Text>
              </Button>
              <Text>
              关于我们
              </Text>
            </View>

          </View>
        </View>
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
  componentSectionHeader: {
    fontFamily: fonts.primaryRegular,
    color: '#686868',
    fontSize: 20,
    marginBottom: 20,
  },
  demoButtonsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  demoIconsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  demoButton: {
    marginTop: 8,
    marginBottom: 8,
  },
  demoItem: {
    marginVertical: 15,
  },
  buttonContainer: {
    flexDirection: 'column'
  },
  photo: {
    borderRadius: 100,
    borderColor: colors.gray,
    backgroundColor: colors.info,
    width: 100,
    height: 100
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
