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
import DatePicker from 'react-native-datepicker'

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
      serviceOptions : [],
      isLive: false,
      start: new Date(),
      end: new Date()
    }
  }

  componentWillMount() {
    const {types, services, subcategories, scenes} = this.props
    types.length && this.setState({type: types[0].name})
    scenes.length && this.setState({scene: scenes[0].name})
    subcategories.length && this.setState({subcategory: subcategories[0].name})
  }

  handleClick = () => {
    const {subcategory, scene, type, description, budget, isPublic, serviceOptions, services, count, start, end} = this.state
    const { profile} = this.props
    let str = ''
    for (let i=0; i<serviceOptions.length; i++) {
      str += services[serviceOptions[i]].service + ' '
    }
    var body = {subcategory, scene, type, description, budget, isPublic, creator: profile._id, location: '北京', services: str}
    if (type == 'VR全景直播') {
      body = {...body, start, end}
    } else {
      body = {...body, count}
    }
    this.props.createJob({
      body
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

  setType = (type) => {
    const {isLive} = this.state
    if (type == 'VR全景直播' && !isLive)
      this.setState({isLive: true})
    else if(isLive)
      this.setState({isLive: false})
    this.setState({type})
  }

  render() { 
    const {types, scenes, services, subcategories, jobsloading} = this.props
    const {isLive} = this.state
    return (
      <ScrollView style={styles.container}>
        <Loader
          loading={ jobsloading } />      
          <Form
              ref="form"
              onSubmit={this.handleClick}
          >

            <View style={styles.componentsSection} >
              <Picker
                  selectedValue={this.state.type}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setType(itemValue)
                  }>
                  {  types && types.map((item, index) => (
                      <Picker.Item key={index} label={item.name} value={item.name} />
                  )) }
              </Picker>
              { !isLive ?
              <TextValidator
                  validators={['required', 'isNumber']}                 
                  errorMessages={['This field is required', 'Input Number']}
                  label='场景数量'
                  placeholder="场景数量"
                  keyboardType='numeric'
                  value={this.state.count}
                  onChangeText={count => this.setState({ count })}
              />
              : <>
               <DatePicker
                style={{width: 200}}
                date={this.state.start}
                mode="datetime"
                placeholder="select date"
                format="YYYY-MM-DD HH:MM:SS"
                minDate="2019-12-01"
                maxDate="2049-12-31"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                onDateChange={(start) => {this.setState({start: start})}}
              />
               <DatePicker
                style={{width: 200}}
                date={this.state.end}
                mode="datetime"
                placeholder="select date"
                format="YYYY-MM-DD HH:MM:SS"
                minDate="2019-12-01"
                maxDate="2049-12-31"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                onDateChange={(end) => {this.setState({end: end})}}
              />
              </>
              }
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
                  buttonColor={'#000000'}
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
                  label='需求描述'
                  placeholder="需求描述"
                  multiline
                  maxLength={200}
                  numberOfLines={6}
                  value={this.state.description}
                  onChangeText={description => this.setState({ description })}
              />
            </View>
            <View style={{...styles.componentsSection, flexDirection: 'row'}}>
              <View style={{flex: 1}}><Text>预算价格</Text></View>
              <View style={{flex: 2}}><TextValidator
                  style={styles.input}
                  outlined
                  validators={['required', 'isNumber']}                 
                  errorMessages={['This field is required', 'Input Number']}
                  label='预算价格'
                  placeholder="输入预算金额"
                  keyboardType='numeric'
                  value={this.state.budget}
                  onChangeText={budget => this.setState({ budget })}
              /></View>
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
                buttonColor={'#000000'}
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
                onPress={() => this.refs.form.submit()}
              />
            </View>          
          </Form>   
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
