import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Badge } from 'react-native-elements'
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
            style={{width: 20, height: 20}}
        />
      </TouchableOpacity>
    );
    }
}

const mapStateToProps = createStructuredSelector({
  unread: unreadMessagesSelector
});

const mapDispatchToProps = {
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Bell);
