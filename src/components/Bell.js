import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import {Badge} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors, fonts } from '../styles';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { sum, values} from 'lodash'
import { unreadMessagesSelector } from '../redux/selectors'
class Bell extends React.Component {
  render () {
    const {unread} = this.props
    const unreadCount = sum(values(unread)) || 0
    return (
      <TouchableOpacity style={{flexDirection: 'row', alignItems: 'flex-start'}} onPress={() => this.props.navigation.navigate('Notification')}>
        {!!unreadCount && <Badge value={unreadCount} status="error"/>}
        <Image
            source={require('../../assets/images/bell.png')}
            style={{width: 30, height: 30}}
        />
      </TouchableOpacity>
    );
    }
}

const styles = StyleSheet.create({

});

const mapStateToProps = createStructuredSelector({
  unread: unreadMessagesSelector
});

const mapDispatchToProps = {
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Bell);
