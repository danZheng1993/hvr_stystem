import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Picker,
  TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { Form, TextValidator } from 'react-native-validator-form';
import RadioForm from 'react-native-simple-radio-button';
import DatePicker from 'react-native-datepicker'
import { Button, Loader, toast } from '../../components';
import Modal from "react-native-modal";

import { fonts, colors } from '../../styles';
import { Text } from '../../components/StyledText';
import { createJob } from '../../redux/modules/job'

import {  typesListSelector, 
          scenesListSelector, 
          servicesListSelector, 
          subcategorysListSelector, 
          profileSelector,
          settingsListSelector,
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
      isConfirm: false,
      start: new Date(),
      end: new Date(),
      location: '',
      systembudget: 0
    }
  }

  componentWillMount() {
    const {types, services, subcategories, scenes, profile} = this.props
    types.length && this.setState({type: types[0].name})
    scenes.length && this.setState({scene: scenes[0].name})
    subcategories.length && this.setState({subcategory: subcategories[0].name})
    this.setState({location: profile.location})
  }

  handleClick = () => {
    const {subcategory, scene, type, description, budget, isPublic, service, count, start, end, location, systembudget} = this.state
    var body = {subcategory, scene, type, description, budget, isPublic, location, services: service, systembudget}
    if (type == 'VR全景直播') {
      body = {...body, start, end}
    } else {
      body = {...body, count}
    }
    this.setState({isConfirm: false})
    this.props.createJob({
      body,
      success: () => this.props.navigation.navigate('MyJob')
    })
  };

  handleConfirm = () => {
    const {serviceOptions} = this.state
    const {services} = this.props
    let str = ''
    for (let i=0; i<serviceOptions.length; i++) {
      str += services[serviceOptions[i]].service + ' '
    }
    this.setState({isConfirm: true, service: str})
  }

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

  chooseLocation = (location) => {
    this.setState({location})
  }

  render() { 
    const {types, scenes, services, subcategories, jobsloading, settings} = this.props
    const {isLive, isConfirm, location, type, count, scene, subcategory, service, description, isPublic, budget, systembudget} = this.state
    const panoramaPrice = settings.panoramaPrice || 0
    return (
      <ScrollView style={styles.container}>
        <Loader
          loading={ jobsloading } />   
        {isConfirm ?
        <Modal isVisible={true} onBackdropPress={() => this.setState({isConfirm: false})}>
          <View style={{...styles.componentsSection, alignItems: 'stretch', alignSelf: 'stretch', alignContent: 'stretch', justifyContent: 'center'}}>
            <Text>拍摄城市 : {location}</Text>
            <Text>服务类别 : {type}</Text>
            <Text>场景数量 : {count}</Text>
            <Text>拍摄场景 : {scene}</Text>
            <Text>行业类别 : {subcategory}</Text>
            <Text>其他需求 : {service}</Text>
            <Text>是否公开 : {isPublic? '公开': 'No'}</Text>
            <Text>需求描述 : {description} </Text>
            <Text>平台预估价格 : {systembudget}</Text>
            <Text>预算金额 : {budget}</Text>
              <Button caption="Post" onPress={() => this.handleClick()} />
          </View>
        </Modal> :
        <Form
          ref="form"
          onSubmit={this.handleConfirm}
        >
          <View style={styles.componentsSection} >
            <Text onPress={() => this.props.navigation.navigate('Location', {chooseLocation: this.chooseLocation})}>拍摄城市 : {location}</Text>
          </View>
          <View style={styles.componentsSection} >
            <Picker
                selectedValue={this.state.type}
                onValueChange={(itemValue, itemIndex) =>
                  this.setType(itemValue)
                }>
                {  Array.isArray(types) && types.map((item, index) => (
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
                onChangeText={count => this.setState({ count, systembudget: panoramaPrice * (+count) })}
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
              {  Array.isArray(scenes) && scenes.map((item, index) => (
                  <Picker.Item key={index} label={item.name} value={item.name} />
              )) }
            </Picker>
            <Picker
              selectedValue={this.state.subcategory}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({subcategory: itemValue})
              }>
              {  Array.isArray(subcategories) && subcategories.map((item, index) => (
                  <Picker.Item key={index} label={item.name} value={item.name} />
              )) }
            </Picker>
          </View>

          <View style = {styles.componentsSection}>
            {Array.isArray(services) && services.map((service, index) => (
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
            <Text>平台预估参考价 : ¥{systembudget}</Text>
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
            <View style={{flex: 2}}>
              <TextValidator
                style={styles.input}
                outlined
                validators={['required', 'isNumber']}                 
                errorMessages={['This field is required', 'Input Number']}
                label='预算价格'
                placeholder="输入预算金额"
                keyboardType='numeric'
                value={this.state.budget}
                onChangeText={budget => this.setState({ budget })}
              />
            </View>
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
      }
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
  settings: settingsListSelector,
});

const mapDispatchToProps = {
  createJob
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(PostJob);
