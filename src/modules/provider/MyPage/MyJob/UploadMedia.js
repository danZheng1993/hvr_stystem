import React from 'react'
import { View, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper';

import { colors } from '../../../../styles'
import { Button } from '../../../../components';

import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';

import { uploadLink } from '../../../../redux/modules/media'
import { updateMyJobsList } from '../../../../redux/modules/job'

class UploadMedia extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      link: '',
      id: ''
    }
  }

  componentWillMount() {
    const { navigation} = this.props
    let id = navigation.getParam('id', 'NO-ID')
    if (id != 'NO-ID') {
      this.setState({id})
    }
  }

  handleClick = () => {
    const {link, id} = this.state
    if (id != '') {
      this.props.uploadLink({
        body:{link, id},
        success: (payload) => this.handleSuccess(payload.data)
      })
    }
  };

  handleSuccess = (data) => {
    this.props.updateMyJobsList(data)
    this.props.navigation.goBack()
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.description}>
        <TextInput
            style={styles.input}
            outlined
            label='输入视频链接'
            placeholder="输入视频链接"
            value={this.state.link}
            onChangeText={link => this.setState({ link })}
        />
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            large
            bgColor={colors.secondary}
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
  uploadLink,
  updateMyJobsList
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(UploadMedia);
