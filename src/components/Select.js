import React from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';

import ListPopover from './ListPopover';

export default class Select extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    };
  }

  render() {
    const {items} = this.props
    return (
      <View style={styles.container}>
        <TouchableHighlight
          style={styles.button}
          onPress={() => this.setState({isVisible: true})}>
          <Text>{'Select'}</Text>
        </TouchableHighlight>
        <ListPopover
          list={items}
          isVisible={this.state.isVisible}
          onClick={(item) => this.setState({item: item})}
          onClose={() => this.setState({isVisible: false})}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#b8c',
    alignSelf: 'stretch',
    borderRadius: 4,
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
  },
});