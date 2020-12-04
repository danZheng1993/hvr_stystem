import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { reducer as modal } from 'redux-modal'

import auth from './modules/auth'
import tracking from './modules/tracking'
import type from './modules/type'
import setting from './modules/setting'
import scene from './modules/scene'
import feedback from './modules/feedback'
import service from './modules/service'
import subcategory from './modules/subcategory'
import user from './modules/user'
import job from './modules/job'
import chat from './modules/chat'
import contracts from './modules/contracts'
import banner from './modules/banner'
import news from './modules/news'
import media from './modules/media'
import invoice from './modules/invoice'
import gallery from '../modules/gallery/GalleryState';
import app from '../modules/AppState';
import calendar from '../modules/calendar/CalendarState';
import message from './modules/message';

export default combineReducers({
  auth,
  form,
  modal,
  tracking,
  user,
  gallery,
  app,
  calendar,
  type,
  setting,
  scene,
  service,
  job,
  feedback,
  subcategory,
  chat,
  banner,
  news,
  media,
  invoice,
  message,
  contracts,
})
