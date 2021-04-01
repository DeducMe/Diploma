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

export const searchNullifyValues = () => (dispatch) => {
    return dispatch({
        type:'SEARCH_NULLIFY_VALUES'
    })
}

export const getSearchNext =  () => (dispatch, getState) => {
    const { search } = getState();
    return search.next;
}

export const getSearchLoadingState =  () => (dispatch, getState) => {
    const { search } = getState();
    
    return search.searchLoading;
}