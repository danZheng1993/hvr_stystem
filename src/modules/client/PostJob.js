import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Picker,
  ActivityIndicator,
} from 'react-native';
import {fromJS} from 'immutable'
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';

import { Button, Loader, Select } from '../../components';
import { fonts, colors } from '../../styles';
import { Form, TextValidator } from 'react-native-validator-form';

import { Text } from '../../components/StyledText';

import { getTypes } from '../../redux/modules/type'
import { getScenes } from '../../redux/modules/scene'
import { getServices } from '../../redux/modules/service'
import {  typesListSelector, typesloadingSelector, 
          scenesListSelector, scenesloadingSelector, 
          servicesListSelector, servicesloadingSelector,
          subcategorysListSelector, subcategorysloadingSelector } from '../../redux/selectors'
import { getSubcategorys } from '../../redux/modules/subcategory';

class PostJob extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      phoneNumber: '22222222222',
      password: '2222222222',
      category : '',
      scene: '',
      type: '',
      types: [{name:'please select', _id:'22222'}]
    }
  }
  componentWillMount() {
    const {getTypes, getScenes, getServices, getSubcategorys} = this.props
  //  getScenes()
    getTypes()
    //getServices()
    getSubcategorys()
  }
  componentDidMount() {
    setTimeout(() =>  { 
      this.setState({
       types: this.props.types      }) 
     }, 300)
  }
  handleClick = () => {
    const { phoneNumber, password} = this.state
    const { profile } = this.props
    console.log(profile)

  };
  loadItem(items) { 
    if (!items) return
    item.slice(-1)
    return items && items.map((item, index) => (
        index <=2 && <Picker.Item key={index} label={item.name} value={item.name} />
    ))
  }
  render() {
    
    const {types, typesloading, scenes, scenesLoading, services, servciesLoading, subcategories, subcategorysloading} = this.props
    console.log("types",types, this)
    let typess =  [{name: 'sss'}, {name: 'ddd'}]

    return (
      <ScrollView style={styles.container}>
        <View style={styles.description}>
         {/* <Loader
          loading={typesloading && scenesLoading && servciesLoading && subcategorysloading} /> */}
          <Form
              ref="form"
              onSubmit={this.handleClick}
          >
            {/* <Picker
                    selectedValue='please select'
                    onValueChange={ (value) => ( this.setState({type : value}) )}>
                    { this.loadItem(this.state.types) }
                </Picker> */}
            <TextValidator
                name="phoneNumber"
                label='手机号'
                validators={['required', 'matchRegexp:^[0-9]{11}$']}
                errorMessages={['This field is required', 'invalid phone number']}
                placeholder="输入手机号"
                type="text"
                value={this.state.phoneNumber}
                onChangeText={phoneNumber => this.setState({ phoneNumber })}
            />
              {/* <ChinaLocation
                  list={locationData} 
                  onLocationChange={this.onLocationChange}
              /> */}
            
            <TextValidator
                style={styles.input}
                outlined
                validators={['required', 'minStringLength:6', 'maxStringLength:20']}                 
                errorMessages={['This field is required', 'password must be at least 6 characters', 'password is length must be less than 20']}
                label='设置密码'
                placeholder="设置密码（6-20位字母数字组合)"
                value={this.state.password}
                secureTextEntry
                maxLength={20}
                onChangeText={password => this.setState({ password })}
            />
            <View style={styles.buttonsContainer}>
              <Button
                large
                bgColor={colors.warning}
                style={styles.button}
                caption="确定"
                onPress={this.handleClick}
              />
            </View>
          </Form>   
        </View>
      </ScrollView>
    );
    }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'space-around',
  },
  picker: {
    flexDirection: "row",
    justifyContent: 'space-between'
  },
  buttonsContainer: {
    alignSelf: 'stretch',
    margin: 20
  },
  button: {
    marginBottom: 20,
    alignSelf: 'stretch',
  },
  description: {
    padding: 20,
    marginBottom: 20,
    alignSelf: 'stretch'
  },
  input: {
    marginBottom: 15,
  },
  anchor: {
    flex: 1,
    flexDirection: "row",
  },
  inputWrap: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});


const mapStateToProps = createStructuredSelector({
  types: typesListSelector,
  typesloading: typesloadingSelector,
  scenes: scenesListSelector,
  scenesLoading: scenesloadingSelector,
  services: servicesListSelector,
  servciesLoading: servicesloadingSelector,
  subcategories: subcategorysListSelector,
  servciesLoading: subcategorysloadingSelector
});

const mapDispatchToProps = {
  getTypes,
  getScenes,
  getServices,
  getSubcategorys
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(PostJob);
