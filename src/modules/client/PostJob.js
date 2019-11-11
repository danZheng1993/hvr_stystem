import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Picker
} from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';

import { Button, Loader, Select, Location } from '../../components';
import { fonts, colors } from '../../styles';
import { Form, TextValidator } from 'react-native-validator-form';

import { Text } from '../../components/StyledText';

import { createJob } from '../../redux/modules/job'

import {  typesListSelector, typesloadingSelector, 
          scenesListSelector, scenesloadingSelector, 
          servicesListSelector, servicesloadingSelector,
          subcategorysListSelector, subcategorysloadingSelector } from '../../redux/selectors'
import { getSubcategorys } from '../../redux/modules/subcategory';

import RadioForm from 'react-native-simple-radio-button';

class PostJob extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      phoneNumber: '22222222222',
      password: '2222222222',
      category : '',
      scene: '',
      type: '',
      subcategory: '',
      scene: '',
      types: [],
      services: [],
      subcategories: [],
      scenes: [],
      radioGroup: [
        {
            label: '是',
            value: true
        },
        {
            label: '不',
            value: false,
        },
      ],
      service: [],
      description: '',
      budget: 0,
      ispublic: false
    }
  }
  componentWillMount() {
    const {types, services, subcategories, scenes} = this.props
    types.pop()
    services.pop()
    subcategories.pop()
    scenes.pop()
    this.setState({ types, services, subcategories, scenes})
  }
  handleClick = () => {
    const {subcategory, scene, type, description, budget, ispublic} = this.state

    console.log(subcategory, scene, type, description, budget, ispublic)
    this.props.createJob({
      body: {subcategory, scene, type, description, budget, ispublic}
    })
  };
  onhandleService = (value, index) => {

  }
  loadItem(items) { 
    if (!items) return
    items.pop()
    console.log("itesm", items)
    return items && items.map((item, index) => (
        <Picker.Item label={item.name} value={item.name} />
    ))
  }
  render() {
    
    // const {types, typesloading, scenes, scenesLoading, services, servciesLoading, subcategories, subcategorysloading} = this.props
    const {types, scenes, services, subcategories} = this.state
    return (
      <ScrollView style={styles.container}>
        <View style={styles.description}>
         {/* <Loader
          loading={typesloading && scenesLoading && servciesLoading && subcategorysloading} /> */}
          <Form
              ref="form"
              onSubmit={this.handleClick}
          >
          <Picker
              selectedValue={this.state.type}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({type: itemValue})
              }>
              {  types && types.map((item, index) => (
                  <Picker.Item key={index} label={item.name} value={item.name} />
              )) }
          </Picker>
          <TextValidator
                name="count"
                label='手机号'
                validators={['required', 'matchRegexp:^[0-9]{11}$']}
                errorMessages={['This field is required', 'invalid phone number']}
                placeholder="输入手机号"
                type="text"
                value={this.state.count}
                onChangeText={count => this.setState({ count })}
            />  
           <Picker              
              selectedValue={this.state.scene}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({scene: itemValue})
              }>
              {  scenes && scenes.map((item, index) => (
                  <Picker.Item key={index} label={item.name} value={item.name} />
              )) }
          </Picker>
          <Picker
              selectedValue={this.state.subcategory}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({subcategory: itemValue})
              }>
              {  subcategories && subcategories.map((item, index) => (
                  <Picker.Item key={index} label={item.name} value={item.name} />
              )) }
          </Picker>
              {/* <ChinaLocation
                  list={locationData} 
                  onLocationChange={this.onLocationChange}
              /> */}
            <View>
              {services && services.map((service, index) => (
                <View key={index}>
                <Text size={14}>
                  {service.name}
                </Text>
                <RadioForm
                  radio_props={this.state.radioGroup}
                  initial={0}
                  formHorizontal={true}
                  labelHorizontal={true}
                  buttonColor={'#2196f3'}
                  animation={true}
                  onPress={(value) => {this.onhandleService(index, value)}}
                />
                </View>
              ))}
            </View>
            <TextValidator
                style={styles.input}
                outlined
                label='设置密码'
                placeholder="设置密码（6-20位字母数字组合)"
                multiline
                maxLength={200}
                numberOfLines={6}
                value={this.state.description}
                onChangeText={description => this.setState({ description })}
            />
            <TextValidator
                style={styles.input}
                outlined
                validators={['required']}                 
                errorMessages={['This field is required']}
                label='预算价格'
                placeholder="输入预算金额"
                value={this.state.budget}
                onChangeText={budget => this.setState({ budget })}
            />
            <View>
                <Text size={14}>
                  是否公开
                </Text>
                <RadioForm
                  radio_props={this.state.radioGroup}
                  initial={0}
                  formHorizontal={true}
                  labelHorizontal={true}
                  buttonColor={'#2196f3'}
                  animation={true}
                  onPress = {(value) => {this.setState({ispublic: value})}}
                />
                </View>
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
  createJob
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(PostJob);
