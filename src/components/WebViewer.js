import React, {Component} from 'react';
import { View, Platform, TouchableOpacity } from 'react-native';
import {WebView} from 'react-native-webview';
import Ionicons from 'react-native-vector-icons/Ionicons';
import constants from '../constants'
import { colors } from '../styles';
import { isIphoneX } from '../helpers';

export default class WebViewer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			url: ''
		}
	}
  componentWillMount() {
    const {route} = this.props
    const { url = constants.BASE_URL + 'error.html' } = route.params || {};
		this.setState({url})
  }
  handleClose = () => {
    this.props.navigation.goBack();
  }
  render() {
		const {url} = this.state
    return (
      <View>
        <View style={styles.header}>
          <TouchableOpacity style={styles.button} onPress={this.handleClose}>
            <Ionicons name="close-circle-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <WebView
          source={{uri: url}}
          style={{marginTop: 20}}
        />
      </View>
    );
  }
};

const styles = {
  wrapper: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 10,
    paddingTop: Platform.OS === 'ios' ? isIphoneX() ? 48 : 25 : 15,
    backgroundColor: colors.secondary,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button: {
    padding: 8,
  }
}