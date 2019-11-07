import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { reducer as modal } from 'redux-modal'

import auth from './modules/auth'
import tracking from './modules/tracking'
import user from './modules/user'
import gallery from '../modules/gallery/GalleryState';
import app from '../modules/AppState';
import calendar from '../modules/calendar/CalendarState';

export default combineReducers({
  auth,
  form,
  modal,
  tracking,
  user,
  gallery,
  app,
  calendar
})
