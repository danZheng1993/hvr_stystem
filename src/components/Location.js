import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Picker, DateTimePicker } from 'react-native-dynamic-picker';

const  data =
[
	{
		value:'100',
		lable:'北京',
		children:[
					{
						value:'110',
						lable:'北京',
						children:[
									{
										value:'111',
										lable:'东城区',
										children:undefined 
									},
									{
										value:'112',
										lable:'西城区',
										children:undefined 
									}
								]
					},
					 {
						value:'120',
                        lable:'Shanghai',
                        children: undefined
					}
				]
	},
	{
		value: '200',
		lable: 'USA',
		children: undefined
  	},
	
]
const list = [
    'aaaa', 'bbbb'
]

export default class Location extends React.Component {
    componentDidMount(){
        // this.refs['Picker'].showPicker(true);
        this.refs['DynamicPicker'].showPicker(true);
    }
    render() {
        return (
            <View style={styles.container}>
                {/* <Picker ref='Picker' data={data} title='Picker' branchTitles={['Options']} /> */}
                <Picker ref='DynamicPicker' isDynamic={true}  data={data} title='Pick Area' branchTitles={['Province',]} />
            </View >
        )
    }
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        height: 400,
        width: 400,
    }
    })
    