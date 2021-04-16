import {combineReducers} from 'redux'
import { routerReducer } from 'react-router-redux';

import buf from './buf'
import nav from './nav'
import cvs from './cvs'
import user from './user'
import search from './search'
import vacancy from './vacancy'
import response from './response'
import favourites from './favourites'

import profile from './profile'
import companyProfile from './companyProfile'

import userData from './userData'

export default combineReducers({
    routing: routerReducer,
    buf,
    user,
    profile,
    companyProfile,
    nav,
    cvs,
    search,
    favourites,
    vacancy,
    userData,
    response
})