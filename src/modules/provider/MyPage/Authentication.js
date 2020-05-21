import React from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';

import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import {Text} from '../../../components'
import { colors } from '../../../styles';
import { profileSelector } from '../../../redux/selectors'

class Authentication extends React.Component {

  render() {    
    const {profile} = this.props
    return (
      <View style={styles.container}>
        <View style={styles.componentsSection}>
          <Text size={16} black bold>个人信息认证</Text>
          <Text size={22}>{profile.permission === 'ALLOWED' ? '已认证' : '未认证'}</Text>
        </View>
        <View style={styles.componentsSection}>
          <Text size={16} black bold>公司信息认证</Text>
          { profile.type !== '个人服务方'
            ? <Text size={22}>已认证</Text>
            : <Text size={22} color={colors.primary} onPress={() => this.props.navigation.navigate('CompanyInfo')}>点击认证</Text>
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    backgroundColor: colors.bluish,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  componentsSection: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: colors.white,
    marginBottom: 30,
    borderRadius: 5,
    paddingVertical: 30
  },
});


const mapStateToProps = createStructuredSelector({
  profile: profileSelector,
});

const mapDispatchToProps = {
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Authentication);
