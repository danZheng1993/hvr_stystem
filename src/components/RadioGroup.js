import React from 'react';

import { TouchableOpacity, View } from 'react-native';
import {Text} from './StyledText'
import { colors } from '../styles';

export default function RNSRadioGroup({
  items,
  selectedIndex,
  onChange,
  style,
  size,
  underline,
  noline,
  small,
  lightTheme
}) {
  return (
    <View
      style={[styles.container, underline && styles.underline, style && style, noline && styles.underline]}
    >
      {items &&
        items.map((item, index) => {
          let isActive = false;
          if (selectedIndex !== undefined && selectedIndex === index)
            isActive = true;

          let activeStyle = styles.itemActive;
          if (underline) activeStyle = styles.itemActiveUnderline;
          if (lightTheme) activeStyle = styles.lightitemActiveUnderline;
          if (noline) activeStyle = styles.itemActiveNoline;

          let activeTextStyle = styles.textActive;
          if (underline || noline) activeTextStyle = styles.textActiveUnderline;
          if (lightTheme) activeTextStyle=styles.lighttextActiveUnderline
          return (
            <TouchableOpacity
              onPress={() => onChange(index)}
              key={item.id || item}
              style={[
                styles.item,
                lightTheme && styles.itemUnderline,
                noline && !!index && styles.itemNoLine,
                isActive && activeStyle,
              ]}
            >
              <Text
                style={[
                  small && styles.small,
                  underline && styles.textUnderline,
                  isActive ? activeTextStyle : (lightTheme ? styles.lighttextInActive : styles.textInActive),
                ]}
                size={size}
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
  small: {
    fontSize: 12
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 0,
  },
  itemUnderline: {
    borderBottomWidth: 2,
    borderBottomColor: colors.gray,
  },
  itemNoLine: {
    borderLeftWidth: 0.5,
    borderLeftColor: colors.primary,
  },
  itemActive: {
    backgroundColor: colors.white,
  },
  itemActiveUnderline: {
    borderBottomWidth: 2,
    borderBottomColor: colors.white,
  },
  lightitemActiveUnderline: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  textInActive: {
    color: colors.primary,
  },
  lighttextInActive: {
    color: colors.gray,
  },
  textUnderline: {
    color: '#a6a6a6',
  },
  textActive: {
    color: colors.white,
  },
  textActiveUnderline: {
    color: colors.white,
    fontWeight: 'bold'
  },
  lighttextActiveUnderline: {
    color: colors.primary,
    fontWeight: 'bold'
  },
};
