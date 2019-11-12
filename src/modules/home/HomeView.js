import React from 'react';
import {
  View,
  ImageBackground,
} from 'react-native';

import { Button } from '../../components';

import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { getSubcategorys } from '../../redux/modules/subcategory';

import { getTypes } from '../../redux/modules/type'
import { getScenes } from '../../redux/modules/scene'
import { getServices } from '../../redux/modules/service'
import { commonStyles } from '../../styles'

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
      this.props.navigation.navigate({ routeName: 'Auth' })
    }, 5000);
  }

  handleClick = () => {
    clearTimeout(this.timer);
    this.props.navigation.navigate({ routeName: 'Auth' })
  };

  render() {
    return (
      <View style={commonStyles.container}>
        <ImageBackground
          source={require('../../../assets/images/background.png')}
          style={commonStyles.bgImage}
          resizeMode="cover"
        >
          
        <View style={commonStyles.buttonsContainer}>
          <Button
            large
            secondary
            rounded
            style={commonStyles.button}
            caption="Skip"
            onPress={() => this.handleClick()}
          />
        </View>
        </ImageBackground>
      </View>
    );
  }
}

const mapStateToProps = createStructuredSelector({

});

const mapDispatchToProps = {
  getTypes,
  getScenes,
  getServices,
  getSubcategorys
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(HomeScreen);
