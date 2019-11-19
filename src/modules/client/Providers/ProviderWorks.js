import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text
} from 'react-native';

import { connect } from 'react-redux';
import { compose, withState } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { Button, Loader,} from '../../../components';
import { fonts, colors } from '../../../styles';

class ProviderWorks extends React.Component {
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
    return (
      <ScrollView style={styles.container}>
        <View style={styles.description}>
         <Loader
          loading={false} />
         </View>
          <Text>Provider Work</Text>
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
});

const mapDispatchToProps = {
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(ProviderWorks);
