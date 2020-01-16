import React, {Component} from 'react';
import {View, Image, ImageBackground} from 'react-native'
import constants from '../constants'
export default class ViewInvoice extends Component {
	constructor(props) {
		super(props)
		this.state = {
			url: ''
		}
	}
  componentWillMount() {
		const {navigation} = this.props
		let invoice = navigation.getParam('invoice', {})
		invoice && this.setState({url: constants.INVOICE_BASE_URL +  invoice.path})
	}
  render() {
		const {url} = this.state
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10}}>
        <Image 
          source={{uri: url}}
          style={{height: '100%', width: '100%'}}
          resizeMode='contain'
        />
      </View>
    );
  }
}