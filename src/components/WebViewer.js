import React, {Component} from 'react';
import {WebView} from 'react-native';
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
        style={{marginTop: 20}}
      />
    );
  }
}