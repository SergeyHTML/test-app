import {combineReducers} from 'redux'
import tasks from './tasks'
import signin from './signin'

export default combineReducers({
  tasks, signin
})