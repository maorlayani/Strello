import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'
import { userReducer } from './user.reducer.js'
import { boardReducer } from './board.reducer.js'

const rootReducer = combineReducers({
    userModule: userReducer,
    boardModule: boardReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))