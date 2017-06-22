import { combineReducers } from 'redux'

import test from './test'
import extensions from './extensions'
import appInfo from './appInfo'
import login from './login'
import version from './version'

const reducers = combineReducers({
  test,
  extensions,
  appInfo,
  login,
  version,
})

export default reducers
