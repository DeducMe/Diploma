import {combineReducers} from 'redux'
import { routerReducer } from 'react-router-redux';

import user from './user'
import nav from './nav'
import profile from './profile'

export default combineReducers({
    routing: routerReducer,
    user,
    profile,
    nav
})