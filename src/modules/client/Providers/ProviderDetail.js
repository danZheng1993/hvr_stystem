import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';

import { connect } from 'react-redux';
import { compose, withState } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { Button, Loader, UsersList, Profile, RadioGroup} from '../../../components';
import { fonts, colors } from '../../../styles';

import { getUser } from '../../../redux/modules/user'
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
        id: id,
      })
    }
  }

  handleSelect = (index) => {
    this.props.setRadioGroupsState({ ...this.props.radioGroupsState, 1: index })
    this.setState( {select: index} )
  }

  render() {
    const {user, usersloading} = this.props
    const {select} = this.state
    return (
      <ScrollView style={styles.container}>
        <Profile user={user} navigation={this.props.navigation}/>
        <View style={styles.description}>
         { <Loader
          loading={usersloading} /> }
         </View>
        <View style={styles.componentsSection}>
          <RadioGroup
            underline
            style={styles.demoItem}
            items={['项目作品', '雇主评价']}
            selectedIndex={this.props.radioGroupsState[1]}
            onChange={index => this.handleSelect(index)}
          />
          {select ?
            <ProviderFeedbacks id={user._id}/> : <ProviderWorks id={user._id}/>
          }
          </View>
         <View style={styles.buttonsContainer}>
          <Button
            large
            bgColor={colors.warning}
            style={styles.button}
            caption="在线沟通"
            onPress={this.handleClick}
          />
          <Button
            large
            bgColor={colors.warning}
            style={styles.button}
            caption="电话"
            onPress={this.handleClick}
          />
          <Button
            large
            bgColor={colors.warning}
            style={styles.button}
            caption="约拍"
            onPress={this.handleClick}
          />
              
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
  
  picker: {
    flexDirection: "row",
    justifyContent: 'space-between'
  },
  buttonsContainer: {
    alignItems: 'flex-end',
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 20
  },
  button: {
    marginBottom: 20,
  },
  description: {
    padding: 20,
    marginBottom: 20,
    alignSelf: 'stretch'
  },
  input: {
    marginBottom: 15,
  },
  anchor: {
    flex: 1,
    flexDirection: "row",
  },
  inputWrap: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  componentsSection: {
    backgroundColor: colors.white,
    padding: 15,
    marginBottom: 20,
    borderRadius: 5,
  },
});


const mapStateToProps = createStructuredSelector({
  user: userDetailSelector,
  usersloading: usersloadingSelector,
});

const mapDispatchToProps = {
  getUser
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect,   withState('radioGroupsState', 'setRadioGroupsState', [0, 0]),)(ProviderDetail);
