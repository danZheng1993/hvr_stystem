import moment from 'moment'

export const getDateTimeStr = (dateTime) =>
  dateTime ? moment(dateTime).format('YYYY-MM-DD HH:mm:ss') : undefined

export const getDateStr = (dateTime) =>
  dateTime ? moment(dateTime).format('YYYY.MM.DD') : undefined

export const authResponseAnalyse = (url) => {
  const parts = url.split('hvr://auth/');
  const main = parts[1];
  if (main.startsWith('success')) {
    const part = main.split('token=');
    return part[1];
  }
  return false;
}
