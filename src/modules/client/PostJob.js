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
import { Form, TextValidator } from 'react-native-validator-form';
import RadioForm from 'react-native-simple-radio-button';

import { Button, Loader,  Location, toast } from '../../components';
import { fonts, colors } from '../../styles';
import { Text } from '../../components/StyledText';
import { createJob } from '../../redux/modules/job'

import {  typesListSelector, 
          scenesListSelector, 
          servicesListSelector, 
          subcategorysListSelector, 
          profileSelector,
          jobsloadingSelector } from '../../redux/selectors'


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
      service: '',
      description: '',
      budget: '',
      count: '',
      isPublic: false,
      serviceOptions : []
    }
  }

  componentWillMount() {
    const {types, services, subcategories, scenes} = this.props
    console.log(types, subcategories, scenes)
    types.length && this.setState({type: types[0].name})
    scenes.length && this.setState({scene: scenes[0].name})
    subcategories.length && this.setState({subcategory: subcategories[0].name})
    this.setState({ types, services, subcategories, scenes})
  }

  handleClick = () => {
    const {subcategory, scene, type, description, budget, isPublic, serviceOptions, services, count} = this.state
    const { profile} = this.props
    let str = ''
    for (let i=0; i<serviceOptions.length; i++) {
      str += services[serviceOptions[i]].service + ' '
    }
    this.props.createJob({
      body: {subcategory, scene, type, description, budget, isPublic, creator: profile._id, location: '北京', services: str, count},
    })
  };

  onhandleService = (value, index) => {
    let {serviceOptions} = this.state
    let option = serviceOptions.indexOf(index)
    if (value && option == -1) {
      serviceOptions.push(index)
    } else if(!value && option != -1) {
      serviceOptions.splice(index, 1);
    }
    this.setState({serviceOptions})
  }

  render() { 
    const {jobsloading} = this.props
    const {types, scenes, services, subcategories} = this.state

    return (
      <ScrollView style={styles.container}>
        <Loader
          loading={ jobsloading } />      
        <View style={styles.description}>
          <Form
              ref="form"
              onSubmit={this.handleClick}
          >

            <View style={styles.componentsSection} >
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
                  validators={['required']}                 
                  errorMessages={['This field is required']}
                  label='场景数量'
                  placeholder="场景数量"
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
            </View>

            <View style = {styles.componentsSection}>
              {services && services.map((service, index) => (
                <View key={index}>
                <Text size={14}>
                  {service.name}
                </Text>
                <RadioForm
                  radio_props={this.state.radioGroup}
                  initial={1}
                  formHorizontal={true}
                  labelHorizontal={true}
                  buttonColor={'#2196f3'}
                  animation={true}
                  onPress={(value) => {this.onhandleService(value, index)}}
                />
                </View>
              ))}
            </View>

            <View style= {styles.componentsSection}>
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
            </View>

            <View style = {styles.componentsSection}>
              <Text size={14}>
                是否公开
              </Text>
              <RadioForm
                radio_props={this.state.radioGroup}
                initial={1}
                formHorizontal={true}
                labelHorizontal={true}
                buttonColor={'#2196f3'}
                animation={true}
                onPress = {(value) => {this.setState({isPublic: value})}}
              />
            </View>

            <View style={styles.buttonsContainer}>
              <Button
                large
                bgColor={colors.warning}
                style={styles.button}
                caption="提交"
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
    flex: 1,
    backgroundColor: colors.bluish,
    paddingHorizontal: 15,
    paddingTop: 20,
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
  componentsSection: {
    backgroundColor: colors.white,
    padding: 15,
    marginBottom: 20,
    borderRadius: 5,
  },
});


const mapStateToProps = createStructuredSelector({
  types: typesListSelector,
  scenes: scenesListSelector,
  services: servicesListSelector,
  subcategories: subcategorysListSelector,
  jobsloading: jobsloadingSelector,
  profile: profileSelector,
});

const mapDispatchToProps = {
  createJob
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(PostJob);
