const initialState = {
    state:'muted',
    placeholder: {
        userName: '',
        avatar: '',
        personalBackground: '',
        description:'',
        gender: '',
        birthday: ''
    }
};
  
  
export default function profileState(state = initialState, action){
    if (action.type === 'POPUP_REDACT_PROFILE_ACTIVATE'){
        state.state = 'active';
        return {
          ...state
        };
    }
    else if (action.type === 'POPUP_REDACT_PROFILE_DEACTIVATE'){
        state.state = 'muted';
        return {
          ...state
        };
    }
    // else if(action.type === 'ACTIVATE_PROFILE_REDACT_LOADER'){
    //     state.state = 'active';
    //     return{
    //         ...state
    //     }
    // }
    // else if(action.type === 'DEACTIVATE_PROFILE_REDACT_LOADER'){
    //     state.state = 'muted';
    //     return{
    //         ...state
    //     }
    // }
    else if (action.type === 'POPUP_REDACT_USERNAME_CHANGE'){
        state.placeholder.userName = action.payload;
        return {
          ...state
        };
    }
    else if (action.type === 'POPUP_REDACT_DESCRIPTION_CHANGE'){
        state.placeholder.description = action.payload;
        return {
          ...state
        };
    }
    else if (action.type === 'POPUP_REDACT_BIRTHDAY_CHANGE'){
      state.placeholder.birthday = action.payload;
      return {
        ...state
      };
    }
    else if (action.type === 'POPUP_REDACT_INITIALIZE_PLACEHOLDER'){
        state.placeholder = action.payload;
        return {
          ...state
        };
    }
    
    else if (action.type === 'CHANGE_GENDER_TO_MALE'){
      state.placeholder.gender = 'male';
      return {
        ...state
      };
    }
    else if (action.type === 'CHANGE_GENDER_TO_FEMALE'){
      state.placeholder.gender = 'female';
      return {
        ...state
      };
    }
    
    
    return state;
}