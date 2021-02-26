import {combineReducers} from 'redux'
import { routerReducer } from 'react-router-redux';

import user from './user'
import nav from './nav'
import cvs from './cvs'
import vacancy from './vacancy'


import profile from './profile'
import companyProfile from './companyProfile'

import userData from './userData'

export default combineReducers({
    routing: routerReducer,
    user,
    profile,
    companyProfile,
    nav,
    cvs,
    vacancy,
    userData
})