import React from 'react';

import { TouchableOpacity, View } from 'react-native';
import {Text} from './StyledText'
import { colors } from '../styles';

export default function RNSRadioGroup({
  items,
  selectedIndex,
  onChange,
  style,
  underline,
}) {
  return (
    <View
      style={[styles.container, underline && styles.underline, style && style]}
    >
      {items &&
        items.map((item, index) => {
          let isActive = false;
          if (selectedIndex !== undefined && selectedIndex === index)
            isActive = true;

          let activeStyle = styles.itemActive;
          if (underline) activeStyle = styles.itemActiveUnderline;

          let activeTextStyle = styles.textActive;
          if (underline) activeTextStyle = styles.textActiveUnderline;
           
          return (
            <TouchableOpacity
              onPress={() => onChange(index)}
              key={item.id || item}
              style={[
                styles.item,
                underline && styles.itemUnderline,
                isActive && activeStyle,
              ]}
            >
              <Text
                style={[
                  underline && styles.textUnderline,
                  isActive ? activeTextStyle : styles.textInActive,
                ]}
              >
                {item.value || item}
              </Text>
              {underline && isActive && (
                <View
                  style={{
                    height: 5,
                    borderBottomColor: colors.primary,
                    borderBottomWidth: 3,
                    position: 'absolute',
                  }}
                />
              )}
            </TouchableOpacity>
          );
        })}
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    borderColor: colors.white,
    borderWidth: 1,
    borderRadius: 5,
  },
  underline: {
    borderWidth: 0,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  itemUnderline: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#e3e3e3',
  },
  itemActive: {
    backgroundColor: colors.white,
  },
  itemActiveUnderline: {
    borderBottomWidth: 2,
    borderBottomColor: colors.white,
  },
  textInActive: {
    color: colors.primary,
  },
  textUnderline: {
    color: '#a6a6a6',
  },
  textActive: {
    color: colors.white,
  },
  textActiveUnderline: {
    color: colors.white,
  },
};
