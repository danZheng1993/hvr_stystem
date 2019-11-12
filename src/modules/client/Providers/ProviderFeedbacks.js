import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
} from 'react-native';

import { connect } from 'react-redux';
import { compose, withState } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { Button, Loader,} from '../../../components';
import { fonts, colors } from '../../../styles';

import { getUser } from '../../../redux/modules/user'
import { userDetailSelector, usersloadingSelector } from '../../../redux/selectors'

class ProviderFeedbacks extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      select: 0
    }
  }

  handleClick =() => {

  }

  componentWillMount() {

  }


  render() {
    const {user, usersloading} = this.props
    return (
      <ScrollView style={styles.container}>
        <View style={styles.description}>
         { <Loader
          loading={usersloading} /> }
         </View>
          <Text>Provider ProviderFeedbacks</Text>
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
  user: userDetailSelector,
  usersloading: usersloadingSelector,
});

const mapDispatchToProps = {
  getUser
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ProviderFeedbacks);
