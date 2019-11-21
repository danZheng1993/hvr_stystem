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
		let url = navigation.getParam('url', 'error.html')
		this.setState({url})
	}
  render() {
		const {url} = this.state
    return (
      <WebView
        source={{uri: (constants.BASE_URL + url)}}
        // source={{uri: `https://720yun.com/`}}
        style={{marginTop: 20}}
      />
    );
  }
}