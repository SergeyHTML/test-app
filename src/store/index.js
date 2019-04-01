import { createStore, applyMiddleware } from 'redux'
import reducer from '../reduser/index'
import logger from '../middlewares/logger'
import thunk from 'redux-thunk'

const enhanser = applyMiddleware(thunk, logger)

const store = createStore(reducer, {}, enhanser)

//dev only
window.store = store

export default store