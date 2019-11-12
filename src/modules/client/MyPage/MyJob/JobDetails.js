import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import { TextInput } from 'react-native-paper'
import { createStructuredSelector } from 'reselect';
import { compose } from 'recompose';
import moment from 'moment'

import { fonts, colors } from '../../../styles';
import { Button, Loader, toast} from '../../../components';

import { getJob, applyJob } from '../../../redux/modules/job'
import { jobDetailSelector, jobsloadingSelector, profileSelector } from '../../../redux/selectors'

class JobDetail extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      price: 0
    }
  }
  componentWillMount() {
    const {getJob, navigation} = this.props
    let id = navigation.getParam('id', 'NO-ID')
    if (id != 'NO-ID') {
      getJob({
        id: id,
      })
    }
  }

  handleClick = () => {
    let {price} = this.state
    let {applyJob, profile, navigation} = this.props
    //  if (+price == 0) {
    //    price = this.props.job.budget
    //  }
    let id = navigation.getParam('id', 'NO-ID')
    if (id == 'NO-ID') {
      alert("error")
      return
    }
    applyJob({
      id: id,
      body: { applicant: profile._id, price},
    })  
  };

  handleContact =() => {

  } 
  
  render() {
    
    const {job, jobsloading} = this.props
    console.log(job)

    return (
      <ScrollView style={styles.container}>
        <View style={styles.description}>
         { <Loader
          loading={jobsloading} /> }
         {job && <>
           <View style={styles.componentsSection}>
             <Text size={14}>订单信息:<Text>{job.status}</Text></Text>
             <Text size={14}>订单编号:<Text>{job._id}</Text></Text>
             <Text size={14}>创建时间:<Text>{moment(job.created).format("YYYY-MM-DD HH:MM:SS")}</Text></Text>
             <Text size={14}>拍摄城市:<Text>{job.location}</Text></Text>
             <Text size={14}>服务项目:<Text>{job.count}个以内场景</Text></Text>
             <Text size={14}>场景数量:<Text>{job.type}</Text></Text>
             <Text size={14}>拍摄场景:<Text>{job.scene}</Text></Text>
             <Text size={14}>行业类别:<Text>{job.subcategory}</Text></Text>
             <Text size={14}>其他要求:<Text>{job.service}</Text></Text>
             <Text size={14}>需求描述:<Text>{job.description}</Text></Text>
            </View>
            <View>
              <Button
                large
                bgColor={colors.warning}
                style={styles.button}
                caption="联系需求方"
                onPress={this.handleContact}
              />             
              <TextInput
                style={styles.input}
                outlined
                keyboardType = 'numeric'             
                label='预算价格'
                placeholder="输入预算金额"
                value={this.state.price}
                onChangeText={price => this.setState({ price })}
              />
              <Button
                large
                bgColor={colors.warning}
                style={styles.button}
                caption="投标"
                onPress={this.handleClick}
              />
            </View>
            </>
         }
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
  job: jobDetailSelector,
  jobsloading: jobsloadingSelector,
  profile: profileSelector
});

const mapDispatchToProps = {
  getJob,
  applyJob
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(JobDetail);
