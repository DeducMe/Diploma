const initialState = {
  logged: false,
  userType:'employee',
  hasProfile: true,
  userData: {},
  waitingFetch: false
};


export default function userState(state = initialState, action){
    if (action.type === 'USER_LOGIN'){
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
    else if (action.type === 'GET_USER_DATA_FETCH_SUCCES'){
        state.userData = action.userData;
        state.waitingFetch = false;
        return {
          ...state
        };
    }
    else if (action.type === 'WAITING_FOR_FETCH'){
        state.waitingFetch = true;
        return {
          ...state
        };
  }
    return state;
}