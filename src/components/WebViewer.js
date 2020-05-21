import React, {Component} from 'react';
import {WebView} from 'react-native-webview';
import constants from '../constants'
export default class WebViewer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			url: ''
		}
	}
  componentWillMount() {
		const {navigation} = this.props
		let url = navigation.getParam('url', constants.BASE_URL + 'error.html')
		this.setState({url})
	}
  render() {
		const {url} = this.state
    return (
      <WebView
        source={{uri: url}}
        style={{marginTop: 20}}
      />
    );
  }
}