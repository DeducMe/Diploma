const initialState = {
  logged: false,
  userType:'employee',
  hasProfile: false,
  userData: {},
  waitingFetch: false,
  user:{},
  userId:'',
  error: false
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
        state.waitingFetch = false;
        return {
          ...state
        };
    }
    else if (action.type === 'REGISTRATE_USER_FETCH_SUCCES'){
      state.user = action.data;
      state.waitingFetch = false;
      return {
        ...state
      };
    }
  
    else if (action.type === 'LOGIN_USER_FETCH_SUCCES'){
      state.user = action.data;
      state.waitingFetch = false;
      return {
        ...state
      };
    }
    else if (action.type === 'WAITING_FOR_FETCH'){
        state.waitingFetch = true;
        return {
          ...state
      }
    }
    else if (action.type === 'FETCH_ERROR'){
      state.error = true;
      return {
        ...state
      };
    }
    else if(action.type === 'USER_HAS_PROFILE'){
      state.hasProfile = true;
      return {
        ...state
      };
    }
    else if(action.type === '404_ERROR'){
      return {
        ...state
      };
    }
    // else if(action.type === 'UPDATE_EMPLOYER'){
    //   state.hasProfile = true;
    //   return {
    //     ...state
    //   };
    // }
    // else if(action.type === 'UPDATE_EMPLOYEE'){
    //   state.hasProfile = true;
    //   return {
    //     ...state
    //   };
    // }
    else if(action.type === 'CREATE_NEW_EMPLOYEE_FETCH_SUCCES'){
      return {
        ...state
      };
    }
    else if(action.type === 'CREATE_NEW_EMPLOYER_FETCH_SUCCES'){
      return {
        ...state
      };
    }
    
    
    return state;
}