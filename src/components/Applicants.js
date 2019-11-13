import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  Alert
} from 'react-native';

import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';

import moment from 'moment'
import { fonts, colors } from '../styles';
import Button from './Button'
import { hireJob } from '../redux/modules/job'
import { jobsloadingSelector } from '../redux/selectors'

class Applicants extends React.Component {
  constructor(props) {
    super(props)
    
  }
  handleClick= (hired) => {
    const {jobID, hireJob} = this.props
    Alert.alert(
      '提示',
      '是否确认选用？',
      [
        {
          text: '取消',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: '确认', onPress: () => hireJob({
          id: jobID,
          body: { hired: hired},
        })  },
      ],
      {cancelable: false},
    );
  }

  render() {   
    const {applicants, navigation} = this.props
    return (
      <ScrollView style={styles.componentsSection} horizontal={true}>
        {applicants && applicants.map((applicant, index) => (
          <View key={index} style={{borderWidth: 1, borderColor: colors.gray, borderRadius:10, marginRight: 10}}>
            {applicant.photo ? 
              <Image
                source={{ uri: photo.uri }}
                style={styles.photo}
              /> :
              <Image
                source={require('../../assets/images/takePhoto.png')}
                style={styles.photo}
              />
              }
            {/* <Text size={14}><Text>{applicant.applicant}</Text></Text> */}
            <Text size={14}>报价 : ¥{applicant.price}</Text>
            <View style={styles.buttonsContainer}>
              <Button
                small
                style={styles.button}
                caption="查看主页"
                onPress={() => {
                  navigation.navigate('ProviderDetail', {
                    id: applicant.applicant,
                })}}
              />
              <Button
                small
                style={styles.button}
                caption="选用"
                onPress={() => this.handleClick(applicant.applicant)}
              />
            </View>
          </View>
        ))}
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

  description: {
    padding: 20,
    marginBottom: 20,
    alignSelf: 'stretch'
  },

  componentsSection: {
    backgroundColor: colors.white,
    padding: 15,
    marginBottom: 20,
    borderRadius: 5,
  },
  photo: {
    borderRadius: 100,
    borderColor: colors.gray,
    backgroundColor: colors.info,
    width: 50,
    height: 50
  },

  buttonsContainer: {
    alignItems: 'flex-end',
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20
  },
});


const mapStateToProps = createStructuredSelector({
  jobsloading: jobsloadingSelector,
});

const mapDispatchToProps = {
  hireJob,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Applicants);
