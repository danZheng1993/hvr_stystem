import React from 'react';

import { TouchableOpacity, View, Image } from 'react-native';
import {Text} from './StyledText'
import { colors } from '../styles';

const iconActive = require('../../assets/images/active.png')
const iconInActive = require('../../assets/images/inactive.png')

export default class RNSRadioGroup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedIndex: 0
    }
  }
  
  componentWillMount() {
    const {defaultIndex} = this.props
    if (defaultIndex !== undefined) {
      this.setState({selectedIndex: defaultIndex})
    }
  }
  
  onChange = (index) => {
    this.setState({selectedIndex: index})
    this.props.onChange(index)
  }

  render() {
    const {
      items,
      style,
      size,
      small,
    } = this.props
    const {selectedIndex} = this.state
    return (
      <View
        style={[styles.container, style && style]}
      >
        {items &&
          items.map((item, index) => {
            let isActive = false;
            if (selectedIndex !== undefined && selectedIndex === index)
              isActive = true;
            return (
              <TouchableOpacity
                onPress={() => this.onChange(index)}
                key={item.id || item}
                style={[
                  styles.item,
                ]}
              >
                <Image
                  source={ isActive ? iconActive : iconInActive}
                  style={styles.image} 
                />
                <Text
                  style={[
                    small && styles.small,
                  ]}
                  size={size}
                >
                  {item.value || item}
                </Text>
              </TouchableOpacity>
            );
          })}
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  image: {
    width: 10,
    height: 10,
    tintColor: colors.primary
  },
  small: {
    fontSize: 12
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 0,
  },
};
