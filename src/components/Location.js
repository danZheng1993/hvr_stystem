import React, {Component} from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import AlphabetListView from 'react-native-alphabetlistview'
class SectionHeader extends Component {
	render() {
	  // inline styles used for brevity, use a stylesheet when possible
	  var textStyle = {
		textAlign:'center',
		color:'#fff',
		fontWeight:'700',
		fontSize:16
	  };
  
	  var viewStyle = {
		backgroundColor: '#ccc'
	  };
	  return (
		<View style={viewStyle}>
		  <Text style={textStyle}>{this.props.title}</Text>
		</View>
	  );
	}
  }
  
  class SectionItem extends Component {
	render() {
	  return (
		<Text style={{color:'#000'}}>{this.props.title}</Text>
	  );
	}
  }
  
  class Cell extends Component {
	render() {
	  return (
			<TouchableOpacity onPress={() => alert(this.props.item)} style={{backgroundColor: 'white'}}>
		<View style={{height:50, margin: 5, backgroundColor: 'white', borderBottomColor: 'gray', borderBottomWidth:1}}>
				<Text size={58}>{this.props.item}</Text>	
				<Text size={58}>{this.props.item}</Text>	
				<Text size={58}>{this.props.item}</Text>	
		</View>
			</TouchableOpacity>
	  );
	}
  }
  
export default class Location extends Component {
  
	constructor(props, context) {
	  super(props, context);
  
	  this.state = {
		data: {
		当前: ['全国'],
		位: ['全国'],
		热门: ['全国','北京','深圳','山海','广州','重庆','成都','杭州'],
		  A: ['北京','深圳','山海'],
		  B: ['北京','深圳','山海'],
		  C: ['北京','深圳','山海'],
		  D: ['北京','深圳','山海'],
		  E: ['北京','深圳','山海'],
		  F: ['北京','深圳','山海'],
		  G: ['北京','深圳','山海'],
		  H: ['北京','深圳','山海'],
		  I: ['北京','深圳','山海'],
		  J: ['北京','深圳','山海'],
		  K: ['北京','深圳','山海'],
		  L: ['北京','深圳','山海'],
		  M: ['北京','深圳','山海'],
		  N: ['北京','深圳','山海'],
		  O: ['北京','深圳','山海'],
		  P: ['北京','深圳','山海'],
		  Q: ['北京','深圳','山海'],
		  R: ['北京','深圳','山海'],
		  S: ['北京','深圳','山海'],
		  T: ['北京','深圳','山海'],
		  U: ['北京','深圳','山海'],
		  V: ['北京','深圳','山海'],
		  W: ['北京','深圳','山海'],
		  X: ['北京','深圳','山海'],
		  Y: ['北京','深圳','山海'],
		  Z: ['北京','深圳','山海'],
		}
	  };
	}
  
	render() {
	  return (
		<AlphabetListView
		  data={this.state.data}
		  cell={Cell}
		  cellHeight={30}
		  sectionListItem={SectionItem}
		  sectionHeader={SectionHeader}
		  sectionHeaderHeight={22.5}
		/>
	  );
	}
  }