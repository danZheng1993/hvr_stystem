import React, {Component} from 'react';
import { View, Platform, TouchableOpacity, Alert } from 'react-native';
import {WebView} from 'react-native-webview';
import Ionicons from 'react-native-vector-icons/Ionicons';
import constants from '../constants'
import { colors } from '../styles';
import { isIphoneX } from '../helpers';
import Loader from './Loader';

export default class WebViewer extends Component {
	constructor(props) {
		super(props)
		this.state = {
      url: '',
      loading: false,
		}
  }

  componentDidMount() {
    const {route} = this.props
    const { url = constants.BASE_URL + 'error.html' } = route.params || {};
		this.setState({url})
  }

  componentDidUpdate(prevProps) {
    const { route } = this.props;
    const { route: prevRoute } = prevProps; 
    const { url: prevUrl = constants.BASE_URL + 'error.html' } = prevRoute.params || {};
    const { url = constants.BASE_URL + 'error.html' } = route.params || {};
    if (prevUrl !== url) {
      this.setState({ url });
    }
  }

  handleClose = () => {
    this.props.navigation.goBack();
  }

  handleLoadStart = () => {
    this.setState({ loading: true });
  }

  handleLoadEnd = () => {
    this.setState({ loading: false });
  }

  handleLoadError = () => {
    this.setState({ loading: false }, () => {
      setTimeout(() => {
        Alert.alert('无法加载网页');
      }, 300);
    });
  }

  render() {
    const { url, loading } = this.state;
    return (
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.button} onPress={this.handleClose}>
            <Ionicons name="close-circle-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <WebView
          source={{uri: url}}
          style={{flex: 1}}
          onLoadStart={this.handleLoadStart}
          onLoadEnd={this.handleLoadEnd}
          onError={this.handleLoadError}
        />
        <Loader loading={loading} />
      </View>
    );
  }
};

const styles = {
  wrapper: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 10,
    paddingTop: Platform.OS === 'ios' ? isIphoneX() ? 48 : 25 : 15,
    backgroundColor: colors.secondary,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button: {
    padding: 8,
  }
}