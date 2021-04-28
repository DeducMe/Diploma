const initialState = {
    favouritesLoading:false,
    error:false,
    next:'initial',
    favouritesCount: 0,
    favouritesValues:[],
    openedResponseId:-1
};
  
  
export default function userState(state = initialState, action){
    if (action.type === 'FAVOURITES_UPDATE_VALUES'){
        action.payload.map((item)=>{state.favouritesValues.push(item)});
        state.favouritesValues = Object.assign([], state.favouritesValues, [...state.favouritesValues]);

        return {
            ...state
        };
    }
    else if (action.type === 'FAVOURITES_SORT_VALUES'){
        state.favouritesValues = action.payload;
        state.favouritesValues = Object.assign([], state.favouritesValues, [...state.favouritesValues]);
        return {
            ...state
        };
    }
    else if (action.type === 'FAVOURITES_UPDATE_VALUES_PHOTO'){
        let value = state.favouritesValues.find(x => x.pk === action.payload.id)
        if (value !== undefined) value.photo_url = action.payload.photo
        state.favouritesValues = Object.assign([], state.favouritesValues, [...state.favouritesValues]);

        return {
            ...state
        };
    }
    else if (action.type === 'FAVOURITES_VALUES_ERROR'){
        state.error = true;
        return {
            ...state
        };
    }
    else if (action.type === 'FAVOURITES_START_LOADING'){
        state.favouritesLoading = true;
        return {
            ...state
        };
    }
    else if (action.type === 'FAVOURITES_STOP_LOADING'){
        state.favouritesLoading = false;
        return {
            ...state
        };
    }
    else if (action.type === 'FAVOURITES_NULLIFY_VALUES'){
        state.favouritesValues = []
        state.next = 'initial'
        return {
            ...state
        };
    }
    else if (action.type === 'GET_FAVOURITES_QUERY_FETCH_SUCCES'){
        state.next = action.data.next
        return {
            ...state
        };
    }
    else if (action.type === 'FAVOURITES_OPEN_RESPONSE_POPUP'){
        state.openedResponseId = action.payload
        return {
            ...state
        };
    }
    
    return state;
}