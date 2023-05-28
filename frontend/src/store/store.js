import { combineReducers, legacy_createStore as createStore } from 'redux'

import { toyReducer } from './toyReducer.js'
// import { userReducer } from './user.reducer.js'

const rootReducer = combineReducers({
  toyModule: toyReducer,
  // userModule: userReducer,
})

const middleware = window?._REDUX_DEVTOOLS_EXTENSION_?.()
export const store = createStore(rootReducer, middleware)

// For debug
store.subscribe(() => {
  // console.log('Current state is:', store.getState())
})
