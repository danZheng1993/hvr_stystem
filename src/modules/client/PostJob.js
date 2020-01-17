import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Picker,
  TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { Form } from 'react-native-validator-form';
import DatePicker from 'react-native-datepicker'
import { Button, Loader, toast, RadioForm } from '../../components';
import Modal from "react-native-modal";

import { colors } from '../../styles';
import { Text } from '../../components/StyledText';
import { createJob } from '../../redux/modules/job'

import {  servicesListSelector, 
          profileSelector,
          settingsListSelector,
          jobsloadingSelector } from '../../redux/selectors'

class PostJob extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      types: [],
      type: '',
      subcategories: [],
      subcategory: '',
      scenes: [],
      scene: '',
      radioGroup: [],
      services: [],
      service: '',
      description: '',
      budget: '',
      count: '',
      isPublic: 0,
      isLive: false,
      isConfirm: false,
      start: new Date(),
      end: new Date(),
      location: '北京',
      systembudget: 0
    }
  }

  componentWillMount() {
    const {settings, profile} = this.props
    const types = settings.type.split(",")
    const scenes = settings.scene.split(",")
    const subcategories = settings.subcategory.split(",")
    const services = settings.service.split(",")
    let radioGroup = []
    for (let i = 0; i<services.length; i++) radioGroup.push(1)
    this.setState({types, scenes, subcategories, services, radioGroup})
    types.length && this.setState({type: types[0]})
    scenes.length && this.setState({scene: scenes[0]})
    subcategories.length && this.setState({subcategory: subcategories[0]})
    profile.location && this.setState({location: profile.location})
  }

  handleClick = () => {
    const {subcategory, scene, type, description, budget, isPublic, service, count, start, end, location, systembudget} = this.state
    const hired = this.props.navigation.getParam('hired', null)
    var body = {subcategory, scene, type, description, budget, isPublic: !isPublic, location, services: service, systembudget, hired}
    if (type == 'VR全景直播') {
      body = {...body, start, end}
    } else {
      body = {...body, count}
    }
    this.setState({isConfirm: false})
    this.props.createJob({
      body,
      success: () => this.handleSuccess()
    })
  };

  handleSuccess = () => {
    const {types, scenes, subcategories, services} = this.state
    let radioGroup = []
    for (let i = 0; i<services.length; i++) radioGroup.push(1)
    this.setState({type: types[0], scene: scenes[0], subcategory: subcategories[0], description: '', budget: '', isPublic: 0, location: '北京', systembudget: 0, service: '', radioGroup, count: ''})
    this.props.navigation.navigate('ClientJob')
  }
  handleConfirm = () => {
    const {count, budget, description} = this.state
    if (!description || !count || !budget || isNaN(count) || isNaN(budget)) {
      toast('Wrong Input!')
      return
    }
    const {services, radioGroup} = this.state
    let str = ''
    for (let i=0; i < services.length; i++) {
      !radioGroup[i] && (str += services[i]+ ' ')
    }
    this.setState({isConfirm: true, service: str})
  }

  handleSelect = (index, value) => {
    let {radioGroup} = this.state
    radioGroup[index] = value
    this.setState({radioGroup})
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
    const { jobsloading, settings} = this.props
    const { types, scenes, subcategories, services } = this.state
    const {isLive, isConfirm, location, type, count, scene, subcategory, service, description, isPublic, budget, systembudget} = this.state
    const panoramaPrice = settings.panoramaPrice || 0
    return (
      <ScrollView style={styles.container}>
        <Loader
          loading={ jobsloading } />   
        {isConfirm ?
        <Modal isVisible={true} onBackdropPress={() => this.setState({isConfirm: false})}>
          <View style={{...styles.componentsSection, alignItems: 'stretch', alignSelf: 'stretch', alignContent: 'stretch', justifyContent: 'center'}}>
            <View style={{alignItems: 'center'}}>
              <Text size ={18} color={colors.secondary} bold>需求详情</Text>
            </View>
            <View style={[styles.underline, styles.stretch]}>
              <Text size={14} bold>拍摄城市</Text>
              <Text>{location}</Text>
            </View>
            <View style={styles.stretch}>
              <Text size={14} bold>服务类别</Text>
              <Text>{type}</Text>
            </View>
            <View style={[styles.underline, styles.stretch]}>
              <Text size={14} bold>场景数量</Text>
              <Text>{count}个</Text>
            </View>
            <View style={[styles.underline, styles.stretch]}>
              <Text size={14} bold>拍摄场景</Text>
              <Text>{scene}</Text>
            </View>
            <View style={[styles.underline, styles.stretch]}>
              <Text size={14} bold>行业类别</Text>
              <Text>{subcategory}</Text>
            </View>
            <View style={styles.stretch}>
              <Text size={14} bold>其他需求</Text>
              <Text>{service}</Text>
            </View>
            <View style={[styles.underline, styles.stretch]}>
              <Text size={14} bold>是否公开</Text>
              <Text>{isPublic? '非公开': '公开'}</Text>
            </View>
            <View style={styles.stretch}>
              <Text size={14} bold>需求描述</Text>
              <Text>{description}</Text>
            </View>
            <View style={{justifyContent: 'center', flexDirection: 'row'}}>
              <View style={{flex:1, justifyContent: 'center'}}>
                <Text color={colors.secondary} size={14} bold>平台预估价格: {systembudget}</Text>
              </View>
              <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.secondary, borderRadius: 10}}>
                <Text color={colors.white} size={14} bold>预算金额</Text>
                <Text color={colors.white} size={14} bold>{budget}</Text>
              </View>
            </View>
            <Button caption="提交" onPress={() => this.handleClick()} style={{marginVertical: 20}}/>
          </View>
        </Modal> :
        <Form
          ref="form"
          onSubmit={this.handleConfirm}
        >
          <View style={[styles.componentsSection, styles.stretch]} >
            <Text black>拍摄城市: </Text> 
            <Text color={colors.primary} onPress={() => this.props.navigation.navigate('Location', {chooseLocation: this.chooseLocation})}>{location} ></Text>
          </View>
          <View style={styles.componentsSection} >
            <View style={[styles.row]}>
              <Text style={{flex: 1}} size={14} black>服务类别:</Text>
              <View style={styles.border}>
                <Picker
                  selectedValue={this.state.type}
                  style={styles.picker}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setType(itemValue)
                  }>
                  {  Array.isArray(types) && types.map((item, index) => (
                      <Picker.Item key={index} label={item} value={item} />
                  )) }
                </Picker>
              </View>
            </View>
            { !isLive ?
            <View style={styles.row}>
              <Text style={{flex: 1}} size={14} black>场景数量:</Text>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <TextInput
                  style={[styles.input, {width: '80%'}]}
                  keyboardType = 'numeric'
                  value={this.state.count}
                  onChangeText={count => this.setState({ count, systembudget: panoramaPrice * (+count) })}
                />
                <Text> 个</Text>
              </View>
            </View>
            : <>
            <DatePicker
              style={{width: '75%', alignSelf: 'flex-end'}}
              date={this.state.start}
              mode="datetime"
              placeholder="select date"
              format="YYYY-MM-DD hh:mm:ss"
              minDate="2019-12-01"
              maxDate="2049-12-31"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              onDateChange={(start) => {this.setState({start: start})}}
            />
              <DatePicker
              style={{width: '75%', alignSelf: 'flex-end'}}
              date={this.state.end}
              mode="datetime"
              placeholder="select date"
              format="YYYY-MM-DD hh:mm:ss"
              minDate="2019-12-01"
              maxDate="2049-12-31"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              onDateChange={(end) => {this.setState({end: end})}}
            />
            </>
            }
            <View style={styles.row}>
              <Text style={{flex: 1}} size={14} black>拍摄场景:</Text>
              <View style={styles.border}>
                <Picker              
                  selectedValue={this.state.scene}
                  style={styles.picker}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({scene: itemValue})
                  }>
                  {  Array.isArray(scenes) && scenes.map((item, index) => (
                      <Picker.Item key={index} label={item} value={item} />
                  )) }
                </Picker>
              </View>
            </View>
            <View style={styles.row}>
              <Text style={{flex: 1}} size={14} black>行业类别:</Text>
              <View style={styles.border}>
                <Picker
                  selectedValue={this.state.subcategory}
                  style={styles.picker}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({subcategory: itemValue})
                  }>
                  {  Array.isArray(subcategories) && subcategories.map((item, index) => (
                      <Picker.Item key={index} label={item} value={item} style={{padding: 12}}/>
                  )) }
                </Picker>
              </View>
            </View>
          </View>

          <View style = {[styles.componentsSection, {paddingRight: 15}]}>
            <Text size={14} style={{marginBottom: 10}}>其他需求</Text>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                {Array.isArray(services) && services.map((service, index) => (
                  <View key={index}>
                  <Text black>
                    是否需要{service}?
                  </Text>
                  <RadioForm
                    items={['是', '否']}
                    defaultIndex={this.state.radioGroup[index]}
                    onChange={value => this.handleSelect(index, value)}
                    size={14}
                  />
                  </View>
                ))}
              </View>
              <View style={{flex:1, justifyContent: 'center', alignItems: 'center', borderRadius: 10, backgroundColor: colors.secondary, marginVertical: 20}}>
                <Text white size={18}>平台预估价格</Text>
                <Text white size={18}>¥{systembudget}</Text>
              </View>
            </View>
          </View>

          <View style= {[styles.componentsSection, {paddingHorizontal: 15}]}>
            <Text size={14} style={{paddingLeft: 15}}>其他需求</Text>
            <TextInput
              style={[styles.input,{ justifyContent: 'flex-start', padding: 0 }]}
              multiline={true}
              maxLength={200}
              numberOfLines={6}
              height={100}
              value={this.state.description}
              onChangeText={description => this.setState({ description })}
            />
          </View>
          <View style={[styles.componentsSection, styles.stretch]}>
            <View style={{flex: 1}}><Text>预算价格</Text></View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <TextInput
                style={[styles.input, {width: '80%'}]}
                keyboardType = 'numeric'
                value={this.state.budget}
                onChangeText={budget => this.setState({ budget })}
              />
              <Text> 元</Text>
            </View>
          </View>

          <View style = {[styles.componentsSection, styles.stretch]}>
            <View>
              <Text size={14} bold>
                是否公开
              </Text>
              <Text>
                选择公开在项目完成后作品会在平台展示
              </Text>
            </View>
            <RadioForm
              items={['是', '否']}
              defaultIndex = {isPublic}
              onChange={value => this.setState({isPublic: value})}
              size={14}
            />
          </View>
          <Button
            large
            bgColor={colors.secondary}
            style={styles.button}
            caption="提交"
            onPress={() => this.refs.form.submit()}
          />
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
  border: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 5, 
    borderStyle: 'solid',
  },
  row: {
    flexDirection: 'row',
    marginVertical: 5
  },
  stretch: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  picker: {
    height:20,
    color: colors.gray,
  }, 
  underline: {
    borderBottomColor: colors.greybackground,
    borderBottomWidth: 1,
    borderStyle: "solid"
  },
  button: {
    alignSelf: 'stretch',
    marginBottom:50
  },
  input: {
    height: 20,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 5,
    padding: 3,
    paddingLeft: 10,
  },
  componentsSection: {
    backgroundColor: colors.white,
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});


const mapStateToProps = createStructuredSelector({
  services: servicesListSelector,
  jobsloading: jobsloadingSelector,
  profile: profileSelector,
  settings: settingsListSelector,
});

const mapDispatchToProps = {
  createJob
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(PostJob);
