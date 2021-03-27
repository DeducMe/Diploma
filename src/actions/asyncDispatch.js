import {getSearchQueries} from './serverConnections'

export const searchLoaderActivate = () => (dispatch) => {
    return dispatch({
        type:'SEARCH_START_LOADING'
    })
}

export const searchLoaderDeactivate = () => (dispatch) => {
    return dispatch({
        type:'SEARCH_STOP_LOADING'
    })
}

