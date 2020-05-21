import React from 'react'
import { View, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper';

import { colors } from '../../../../styles'
import { Button } from '../../../../components';

import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';

import { giveFeedback, updateMyJobsList } from '../../../../redux/modules/job'
import { createFeedback } from '../../../../redux/modules/feedback'

class GiveFeedback extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      feedback: '',
      id: ''
    }
  }

  componentWillMount() {
    const { navigation} = this.props
    let id = navigation.getParam('id', 'NO-ID')
    if (id != 'NO-ID') {
      this.setState({id: id})
    }
  }
  handleSuccess = (data) => {
    this.props.updateMyJobsList(data)
    this.props.navigation.goBack()
  }

  handleClick = () => {
    const {feedback, id} = this.state
    if (id != '') {
      this.props.giveFeedback({
        id: id,
        body:{feedback},
        success: (payload) => this.handleSuccess(payload.data)
      })
    } else {
      this.props.createFeedback({
        body: {content: feedback}
      })
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          outlined
          placeholder="请填写您的评价"
          multiline
          maxLength={100}
          numberOfLines={10}
          value={this.state.feedback}
          onChangeText={feedback => this.setState({ feedback })}
        />
        <Button
          large
          bgColor={colors.secondary}
          caption="提交"
          onPress={() => this.handleClick()}
        />
      </View>    
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'stretch', 
    justifyContent: 'flex-start',
    padding: 10,
    backgroundColor: colors.bluish,
  },
  input: {
    marginBottom: 15,
    backgroundColor: colors.white,
    width: '100%'
  },

});

const mapStateToProps = createStructuredSelector({
});

const mapDispatchToProps = {
  giveFeedback,
  createFeedback,
  updateMyJobsList
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(GiveFeedback);