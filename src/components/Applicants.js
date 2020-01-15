import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import {Text} from './StyledText'
import { colors } from '../styles';
import Confirm from './Confirm'
import { hireJob, updateMyJobsList } from '../redux/modules/job'
import { jobsloadingSelector } from '../redux/selectors'

class Applicants extends React.Component {
  constructor(props) {
    super(props)
    
  }
  handleClick= (applicant) => {
    const {jobID, hireJob} = this.props
      Confirm('提示' ,'是否确认选用？', () => hireJob({
          id: jobID,
          body: { hired: applicant.applicant, price: applicant.price},
          success: (payload) => this.handleSuccess(payload.data)
        })
      )
  }

  handleSuccess = (data) => {
    this.props.updateMyJobsList(data)
    this.props.navigation.goBack()
  }

  render() {   
    const {applicants} = this.props
    return (
      <ScrollView  horizontal={true}>
        {applicants ? applicants.map((applicant, index) => (
          <View key={index} style={styles.componentsSection}>
            <View style={{justifyContent: 'center',alignItems: 'center', padding: 15}}>
              <Image
                source={require('../../assets/images/takephoto.png')}
                style={styles.photo}
              />
              <Text size={14} bold color={colors.secondary}>报价报价报价</Text>
              <Text size={14} bold color={colors.secondary}>报价: ¥{applicant.price}</Text>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.handleClick(applicant)}
            >
              <Text white bold>选用</Text>
              </TouchableOpacity>
          </View>
        )) : <Text>No applicants</Text>}
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
    marginHorizontal: 5,
    borderRadius: 5,
  },
  photo: {
    borderRadius: 100,
    borderColor: colors.gray,
    backgroundColor: colors.info,
    width: 50,
    height: 50
  },

  button: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: colors.secondary,
    borderBottomEndRadius: 5,
    borderBottomStartRadius: 5
  },
});


const mapStateToProps = createStructuredSelector({
  jobsloading: jobsloadingSelector,
});

const mapDispatchToProps = {
  hireJob,
  updateMyJobsList
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Applicants);
