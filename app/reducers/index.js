import { combineReducers } from 'redux'

import extensions from './extensions'
import appInfo from './appInfo'
import login from './login'
import version from './version'

const reducers = combineReducers({
  extensions,
  appInfo,
  login,
  version,
})

export default reducers
