const initialState = {
    searchActive: '',
    position: '',
    popup:{
        state:'muted',
        type:'',
        subject:'employee',
        submitValue:'Начать карьеру!',
        wrongEmail:'muted',
        wrongPassword:'muted',
        loaderActive:false
    }
};
  
export default function navState(state = initialState, action){
    if (action.type === 'SEARCH_ACTIVATE'){
        state.searchActive = 'active';
        return {
            ...state
        };
    }
    else if (action.type === 'SEARCH_DEACTIVATE'){
        state.searchActive = '';
        return {
            ...state
        };
    }
    else if (action.type === 'POPUP_ACTIVATE'){
        state.popup.state = 'active';
        state.popup.type = action.payload;
        return {
            ...state
        }
    }else if (action.type === 'CHANGE_SUBJECT_TO_EMPLOYEE'){
        state.popup.subject = 'employee';
        state.popup.submitValue = 'Начать карьеру!';
        return {
            ...state
        }
    }
    else if (action.type === 'CHANGE_SUBJECT_TO_EMPLOYER'){
        state.popup.subject = 'employer';
        state.popup.submitValue = 'Найти команду!';
        return {
            ...state
        }
    }
    else if (action.type === 'POPUP_CLOSE'){
        state.popup.state = 'muted';
        return{
            ...state
        }
    }
    else if (action.type === 'CHANGE_NAV_POSITION_TO_FIXED'){
        state.position = 'fixed';
        return{
            ...state
        }
    }
    else if (action.type === 'CHANGE_NAV_POSITION_TO_NONE'){
        state.position = '';
        return{
            ...state
        }
    }
    else if(action.type === 'WRONG_EMAIL_INPUT'){
        state.popup.wrongEmail = 'active';
        return{
            ...state
        }
    }
    else if(action.type === 'WRONG_PASSWORD_INPUT'){
        state.popup.wrongPassword = 'active';
        return{
            ...state
        }
    }
    else if(action.type === 'RESET_VALIDATION'){
        state.popup.wrongPassword = 'muted';
        state.popup.wrongEmail = 'muted';
        return{
            ...state
        }
    }
    else if(action.type === 'ACTIVATE_LOADER'){
        state.popup.loaderActive = true;
        return{
            ...state
        }
    }
    else if(action.type === 'DEACTIVATE_LOADER'){
        state.popup.loaderActive = false;
        return{
            ...state
        }
    }
    return state;
}