import { all } from 'redux-saga/effects'
import auth from './auth'
import tracking from './tracking'
import user from './user'
import type from './type'
import scene from './scene'
import feedback from './feedback'
import service from './service'
import job from './job'
import chat from './chat'
import subcategory from './subcategory'

export default function* rootSaga () {
  yield all([
    auth(),
    tracking(),
    user(),
    type(),
    scene(),
    service(),
    subcategory(),
    job(),
    feedback(),
    chat()
  ])
}
