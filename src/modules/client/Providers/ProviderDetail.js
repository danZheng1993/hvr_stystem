import React from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
} from 'react-native';

import { connect } from 'react-redux';
import { compose, withState } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { Button, Loader, UsersList, Profile, RadioGroup, Text} from '../../../components';
import { fonts, colors } from '../../../styles';

import { getUser } from '../../../redux/modules/user'
import { addToAttentions } from '../../../redux/modules/auth'
import { userDetailSelector, usersloadingSelector } from '../../../redux/selectors'
import ProviderWorks from './ProviderWorks';
import ProviderFeedbacks from './ProviderFeedbacks';

class ProviderDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      select: 0
    }
  }

  handleClick =() => {

  }

  componentWillMount() {
    const {getUser, navigation} = this.props
    let id = navigation.getParam('id', 'NO-ID')
    if (id != 'NO-ID') {
      getUser({
        id,
      })
    }
  }

  handleSelect = (index) => {
    this.props.setRadioGroupsState({ ...this.props.radioGroupsState, 1: index })
    this.setState( {select: index} )
  }

  handleAttentions = (id) => {
    this.props.addToAttentions({
      body: {attention: id}
    })
  }
  render() {
    const {user, usersloading} = this.props
    const {select} = this.state
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
              <Text white bold size={28}>39</Text>
              <Text white>服务用户数</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text white bold size={28}>45</Text>
              <Text white>项目作品</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text white bold size={28}>45</Text>
              <Text white>播放数量</Text>
            </View>
          </View> 
          </View>
        </ImageBackground>
      <View style={styles.container}>
        <Loader
          loading={usersloading} /> 
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
          {select ?
            <ProviderFeedbacks id={user._id}/> : <ProviderWorks id={user._id}/>
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
          onPress={this.handleClick}
        />
        <Button
          small
          bgColor={colors.primary}
          style={styles.button}
          caption="约拍"
          onPress={this.handleClick}
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
  user: userDetailSelector,
  usersloading: usersloadingSelector,
});

const mapDispatchToProps = {
  getUser,
  addToAttentions
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect,   withState('radioGroupsState', 'setRadioGroupsState', [0, 0]),)(ProviderDetail);
