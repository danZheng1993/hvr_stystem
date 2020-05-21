import moment from 'moment'

export const getDateTimeStr = (dateTime) =>
  dateTime ? moment(dateTime).format('YYYY-MM-DD HH:mm:ss') : undefined

export const getDateStr = (dateTime) =>
  dateTime ? moment(dateTime).format('YYYY.MM.DD') : undefined