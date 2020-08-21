import { Dimensions } from 'react-native';
import moment from 'moment'

export const isFieldRequired = value =>
  value ? undefined : 'This Field is Required.'

export const ucFirst = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1)

export const padStart = (num, digits = 2) =>
  num.toString().padStart(digits, '0')

export const hhmmss = (secs) => {
  const seconds = secs % 60
  const minutes = Math.floor(secs / 60) % 60
  const hours = Math.floor(secs / 3600)
  return `${(hours ? `${padStart(hours)  }:` : '') +
    (minutes ? padStart(minutes) : '00')  }:${ 
    padStart(seconds)}`
}

export const distanceUnit = (distance, suffix = '') =>
  distance < 1000 
  ? `${Math.round(distance * 10) / 10  } m${  suffix}`
  : `${Math.round(distance / 100) / 10  } km${  suffix}`;
export const getDateStr = (dateTime) =>
  dateTime ? moment(dateTime).format('YYYY-MM-DD') : undefined

export const getPageCount = ({ page_size, count }) =>
  Math.ceil(count / page_size)

export { default as XMPP } from './xmpp';

export const isIphoneX = () => {
  const dim = Dimensions.get('window');

  return (
    // This has to be iOS
    Platform.OS === 'ios' &&
    // Check either, iPhone X or XR
    (isIPhoneXSize(dim) || isIPhoneXrSize(dim))
  );
};

export const isIPhoneXSize = (dim) => {
  return dim.height === 812 || dim.width === 812;
};

export const isIPhoneXrSize = (dim) => {
  return dim.height === 896 || dim.width === 896;
};