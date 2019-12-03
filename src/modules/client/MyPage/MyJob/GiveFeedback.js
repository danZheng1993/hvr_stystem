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
        <View style={styles.description}>
        <TextInput
            style={styles.input}
            outlined
            label='填写服务介绍'
            placeholder="填写服务介绍"
            multiline
            maxLength={100}
            numberOfLines={6}
            value={this.state.feedback}
            onChangeText={feedback => this.setState({ feedback })}
        />
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            large
            bgColor={colors.warning}
            style={styles.button}
            caption="提交"
            onPress={() => this.handleClick()}
          />
        </View>
      </View>    
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  photo: {
    borderRadius: 100,
    borderColor: colors.gray,
    backgroundColor: colors.info,
    width: 100,
    height: 100
  },
  input: {
    marginBottom: 15,
  },
  description: {
    padding: 20,
    marginBottom: 20,
    alignSelf: 'stretch'
  },
  buttonsContainer: {
    alignSelf: 'stretch',
    margin: 20
  },
  button: {
    marginBottom: 20,
    alignSelf: 'stretch',
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
