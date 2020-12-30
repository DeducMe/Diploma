import {combineReducers} from 'redux'
import { routerReducer } from 'react-router-redux';

import user from './user'
import nav from './nav'

export default combineReducers({
    routing: routerReducer,
    user,
    nav
})