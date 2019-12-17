import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { cancelJob, removeFromMyJobsList} from '../../../../../redux/modules/job'
import {Button} from '../../../../../components'
import {colors} from '../../../../../styles'

const WaitingAction = props => {
  return (
    <View style={styles.buttonsContainer}>
        <Button
        small
        style={styles.button}
        caption="联系服务商"
        onPress={() => props.navigation.navigate('Chatting', {to: props.job.hired})}
        />
        <Button
        small
        style={styles.button}
        caption="取消订单"
        onPress={() => props.cancelJob({
          id: props.job._id,
          success: () => {props.removeFromMyJobsList({id: props.job._id})}
        })}
        />
       <Button
        small
        bgColor={colors.warning}
        style={styles.button}
        caption="催一催"
        onPress={() => alert("PLEASE!!!")}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  buttonsContainer: {
    alignItems: 'flex-end',
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopColor: colors.greybackground,
    borderTopWidth: 1,
    paddingTop: 10
  },

  button: {
  },
});

const mapStateToProps = createStructuredSelector({

});

const mapDispatchToProps = {
  cancelJob,
  removeFromMyJobsList
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect) (WaitingAction)