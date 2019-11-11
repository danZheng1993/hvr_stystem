import React from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
} from 'react-native';

import { Button } from '../../components';

import { getTypes } from '../../redux/modules/type'
import { getScenes } from '../../redux/modules/scene'
import { getServices } from '../../redux/modules/service'


import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { getSubcategorys } from '../../redux/modules/subcategory';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    timer = null;
  }
  componentWillMount() {
    const {getTypes, getScenes, getServices, getSubcategorys} = this.props
    getScenes()
    getTypes()
    getServices()
    getSubcategorys()
  }
  componentDidMount() {
    this.timer = setTimeout(() => {    
      this.props.navigation.navigate({ routeName: 'PostJob' })
    }, 5000);
  }
  handleClick = () => {
    clearTimeout(this.timer);
    this.props.navigation.navigate({ routeName: 'PostJob' })
  };
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../../../assets/images/background.png')}
          style={styles.bgImage}
          resizeMode="cover"
        >
          
        <View style={styles.buttonsContainer}>
          <Button
            large
            secondary
            rounded
            style={styles.button}
            caption="Skip"
            onPress={() => this.handleClick()}
          />
        </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  buttonsContainer: {
    alignItems: 'flex-end',
  },
  button: {
    marginBottom: 20,
  },
  bgImage: {
    flex: 1,
    marginHorizontal: -20,
    width: '100%',
    height: '100%'
  }
});


const mapStateToProps = createStructuredSelector({
  // types: typesListSelector,
  // typesloading: typesloadingSelector,
  // scenes: scenesListSelector,
  // scenesLoading: scenesloadingSelector,
  // services: servicesListSelector,
  // servciesLoading: servicesloadingSelector,
  // subcategories: subcategorysListSelector,
  // servciesLoading: subcategorysloadingSelector
});

const mapDispatchToProps = {
  getTypes,
  getScenes,
  getServices,
  getSubcategorys
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(HomeScreen);
