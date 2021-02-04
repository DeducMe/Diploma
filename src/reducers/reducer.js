import {combineReducers} from 'redux'
import { routerReducer } from 'react-router-redux';

import user from './user'
import nav from './nav'
import cvs from './cvs'

import profile from './profile'
import userData from './userData'

export default combineReducers({
    routing: routerReducer,
    user,
    profile,
    nav,
    cvs,
    userData
})