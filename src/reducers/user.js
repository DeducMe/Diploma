const initialState = {
  logged: true
};

export default function userState(state = initialState, action){
    if (action.type === 'USER_LOG'){
        state.logged = true;
        return {
          ...state
        };
    }
    else if (action.type === 'USER_EXIT'){
        state.logged = false;
        return {
          ...state
        };
    }
    return state;
}