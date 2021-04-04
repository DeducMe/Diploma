const initialState = {
    responseLoading:false,
    answersLoading:false,
    nextValues:'initial',
    nextAnswers:'initial',
    responseValues:[],
    responseAnswers:[]    
};
  
  
export default function userState(state = initialState, action){
    if (action.type === 'RESPONSE_UPDATE_VALUES'){
        action.payload.map((item) => state.responseValues.push(item));
        state.responseValues = Object.assign([], state.responseValues, [...state.responseValues]);

        return {
            ...state
        };
    }
    if (action.type === 'RESPONSE_UPDATE_ANSWERS'){
        action.payload.map((item) => state.responseAnswers.push(item));
        state.responseAnswers = Object.assign([], state.responseAnswers, [...state.responseAnswers]);

        return {
            ...state
        };
    }
    if (action.type === 'RESPONSE_UPDATE_VALUES_PHOTO'){
        let value = state.responseValues.find(x => x.pk === action.payload.id)
        if (value !== undefined) value.photo_url = action.payload.photo
        state.responseValues = Object.assign([], state.responseValues, [...state.responseValues]);

        return {
            ...state
        };
    }
    if (action.type === 'RESPONSE_UPDATE_ANSWERS_PHOTO'){
        let value = state.responseAnswers.find(x => x.pk === action.payload.id)
        if (value !== undefined) value.photo_url = action.payload.photo
        state.responseAnswers = Object.assign([], state.responseAnswers, [...state.responseAnswers]);

        return {
            ...state
        };
    }
    if (action.type === 'RESPONSE_START_LOADING'){
        state.responseLoading = true;
        return {
            ...state
        };
    }
    if (action.type === 'RESPONSE_STOP_LOADING'){
        state.responseLoading = false;
        return {
            ...state
        };
    }

    if (action.type === 'ANSWERS_START_LOADING'){
        state.answersLoading = true;
        return {
            ...state
        };
    }
    if (action.type === 'ANSWERS_STOP_LOADING'){
        state.answersLoading = false;
        return {
            ...state
        };
    }
    if (action.type === 'RESPONSE_NULLIFY_VALUES'){
        state.responseValues = []
        state.next = 'initial'
        state.responseCount = 0
        return {
            ...state
        };
    }
    if (action.type === 'ANSWERS_NULLIFY_VALUES'){
        state.responseValues = []
        state.next = 'initial'
        state.responseCount = 0
        return {
            ...state
        };
    }
    if (action.type === 'GET_RESPONSE_QUERY_FETCH_SUCCES'){
        state.next = action.data.next
        return {
            ...state
        };
    }
    if (action.type === 'GET_ANSWERS_QUERY_FETCH_SUCCES'){
        state.next = action.data.next
        return {
            ...state
        };
    }

    
    return state;
}